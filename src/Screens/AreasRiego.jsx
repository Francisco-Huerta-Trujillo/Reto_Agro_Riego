import { Droplets, MapPin, Clock, TrendingDown, TrendingUp, ChevronRight, ArrowLeft, Calendar, Thermometer, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, Line } from 'recharts';

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
        if (!response.ok) throw new Error('al cargar la información de las áreas');
        const data = await response.json();
        setAreas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const humedadTendencia = [
    { hora: '00:00', humedad: 68, optimo: 65 },
    { hora: '04:00', humedad: 70, optimo: 65 },
    { hora: '08:00', humedad: 65, optimo: 65 },
    { hora: '12:00', humedad: 58, optimo: 65 },
    { hora: '16:00', humedad: 62, optimo: 65 },
    { hora: '20:00', humedad: 67, optimo: 65 },
    { hora: '24:00', humedad: 65, optimo: 65 },
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activo':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', dot: 'bg-green-500' };
      case 'programado':
        return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', dot: 'bg-blue-500' };
      case 'pausado':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', dot: 'bg-red-500' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', dot: 'bg-slate-500' };
    }
  };

  const getEstadoLabel = (estado) => {
    const labels = { activo: 'Regando Ahora', programado: 'Programado', pausado: 'Pausado', completado: 'Completado' };
    return labels[estado] || estado;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="animate-spin text-green-600" size={48} />
        <p className="text-slate-500 font-medium">Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-xl border border-red-200">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <p className="text-red-800 text-xl font-bold mb-2">Error de Conexión</p>
        <p className="text-red-500 mb-6">Error: {error}</p>
                <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Reintentar conexión
        </button>
      </div>
    );
  }

  const areasFiltered = filterEstado === 'todos' ? areas : areas.filter(a => a.estadoRiego === filterEstado);
  const totalConsumo = areas.reduce((acc, area) => acc + area.consumoDiario, 0);
  const areasActivas = areas.filter(a => a.estadoRiego === 'activo').length;

  const DataCard = ({ label, value }) => (
    <div className="bg-white rounded-xl p-4 border border-green-400 shadow-sm">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
    </div>
  );

  if (selectedArea) {
    const estadoColor = getEstadoColor(selectedArea.estadoRiego);
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <button
          onClick={() => setSelectedArea(null)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Volver a Áreas de Riego</span>
        </button>

        <div className="bg-linear-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full ${estadoColor.dot} ${selectedArea.estadoRiego === 'activo' ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-bold uppercase opacity-90">{getEstadoLabel(selectedArea.estadoRiego)}</span>
              </div>
              <h2 className="text-4xl font-bold mb-2">{selectedArea.name}</h2>
              <p className="text-green-100 text-lg">{selectedArea.predio}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Área Total</p>
              <p className="text-5xl font-bold">{selectedArea.area} ha</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-80 mb-1">Cultivo</p>
              <p className="text-lg font-bold">{selectedArea.cultivo}</p>
              <p className="text-xs opacity-70">{selectedArea.tipoCultivo}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-80 mb-1">Consumo Diario</p>
              <p className="text-lg font-bold">{selectedArea.consumoDiario} m³</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-80 mb-1">Próximo Riego</p>
              <p className="text-lg font-bold">{selectedArea.proximoRiego}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-80 mb-1">Eficiencia</p>
              <p className="text-lg font-bold">{selectedArea.eficiencia}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <Section columnTitle="SUELO">
            <DataCard label="Humedad de suelo" value={`${selectedArea.humedad}%`} />
            <DataCard label="Potencial Hídrico" value={`${selectedArea.potencialHidrico} kPa`} />
            <DataCard label="Temperatura Suelo" value={`${selectedArea.temperaturaSuelo?.toFixed(1)} °C`} />
          </Section>

          <Section columnTitle="RIEGO">
            <DataCard label="Flujo Actual" value={`${selectedArea.flujoAgua} L/min`} />
            <DataCard label="Consumo Semanal" value={`${selectedArea.consumoSemanal} m³`} />
          </Section>

          <Section columnTitle="AMBIENTAL">
            <DataCard label="Temperatura" value={`${selectedArea.temperaturaAmbiental} °C`} />
            <DataCard label="Humedad Relativa" value={`${selectedArea.humedadRelativa}%`} />
            <DataCard label="Evapotranspiración" value={`${selectedArea.evapotranspiracion} mm/día`} />
          </Section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Áreas de Riego</h2>
          <p className="text-slate-500 mt-1">Gestión y monitoreo de parcelas</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {['todos', 'activo', 'programado'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFilterEstado(estado)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filterEstado === estado ? 'bg-green-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Áreas Activas" value={areasActivas} highlight />
        <MetricCard label="Total Áreas" value={areas.length} />
        <MetricCard label="Consumo Diario" value={`${totalConsumo.toFixed(1)} m³`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {areasFiltered.map((area) => {
          const estadoColor = getEstadoColor(area.estadoRiego);
          return (
            <div
              key={area.id}
              className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => setSelectedArea(area)}
            >
              <div className={`p-4 ${estadoColor.bg} border-b ${estadoColor.border}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${estadoColor.dot} ${area.estadoRiego === 'activo' ? 'animate-pulse' : ''}`} />
                    <span className={`text-xs font-bold uppercase ${estadoColor.text}`}>{getEstadoLabel(area.estadoRiego)}</span>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:translate-x-1 transition-transform" size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mt-2">{area.name}</h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Cultivo</p>
                    <p className="text-sm font-semibold text-slate-700">{area.cultivo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800">{area.area} ha</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-500">Humedad Suelo</span>
                    <span className="text-xs font-bold">{area.humedad}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${area.humedad < 40 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${area.humedad}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetricCard({ label, value, highlight }) {
  return (
    <div className={`${highlight ? 'bg-green-600 text-white' : 'bg-white text-slate-800 border border-slate-200'} p-6 rounded-xl shadow-sm`}>
      <p className={`text-sm uppercase tracking-wide font-medium ${highlight ? 'opacity-80' : 'text-slate-500'}`}>{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Section({ columnTitle, children }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg py-2 mb-6 border border-slate-200 shadow-sm">
        <h3 className="text-center font-bold text-slate-700 tracking-wider uppercase">{columnTitle}</h3>
      </div>
      {children}
    </div>
  );
}