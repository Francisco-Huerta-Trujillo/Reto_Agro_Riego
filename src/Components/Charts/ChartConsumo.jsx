import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { day: 'LUN', value: 80 },
  { day: 'MAR', value: 40 },
  { day: 'MIÉ', value: 85 },
  { day: 'JUE', value: 55 },
  { day: 'VIE', value: 188.40 },
  { day: 'SÁB', value: 30 },
  { day: 'DOM', value: 75 },
];

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
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4ade80] shadow-sm w-full font-sans">
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
                  fill={entry.day === 'VIE' ? '#3b82f6' : '#bfdbfe'} 
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