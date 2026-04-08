import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', value: 8 }, { time: '02:00', value: 7 }, { time: '04:00', value: 12 },
  { time: '06:00', value: 5 }, { time: '08:00', value: 10 }, { time: '10:00', value: 18 },
  { time: '12:00', value: 25 }, { time: '14:00', value: 18 }, { time: '16:00', value: 40 },
  { time: '18:00', value: 38 }, { time: '20:00', value: 60 }, { time: '22:00', value: 62 },
  { time: '24:00', value: 60 },
];

const ChartHumedad = () => {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#4ade80] shadow-sm w-full">
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
              interval={1}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9ca3af', fontSize: 12}}
              domain={[0, 80]}
              ticks={[0, 10, 20, 40, 60, 80]}
            />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#4F75FF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartHumedad;