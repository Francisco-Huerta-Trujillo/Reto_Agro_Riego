import {
  LineChart,
  Line,
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
import { TrendingUp, Droplet } from 'lucide-react';

interface ChartsProps {
  humidityData: { time: string; humidity: number; optimal: number }[];
  waterConsumptionData: { day: string; consumption: number; cost: number }[];
}

export function Charts({ humidityData, waterConsumptionData }: ChartsProps) {
  const totalConsumption = waterConsumptionData.reduce((acc, item) => acc + item.consumption, 0);
  const totalCost = waterConsumptionData.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
            <p className="text-2xl font-bold text-blue-600">
              {(humidityData.reduce((acc, item) => acc + item.humidity, 0) / humidityData.length).toFixed(1)}%
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
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
            <XAxis
              dataKey="time"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              label={{ value: 'Humedad (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#64748b' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Area
              type="monotone"
              dataKey="optimal"
              stroke="#22c55e"
              strokeWidth={2}
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
            <p className="text-xs text-slate-500 uppercase">Total</p>
            <p className="text-2xl font-bold text-green-600">{totalConsumption.toFixed(1)} m³</p>
            <p className="text-xs text-slate-500">${totalCost.toFixed(2)}</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={waterConsumptionData}>
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              label={{ value: 'Consumo (m³)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#64748b' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(val: any) => {
                if (val === undefined || val === null) return ['0.00 m³', 'Consumo'];
                return [`${Number(val).toFixed(2)} m³`, 'Consumo'];
              }}
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Bar
              dataKey="consumption"
              fill="url(#colorBar)"
              radius={[8, 8, 0, 0]}
              name="Consumo de Agua"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
