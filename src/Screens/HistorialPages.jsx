import React, { useState, useEffect } from 'react';
import { 
  Droplets, MapPin, Clock, TrendingDown, TrendingUp, ChevronRight, 
  ArrowLeft, Calendar, Thermometer, Loader2, AlertCircle, Search, 
  Download, User 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';

// --- COMPONENTES AUXILIARES ---
function MetricCard({ label, value, highlight }) {
  return (
    <div className={`${highlight ? 'bg-green-600 text-white' : 'bg-white text-slate-800 border border-slate-200'} p-6 rounded-xl shadow-sm`}>
      <p className={`text-sm uppercase tracking-wide font-medium ${highlight ? 'opacity-80' : 'text-slate-500'}`}>{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

// --- COMPONENTE 1: ÁREAS DE RIEGO ---
export function AreasRiegoPage() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [filterEstado, setFilterEstado] = useState('todos');
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/areas-riego.json');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setAreas(data);
      } catch (err) {
        setError("Error al cargar áreas de riego. Verifique la conexión.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getEstadoColor = (estado) => {
    const colors = {
      activo: { bg: 'bg-green-100', dot: 'bg-green-500' },
      programado: { bg: 'bg-blue-100', dot: 'bg-blue-500' },
      pausado: { bg: 'bg-red-100', dot: 'bg-red-500' }
    };
    return colors[estado] || { bg: 'bg-slate-100', dot: 'bg-slate-500' };
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-green-600" size={40} /></div>;
  if (error) return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
      <AlertCircle className="mx-auto text-red-500 mb-2" />
      <p className="text-red-700 font-medium">{error}</p>
    </div>
  );

  const areasFiltered = filterEstado === 'todos' ? areas : areas.filter(a => a.estadoRiego === filterEstado);

  // Vista de detalle simplificada
  if (selectedArea) {
    return (
      <div className="space-y-4">
        <button onClick={() => setSelectedArea(null)} className="flex items-center gap-2 text-slate-600 hover:text-green-700">
          <ArrowLeft size={20} /> Volver al panel
        </button>
        <div className="bg-linear-to-r from-green-600 to-green-700 p-8 rounded-2xl text-white shadow-lg">
          <h2 className="text-3xl font-bold">{selectedArea.name}</h2>
          <p className="opacity-90">Humedad actual: {selectedArea.humedad}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Áreas de Riego</h2>
        <div className="flex gap-2">
          {['todos', 'activo', 'programado'].map(e => (
            <button key={e} onClick={() => setFilterEstado(e)} 
              className={`px-4 py-2 rounded-lg capitalize transition-all ${filterEstado === e ? 'bg-green-600 text-white shadow-md' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}>
              {e}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {areasFiltered.map(area => (
          <div key={area.id} onClick={() => setSelectedArea(area)} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg cursor-pointer transition-all">
            <div className={`p-4 ${getEstadoColor(area.estadoRiego).bg} border-b flex justify-between items-center`}>
              <h3 className="font-bold text-slate-800">{area.name}</h3>
              <div className={`w-3 h-3 rounded-full ${getEstadoColor(area.estadoRiego).dot} ${area.estadoRiego === 'activo' ? 'animate-pulse' : ''}`} />
            </div>
            <div className="p-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Humedad de Suelo</span>
                <span className="font-bold">{area.humedad}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-700" style={{ width: `${area.humedad}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENTE 2: HISTORIAL CON GRÁFICA DINÁMICA ---
export function HistorialPage() {
  const [dataConsumo, setDataConsumo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsumo = async () => {
      try {
        setLoading(true);
        // Intentar cargar datos de consumo semanal
        const response = await fetch('/api/consumo-semanal.json');
        if (!response.ok) throw new Error("No se pudieron cargar los datos de la gráfica.");
        const data = await response.json();
        
        // Validación de que los datos tengan el formato para Recharts
        if (!Array.isArray(data) || data.length === 0) throw new Error("Los datos de consumo están vacíos.");
        
        setDataConsumo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConsumo();
  }, []);

  return (
    <div className="space-y-6 pt-10 border-t border-slate-200 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Consumo Semanal</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          <Download size={18}/> Exportar Reporte
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-87.5 flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin bg-green-600 text-white rounded-lg " size={32} />
            <p className="text-slate-400">Procesando estadísticas...</p>
          </div>
        ) : error ? (
          <div className="text-center space-y-3 h-75 w-full  pt-[17%] bg-red-50 border rounded-xl border-red-200">
            <AlertCircle className="mx-auto text-red-500" size={40} />
            <p className="text-red-800 font-medium">{error}</p>
            <button onClick={() => window.location.reload()} className="text-sm bg-green-600  text-white rounded-lg ">Reintentar</button>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataConsumo}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="consumo" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

// --- EXPORTACIÓN PRINCIPAL ---
export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <AreasRiegoPage />
        <HistorialPage />
      </div>
    </div>
  );
}