import React, { useState, useEffect } from 'react';
import { usePredio } from '../../context/PredioContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1c3d] text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
        {payload[0].value.toFixed(2)}
      </div>
    );
  }
  return null;
};

const ChartConsumo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedPredioId } = usePredio();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedPredioId) {
        setData([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/consumo-agua.json?predioId=${selectedPredioId}`);
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el historial de consumo.');
        }

        const jsonData = await response.json();
        
        if (!Array.isArray(jsonData)) {
          throw new Error('Formato de datos inválido.');
        }

        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPredioId]);

  // Buscamos el valor máximo para resaltar esa barra automáticamente
  const maxValue = data.length > 0 ? Math.max(...data.map(d => d.value)) : 0;

  // --- Estado de Carga ---
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-100 shadow-sm w-full h-80 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="animate-spin text-[#4ade80]" size={32} />
        <p className="text-gray-400 text-sm font-medium">Obteniendo métricas...</p>
      </div>
    );
  }

  // --- Estado de Error (Siguiendo tus especificaciones) ---
  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-[2.5rem] border border-red-200">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
        <p className="text-red-800 font-bold">Error de Datos</p>
        <p className="text-red-800/70 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4ade80] shadow-sm w-full font-sans animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#1a1c3d]">Consumo de Agua</h2>
        <button className="bg-gray-50 text-gray-400 px-6 py-1.5 rounded-full text-sm font-medium border border-gray-100">
          Semanal
        </button>
      </div>
      
      <hr className="border-gray-100 mb-8" />
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9ca3af', fontSize: 12}}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9ca3af', fontSize: 12}}
              ticks={[0, 50, 100, 200]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  // Resalta en azul oscuro la barra con el valor más alto, las demás en azul claro
                  fill={entry.value === maxValue ? '#3b82f6' : '#bfdbfe'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartConsumo;