import { Droplets, MapPin, Clock, TrendingDown, TrendingUp, ChevronRight, ArrowLeft, Calendar, Thermometer } from 'lucide-react';
import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, Line } from 'recharts';

export function AreasRiegoPage() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [filterEstado, setFilterEstado] = useState('todos');

  const [areas] = useState([
    {
      id: 'A1',
      name: 'Sector A - Zona 1',
      predio: 'Predio Central',
      area: 8.5,
      cultivo: 'Maíz',
      tipoCultivo: 'Cereal',
      estadoRiego: 'activo',
      humedad: 65,
      temperaturaSuelo: 22.0,
      potencialHidrico: -35,
      electroconductividad: 1.2,
      flujoAgua: 12.5,
      consumoSemanal: 300,
      consumoDiario: 85.3,
      tiempoRiego: '45 min',
      proximoRiego: '6 horas',
      tipoProgramacion: 'Programado Automático',
      temperaturaAmbiental: 28,
      humedadRelativa: 45,
      velocidadViento: 12,
      radiacionSolar: 650,
      evapotranspiracion: 6.2,
      sensoresActivos: 3,
      estadoSensores: 'Monitoreo Continuo',
      ultimoMantenimiento: '2026-02-20',
      eficiencia: 87.5,
      coordenadas: '-33.4489, -70.6693',
    },  
    {
      id: 'A2',
      name: 'Sector B - Zona 2',
      predio: 'Predio Central',
      area: 10.2,
      cultivo: 'Maíz',
      tipoCultivo: 'Cereal',
      estadoRiego: 'completado',
      humedad: 72,
      temperaturaSuelo: 21.5,
      potencialHidrico: -25,
      electroconductividad: 1.1,
      flujoAgua: 0,
      consumoSemanal: 340,
      consumoDiario: 102.8,
      tiempoRiego: '0 min',
      proximoRiego: '4 horas',
      tipoProgramacion: 'Automático',
      temperaturaAmbiental: 26,
      humedadRelativa: 50,
      velocidadViento: 10,
      radiacionSolar: 600,
      evapotranspiracion: 5.8,
      sensoresActivos: 4,
      estadoSensores: 'Monitoreo Continuo',
      ultimoMantenimiento: '2026-02-18',
      eficiencia: 92.3,
      coordenadas: '-33.4512, -70.6705',
    },
    // Agregué datos por defecto a los demás para que no rompa al seleccionarlos
    {
      id: 'N1',
      name: 'Zona Norte A',
      predio: 'Predio Norte',
      area: 7.8,
      cultivo: 'Trigo',
      tipoCultivo: 'Cereal',
      estadoRiego: 'programado',
      humedad: 68,
      temperaturaSuelo: 20.0,
      potencialHidrico: -40,
      electroconductividad: 1.3,
      flujoAgua: 0,
      consumoSemanal: 280,
      consumoDiario: 72.5,
      tiempoRiego: '0 min',
      proximoRiego: '2 horas',
      tipoProgramacion: 'Automático',
      temperaturaAmbiental: 25,
      humedadRelativa: 48,
      velocidadViento: 14,
      radiacionSolar: 620,
      evapotranspiracion: 5.9,
      sensoresActivos: 2,
      estadoSensores: 'Revisión Sugerida',
      ultimoMantenimiento: '2026-02-22',
      eficiencia: 85.0,
      coordenadas: '-33.4456, -70.6680',
    },
    {
      id: 'S1',
      name: 'Sector Sur D',
      predio: 'Predio Sur',
      area: 6.5,
      cultivo: 'Soja',
      tipoCultivo: 'Leguminosa',
      estadoRiego: 'pausado',
      humedad: 32,
      temperaturaSuelo: 25.0,
      potencialHidrico: -80,
      electroconductividad: 1.5,
      flujoAgua: 0,
      consumoSemanal: 150,
      consumoDiario: 58.2,
      tiempoRiego: '0 min',
      proximoRiego: 'Pausado',
      tipoProgramacion: 'Manual',
      temperaturaAmbiental: 30,
      humedadRelativa: 35,
      velocidadViento: 18,
      radiacionSolar: 700,
      evapotranspiracion: 7.5,
      sensoresActivos: 2,
      estadoSensores: 'Mantenimiento Requerido',
      ultimoMantenimiento: '2026-02-15',
      eficiencia: 68.5,
      coordenadas: '-33.4523, -70.6715',
    },
    {
      id: 'E1',
      name: 'Parcela Este 3',
      predio: 'Predio Este',
      area: 9.1,
      cultivo: 'Tomate',
      tipoCultivo: 'Hortícola',
      estadoRiego: 'activo',
      humedad: 70,
      temperaturaSuelo: 23.5,
      potencialHidrico: -30,
      electroconductividad: 1.8,
      flujoAgua: 15.2,
      consumoSemanal: 420,
      consumoDiario: 124.7,
      tiempoRiego: '32 min',
      proximoRiego: '8 horas',
      tipoProgramacion: 'Automático',
      temperaturaAmbiental: 27,
      humedadRelativa: 55,
      velocidadViento: 8,
      radiacionSolar: 580,
      evapotranspiracion: 5.2,
      sensoresActivos: 4,
      estadoSensores: 'Monitoreo Continuo',
      ultimoMantenimiento: '2026-02-24',
      eficiencia: 90.2,
      coordenadas: '-33.4478, -70.6665',
    },
    {
      id: 'E2',
      name: 'Parcela Este 4',
      predio: 'Predio Este',
      area: 8.8,
      cultivo: 'Tomate',
      tipoCultivo: 'Hortícola',
      estadoRiego: 'programado',
      humedad: 64,
      temperaturaSuelo: 23.0,
      potencialHidrico: -45,
      electroconductividad: 1.7,
      flujoAgua: 0,
      consumoSemanal: 400,
      consumoDiario: 118.3,
      tiempoRiego: '0 min',
      proximoRiego: '3 horas',
      tipoProgramacion: 'Automático',
      temperaturaAmbiental: 26,
      humedadRelativa: 52,
      velocidadViento: 9,
      radiacionSolar: 590,
      evapotranspiracion: 5.4,
      sensoresActivos: 3,
      estadoSensores: 'Monitoreo Continuo',
      ultimoMantenimiento: '2026-02-23',
      eficiencia: 88.7,
      coordenadas: '-33.4490, -70.6670',
    },
  ]);

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
      case 'completado':
        return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', dot: 'bg-slate-500' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', dot: 'bg-slate-500' };
    }
  };

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case 'activo': return 'Regando Ahora';
      case 'programado': return 'Programado';
      case 'pausado': return 'Pausado';
      case 'completado': return 'Completado';
      default: return estado;
    }
  };

  const areasFiltered = filterEstado === 'todos' ? areas : areas.filter(a => a.estadoRiego === filterEstado);
  const totalConsumo = areas.reduce((acc, area) => acc + area.consumoDiario, 0);
  const areasActivas = areas.filter(a => a.estadoRiego === 'activo').length;

  // Componente auxiliar para los demás datos (SUELO, RIEGO, AMBIENTAL)
  const DataCard = ({ label, value }) => (
    <div className="bg-white rounded-xl p-4 border border-green-400 shadow-sm">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
    </div>
  );


  // Todo lo de la seleccion
  if (selectedArea) {
    const estadoColor = getEstadoColor(selectedArea.estadoRiego);
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedArea(null)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Volver a Áreas de Riego</span>
        </button>

        {/* 1. Cabecera verde */}
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
              <p className="text-xs opacity-80 mt-1">Último día</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-80 mb-1">Próximo Riego</p>
              <p className="text-lg font-bold">{selectedArea.proximoRiego}</p>
              <p className="text-xs opacity-80 mt-1">{selectedArea.tipoProgramacion}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm opacity-80 mb-1">Sensores</p>
              <p className="text-lg font-bold">{selectedArea.sensoresActivos} Activos</p>
              <p className="text-xs opacity-80 mt-1">Monitoreo Continuo</p>
            </div>
          </div>
        </div>

        {/* 2. Diseño de 3 columnas (SUELO, RIEGO, AMBIENTAL) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          
          {/* Columna: SUELO */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg py-2 mb-6 border border-slate-200 shadow-sm">
              <h3 className="text-center font-bold text-slate-700 tracking-wider">SUELO</h3>
            </div>
            <DataCard label="Humedad de suelo" value={`${selectedArea.humedad}%`} />
            <DataCard label="Potencial Hídrico" value={`${selectedArea.potencialHidrico} kPa`} />
            <DataCard label="Electroconductividad" value={`${selectedArea.electroconductividad} dS/m`} />
            <DataCard label="Temperatura" value={`${selectedArea.temperaturaSuelo.toFixed(1)} °C`} />
          </div>

          {/* Columna: RIEGO */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg py-2 mb-6 border border-slate-200 shadow-sm">
              <h3 className="text-center font-bold text-slate-700 tracking-wider">RIEGO</h3>
            </div>
            <DataCard label="Flujo / Consumo Semanal" value={`${selectedArea.consumoSemanal} m³`} />
          </div>

          {/* Columna: AMBIENTAL */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg py-2 mb-6 border border-slate-200 shadow-sm">
              <h3 className="text-center font-bold text-slate-700 tracking-wider">AMBIENTAL</h3>
            </div>
            <DataCard label="Temperatura" value={`${selectedArea.temperaturaAmbiental} °C`} />
            <DataCard label="Humedad Relativa" value={`${selectedArea.humedadRelativa}%`} />
            <DataCard label="Velocidad del viento" value={`${selectedArea.velocidadViento} km/h`} />
            <DataCard label="Radiación Solar" value={`${selectedArea.radiacionSolar} W/m²`} />
            <DataCard label="Evapotranspiración" value={`${selectedArea.evapotranspiracion} mm/día`} />
          </div>

        </div>
      </div>
    );
  }

  //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  //         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
  //           <div className="flex items-center gap-3 mb-3">
  //             <div className="p-3 bg-blue-100 rounded-lg">
  //               <Droplets className="text-blue-600" size={24} />
  //             </div>
  //             <div>
  //               <p className="text-xs text-slate-500 uppercase">Humedad</p>
  //               <p className="text-2xl font-bold text-slate-800">{selectedArea.humedad}%</p>
  //             </div>
  //           </div>
  //           <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
  //             <div
  //               className={`h-full ${selectedArea.humedad < 40 ? 'bg-red-500' : selectedArea.humedad < 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
  //               style={{ width: `${selectedArea.humedad}%` }}
  //             />
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
  //           <div className="flex items-center gap-3 mb-3">
  //             <div className="p-3 bg-orange-100 rounded-lg">
  //               <Thermometer className="text-orange-600" size={24} />
  //             </div>
  //             <div>
  //               <p className="text-xs text-slate-500 uppercase">Temperatura</p>
  //               <p className="text-2xl font-bold text-slate-800">{selectedArea.temperatura}°C</p>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
  //           <div className="flex items-center gap-3 mb-3">
  //             <div className="p-3 bg-cyan-100 rounded-lg">
  //               <TrendingDown className="text-cyan-600" size={24} />
  //             </div>
  //             <div>
  //               <p className="text-xs text-slate-500 uppercase">Flujo Agua</p>
  //               <p className="text-2xl font-bold text-slate-800">{selectedArea.flujoAgua} L/min</p>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
  //           <div className="flex items-center gap-3 mb-3">
  //             <div className="p-3 bg-purple-100 rounded-lg">
  //               <Clock className="text-purple-600" size={24} />
  //             </div>
  //             <div>
  //               <p className="text-xs text-slate-500 uppercase">Próximo Riego</p>
  //               <p className="text-lg font-bold text-slate-800">{selectedArea.proximoRiego}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
  //         <h3 className="text-xl font-bold text-slate-800 mb-6">Tendencia de Humedad - Últimas 24h</h3>
  //         <div className="h-75 w-full">
  //           <ResponsiveContainer>
  //             <AreaChart data={humedadTendencia}>
  //               <defs>
  //                 <linearGradient id="colorHumedadDetalle" x1="0" y1="0" x2="0" y2="1">
  //                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
  //                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
  //                 </linearGradient>
  //               </defs>
  //               <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
  //               <XAxis dataKey="hora" stroke="#64748b" style={{ fontSize: '12px' }} />
  //               <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
  //               <Tooltip
  //                 contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
  //               />
  //               <Legend />
  //               <Line type="monotone" dataKey="optimo" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" name="Nivel Óptimo" />
  //               <Area type="monotone" dataKey="humedad" stroke="#3b82f6" strokeWidth={3} fill="url(#colorHumedadDetalle)" name="Humedad Actual" />
  //             </AreaChart>
  //           </ResponsiveContainer>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Áreas de Riego</h2>
          <p className="text-slate-500 mt-1">Monitorea todas las zonas de riego activas</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80 mb-1">Áreas Regando Ahora</p>
          <p className="text-4xl font-bold">{areasActivas}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Total Áreas</p>
          <p className="text-3xl font-bold text-slate-800">{areas.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 uppercase tracking-wide">Consumo Diario</p>
          <p className="text-3xl font-bold text-slate-800">{totalConsumo.toFixed(1)} m³</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {areasFiltered.map((area) => {
          const estadoColor = getEstadoColor(area.estadoRiego);
          return (
            <div
              key={area.id}
              className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedArea(area)}
            >
              <div className={`p-4 ${estadoColor.bg} border-b ${estadoColor.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${estadoColor.dot} ${area.estadoRiego === 'activo' ? 'animate-pulse' : ''}`} />
                    <span className={`text-xs font-bold uppercase ${estadoColor.text}`}>
                      {getEstadoLabel(area.estadoRiego)}
                    </span>
                  </div>
                  <ChevronRight className="text-slate-400" size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{area.name}</h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Cultivo</p>
                    <p className="text-sm font-semibold text-slate-700">{area.cultivo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase mb-1">Área</p>
                    <p className="text-2xl font-bold text-slate-800">{area.area} ha</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-500">Humedad Suelo</p>
                    <p className="text-sm font-bold">{area.humedad}%</p>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${area.humedad < 40 ? 'bg-red-500' : area.humedad < 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${area.humedad}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Consumo</p>
                    <p className="text-sm font-bold">{area.consumoDiario} m³</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Eficiencia</p>
                    <p className="text-sm font-bold text-green-600">{area.eficiencia}%</p>
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