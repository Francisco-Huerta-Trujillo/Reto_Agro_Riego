import React, { useState, useEffect } from 'react';
import { usePredio } from '../context/PredioContext';
import { 
  Droplets, MapPin, Clock, TrendingDown, TrendingUp, ChevronRight, 
  ArrowLeft, Calendar, Thermometer, Loader2, AlertCircle, Search, 
  Download, User, ChevronLeft 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';

// --- COMPONENTES AUXILIARES ---
function MetricCard({ label, value, highlight }) {
  return (
    <div className={`${highlight ? 'bg-green-600 text-white' : 'bg-white text-slate-800 border-2 border-[#0EFF0A]'} p-6 rounded-xl shadow-sm`}>
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
        const response = await fetch('http://10.34.23.233:8000/areas-riego.json');
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
    <div className="m-10 p-12 text-center bg-status-error/10 rounded-3xl border border-slate-300 border-status-error/20 shadow-xl">
      <AlertCircle className="mx-auto text-status-error mb-4" size={64} />
      <p className="text-2xl font-bold text-status-error mb-2">Error de Conexión</p>
      <p className="text-gray-500 max-w-md mx-auto mb-6">Error: {error}</p>
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
  
  // ✨ NUEVO ESTADO PARA CONTROLAR LAS SEMANAS ✨
  const [semanasOffset, setSemanasOffset] = useState(0); 

  const { selectedPredioId } = usePredio();

  // Función auxiliar para calcular el rango de fechas
  const getRangoFechas = (offset) => {
    const hoy = new Date();
    // Encontrar el lunes de la semana actual
    const diaSemana = hoy.getDay() || 7; 
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - diaSemana + 1 + (offset * 7));
    
    // Encontrar el domingo de esa semana
    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);

    return {
      startStr: lunes.toISOString().split('T')[0],
      endStr: domingo.toISOString().split('T')[0],
      // Texto bonito para la UI (ej. "12 Ago - 18 Ago")
      label: `${lunes.toLocaleDateString('es-MX', {day: 'numeric', month: 'short'})} - ${domingo.toLocaleDateString('es-MX', {day: 'numeric', month: 'short'})}`
    };
  };

  const rangoActual = getRangoFechas(semanasOffset);

  useEffect(() => {
    const fetchConsumo = async () => {
      if (!selectedPredioId || selectedPredioId === 'undefined') {
        setDataConsumo([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const url = `http://localhost:8000/api/v1/predios/${selectedPredioId}/chart-consumo?start_date=${rangoActual.startStr}&end_date=${rangoActual.endStr}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("No se pudieron cargar los datos de la gráfica.");
        const data = await response.json(); // Lo que llega del backend
        
        // Plantilla de 7 días (ajusta los nombres si tu Postgres los manda en español)
        const diasSemana = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        const dataCompleta = diasSemana.map(dia => {
          // Buscamos si el backend nos mandó datos para este día
          const datoEncontrado = data.find(d => d.day === dia);
          // Si hay dato, lo usamos. Si no, ponemos el consumo en 0.
          return {
            day: dia,
            value: datoEncontrado ? datoEncontrado.value : 0
          };
        });

        // Guardamos la data ya formateada con los 7 días garantizados
        setDataConsumo(dataCompleta);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConsumo();
  }, [selectedPredioId, semanasOffset]);

  // Calculamos el consumo total sumando los valores de la gráfica
  const consumoTotalSemanal = dataConsumo.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <div className="space-y-6 pt-6 animate-in fade-in duration-500">
      {/* Título y Subtítulo como en el Mockup */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Historial de Eventos</h2>
        <p className="text-slate-500 text-sm mt-1">Registro completo de todas las actividades del predio</p>
      </div>

      {/* Grid de 4 Tarjetas Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 p-6 rounded-xl text-white shadow-md flex flex-col justify-between">
          <div className="flex items-center gap-2 opacity-90 mb-2">
            <Calendar size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Total Eventos</span>
          </div>
          <span className="text-4xl font-bold">4</span>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Calendar size={20} className="text-green-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Alertas Mes</span>
          </div>
          <span className="text-4xl font-bold text-slate-800">12</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Droplets size={20} className="text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Consumo Semanal</span>
          </div>
          <span className="text-4xl font-bold text-slate-800">{consumoTotalSemanal.toFixed(0)}m³</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Clock size={20} className="text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Riegos Completados</span>
          </div>
          <span className="text-4xl font-bold text-slate-800">6</span>
        </div>
      </div>
      
      {/* Contenedor de la Gráfica (Borde Verde) */}
      <div className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-sm min-h-100 flex flex-col">
        
        {/* ✨ CABECERA MODIFICADA CON NAVEGACIÓN DE SEMANAS ✨ */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Consumo de Agua</h3>
            <p className="text-slate-400 text-sm uppercase tracking-wide">Total {consumoTotalSemanal.toFixed(0)}m³</p>
          </div>
          
          {/* Controles de semana */}
          <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
            <button 
              onClick={() => setSemanasOffset(prev => prev - 1)}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-green-600"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-slate-700 min-w-30 text-center">
              {semanasOffset === 0 ? "Esta Semana" : rangoActual.label}
            </span>
            <button 
              onClick={() => setSemanasOffset(prev => prev + 1)}
              disabled={semanasOffset === 0}
              className={`p-1.5 rounded-md transition-all ${semanasOffset === 0 ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-white hover:shadow-sm text-slate-500 hover:text-green-600'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ✨ RENDERIZADO CONDICIONAL EXACTO ✨ */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-green-600" size={32} />
            <p className="text-slate-400">Procesando estadísticas...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-red-50 rounded-xl border border-red-100">
            <AlertCircle className="text-red-500 mb-2" size={40} />
            <p className="text-red-800 font-bold">Error de Datos</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        ) : dataConsumo.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 h-72">
            <Search className="text-slate-400 mb-2" size={40} />
            <p className="text-slate-600 font-bold">Sin datos para esta semana</p>
            <p className="text-slate-400 text-sm">No se registraron mediciones de consumo en este rango de fechas.</p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataConsumo} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Botón Gigante de Exportar Datos */}
      <div className="flex justify-center mt-8 pb-10">
        <button 
          onClick={() => alert("Generando Excel...")}
          className="flex items-center gap-3 px-12 py-5 bg-[#4ade80] hover:bg-green-500 text-white text-2xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-green-200"
        >
          <Download size={28}/> Exportar Datos
        </button>
      </div>
    </div>
  );
}