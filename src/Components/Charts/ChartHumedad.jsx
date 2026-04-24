import React, { useState, useEffect } from 'react';
import { usePredio } from '../../context/PredioContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';

const ChartHumedad = () => {
  const { selectedPredioId } = usePredio();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHumedad = async () => {
      if (!selectedPredioId || selectedPredioId === 'undefined') {
        setData([]);
        setLoading(false);
        return;
    }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/v1/predios/${selectedPredioId}/chart-humedad`);
        
        if (!response.ok) {
          throw new Error('No se pudo establecer comunicación con los sensores.');
        }

        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData)) {
          throw new Error('El servidor entregó un formato de datos incompatible.');
        }

        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHumedad();
  }, [selectedPredioId]);

  // --- Estado de Carga (Sutil y limpio) ---
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-100 shadow-sm w-full h-80 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#4F75FF]" size={32} />
        <p className="text-gray-400 font-medium">Sincronizando sensores...</p>
      </div>
    );
  }

  // --- Pantalla de Error (Colores solicitados) ---
  if (error) {
    return (
      <div className="p-10 text-center bg-red-50 rounded-[2.5rem] border border-red-200">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
        <h3 className="text-red-800 font-bold text-lg">Error de Lectura</h3>
        <p className="text-red-800/70 text-sm mt-1">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 text-xs font-bold text-red-600 underline hover:text-red-800"
        >
          Intentar reconectar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4ade80] shadow-sm w-full animate-in fade-in duration-500">
      <div className="flex items-baseline gap-2 mb-6 font-sans">
        <h2 className="text-xl font-bold text-gray-800">Tendencia de Humedad de Suelo</h2>
        <span className="text-sm text-gray-400">Últimas 24 horas</span>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F75FF" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#4F75FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9ca3af', fontSize: 12}}
              interval="preserveStartEnd" // Mejora la legibilidad si hay muchos puntos
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9ca3af', fontSize: 12}}
              domain={[0, 'auto']} // Se adapta a la humedad máxima recibida
              ticks={[0, 20, 40, 60, 80]}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '12px'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#4F75FF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartHumedad;