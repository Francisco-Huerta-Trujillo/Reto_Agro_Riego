import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp, Droplet, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Charts() {
  const [humidityData, setHumidityData] = useState([]);
  const [waterConsumptionData, setWaterConsumptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Lógica de Carga de Datos desde Backend ---
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        // Simulamos o llamamos a endpoints de tu backend
        const [resHum, resCons] = await Promise.all([
          fetch('/api/humidity-trends.json'),
          fetch('/api/water-consumption.json')
        ]);

        if (!resHum.ok || !resCons.ok) {
          throw new Error('No se pudo establecer conexión con el servicio de métricas.');
        }

        const dataHum = await resHum.json();
        const dataCons = await resCons.json();

        setHumidityData(Array.isArray(dataHum) ? dataHum : []);
        setWaterConsumptionData(Array.isArray(dataCons) ? dataCons : []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  // --- Cálculos de Seguridad ---
  const totalConsumption = waterConsumptionData.reduce((acc, item) => acc + (item.consumption || 0), 0);
  const totalCost = waterConsumptionData.reduce((acc, item) => acc + (item.cost || 0), 0);
  const avgHumidity = humidityData.length > 0 
    ? (humidityData.reduce((acc, item) => acc + (item.humidity || 0), 0) / humidityData.length).toFixed(1) 
    : "0.0";

  // --- Pantalla de Carga ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-100 space-y-4 bg-slate-50 rounded-2xl border border-slate-200">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-500 font-medium">Generando reportes visuales...</p>
      </div>
    );
  }

  // --- Pantalla de Error (Personalizada) ---
  if (error) {
    return (
      <div className="p-12 text-center bg-red-50 rounded-xl border border-red-200 shadow-sm">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h3 className="text-xl font-bold text-red-800">Error al cargar gráficas</h3>
        <p className="text-red-800/80 mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-5 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in duration-700">
      {/* Gráfico de Tendencias de Humedad */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Droplet className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Tendencia de Humedad del Suelo</h3>
              <p className="text-sm text-slate-500">Últimas 24 horas</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase">Promedio</p>
            <p className="text-2xl font-bold text-blue-600">{avgHumidity}%</p>
          </div>
        </div>

        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={humidityData}>
              <defs>
                <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOptimal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '11px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area 
                type="monotone" 
                dataKey="optimal" 
                stroke="#22c55e" 
                fill="url(#colorOptimal)" 
                name="Nivel Óptimo" 
                strokeDasharray="5 5" 
              />
              <Area 
                type="monotone" 
                dataKey="humidity" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                fill="url(#colorHumidity)" 
                name="Humedad Actual" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Consumo de Agua Semanal */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Consumo de Agua Semanal</h3>
              <p className="text-sm text-slate-500">Últimos 7 días</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase">Total Acumulado</p>
            <p className="text-2xl font-bold text-green-600">{totalConsumption.toFixed(1)} m³</p>
            <p className="text-xs font-bold text-slate-400">${totalCost.toFixed(2)} USD</p>
          </div>
        </div>

        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterConsumptionData}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '11px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(val) => [`${Number(val).toFixed(2)} m³`, 'Consumo']}
              />
              <Bar 
                dataKey="consumption" 
                fill="url(#colorBar)" 
                radius={[6, 6, 0, 0]} 
                name="Consumo" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}