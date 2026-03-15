import { Calendar, Search, Download, Clock, MapPin, User } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function HistorialPage() {
  const [historial] = useState([
    {
      id: '1',
      fecha: '2026-02-27',
      hora: '09:30',
      predio: 'Predio Central',
      area: 'Sector A - Zona 1',
      tipoEvento: 'riego',
      descripcion: 'Riego automático completado exitosamente',
      duracion: '45 min',
      consumoAgua: 85.3,
      usuario: 'Sistema',
    },
    {
      id: '2',
      fecha: '2026-02-27',
      hora: '08:15',
      predio: 'Predio Norte',
      area: 'Zona Norte A',
      tipoEvento: 'riego',
      descripcion: 'Riego manual iniciado por operador',
      duracion: '60 min',
      consumoAgua: 120.5,
      usuario: 'Juan Pérez',
    },
    {
      id: '3',
      fecha: '2026-02-27',
      hora: '07:45',
      predio: 'Predio Sur',
      area: 'Sector Sur D',
      tipoEvento: 'alerta',
      descripcion: 'Alerta de estrés hídrico detectada - Nivel crítico',
      usuario: 'Sistema',
    },
    {
      id: '4',
      fecha: '2026-02-27',
      hora: '06:20',
      predio: 'Predio Este',
      area: 'Parcela Este 3',
      tipoEvento: 'riego',
      descripcion: 'Riego automático completado',
      duracion: '38 min',
      consumoAgua: 95.7,
      usuario: 'Sistema',
    },
    {
      id: '5',
      fecha: '2026-02-26',
      hora: '22:30',
      predio: 'Predio Central',
      area: 'Sistema General',
      tipoEvento: 'mantenimiento',
      descripcion: 'Mantenimiento preventivo de sensores de humedad',
      usuario: 'Carlos Rodríguez',
    },
    {
      id: '6',
      fecha: '2026-02-26',
      hora: '19:45',
      predio: 'Predio Sur',
      area: 'Sector Sur A',
      tipoEvento: 'riego',
      descripcion: 'Riego manual completado',
      duracion: '52 min',
      consumoAgua: 108.2,
      usuario: 'María González',
    },
    {
      id: '7',
      fecha: '2026-02-26',
      hora: '17:15',
      predio: 'Predio Este',
      area: 'Sistema General',
      tipoEvento: 'configuracion',
      descripcion: 'Actualización de parámetros de riego automático',
      usuario: 'Juan Pérez',
    },
    {
      id: '8',
      fecha: '2026-02-26',
      hora: '15:20',
      predio: 'Predio Norte',
      area: 'Zona Norte B',
      tipoEvento: 'riego',
      descripcion: 'Riego automático completado',
      duracion: '42 min',
      consumoAgua: 89.4,
      usuario: 'Sistema',
    },
    {
      id: '9',
      fecha: '2026-02-26',
      hora: '14:10',
      predio: 'Predio Central',
      area: 'Sector B - Zona 2',
      tipoEvento: 'alerta',
      descripcion: 'Advertencia de saturación de suelo detectada',
      usuario: 'Sistema',
    },
    {
      id: '10',
      fecha: '2026-02-26',
      hora: '12:30',
      predio: 'Predio Sur',
      area: 'Sector Sur C',
      tipoEvento: 'riego',
      descripcion: 'Riego automático completado',
      duracion: '47 min',
      consumoAgua: 93.8,
      usuario: 'Sistema',
    },
    {
      id: '11',
      fecha: '2026-02-25',
      hora: '18:00',
      predio: 'Predio Este',
      area: 'Parcela Este 4',
      tipoEvento: 'mantenimiento',
      descripcion: 'Calibración de sensores de temperatura',
      usuario: 'Carlos Rodríguez',
    },
    {
      id: '12',
      fecha: '2026-02-25',
      hora: '16:45',
      predio: 'Predio Norte',
      area: 'Sistema General',
      tipoEvento: 'configuracion',
      descripcion: 'Modificación de horarios de riego programado',
      usuario: 'María González',
    },
  ]);

  const [filterTipo, setFilterTipo] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const consumoSemanal = [
    { dia: 'Lun 21', consumo: 456, eventos: 12 },
    { dia: 'Mar 22', consumo: 523, eventos: 15 },
    { dia: 'Mié 23', consumo: 489, eventos: 14 },
    { dia: 'Jue 24', consumo: 612, eventos: 18 },
    { dia: 'Vie 25', consumo: 578, eventos: 16 },
    { dia: 'Sáb 26', consumo: 402, eventos: 11 },
    { dia: 'Dom 27', consumo: 385, eventos: 10 },
  ];

  const getTipoEventoColor = (tipo) => {
    switch (tipo) {
      case 'riego':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: '💧' };
      case 'mantenimiento':
        return { bg: 'bg-purple-100', text: 'text-purple-700', icon: '🔧' };
      case 'alerta':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: '⚠️' };
      case 'configuracion':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: '⚙️' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', icon: '📝' };
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'riego': return 'Riego';
      case 'mantenimiento': return 'Mantenimiento';
      case 'alerta': return 'Alerta';
      case 'configuracion': return 'Configuración';
      default: return tipo;
    }
  };

  const historialFiltered = historial
    .filter(h => filterTipo === 'todos' || h.tipoEvento === filterTipo)
    .filter(h =>
      h.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.predio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.area.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalEventosHoy = historial.filter(h => h.fecha === '2026-02-27').length;
  const totalConsumoSemanal = consumoSemanal.reduce((acc, item) => acc + item.consumo, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Historial de Eventos</h2>
          <p className="text-slate-500 mt-1">Registro completo de todas las actividades del sistema</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors shadow-lg">
          <Download size={20} />
          <span className="font-semibold">Exportar Reporte</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <Calendar className="mb-2" size={32} />
          <p className="text-sm opacity-80 mb-1">Eventos Hoy</p>
          <p className="text-4xl font-bold">{totalEventosHoy}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
            <p className="text-sm text-slate-500 uppercase">Total Eventos</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{historial.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <p className="text-sm text-slate-500 uppercase">Consumo Semanal</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalConsumoSemanal} m³</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <p className="text-sm text-slate-500 uppercase">Riegos Completados</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{historial.filter(h => h.tipoEvento === 'riego').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Consumo de Agua - Última Semana</h3>
        <div className="h-75 w-full">
          <ResponsiveContainer>
            <BarChart data={consumoSemanal}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="dia" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="consumo" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Consumo (m³)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en el historial..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['todos', 'riego', 'alerta', 'mantenimiento'].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFilterTipo(tipo)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filterTipo === tipo ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {tipo === 'todos' ? 'Todos' : getTipoLabel(tipo)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            {historialFiltered.map((entry, index) => {
              const tipoColor = getTipoEventoColor(entry.tipoEvento);
              const isLast = index === historialFiltered.length - 1;
              return (
                <div key={entry.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 ${tipoColor.bg} rounded-full flex items-center justify-center text-2xl shrink-0`}>
                      {tipoColor.icon}
                    </div>
                    {!isLast && <div className="flex-1 w-0.5 bg-slate-300 mt-2 min-h-10" />}
                  </div>

                  <div className="flex-1 pb-6">
                    <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors shadow-sm">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${tipoColor.bg} ${tipoColor.text}`}>
                              {getTipoLabel(entry.tipoEvento)}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar size={14} /> {entry.fecha}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock size={14} /> {entry.hora}
                            </span>
                          </div>
                          <h4 className="font-semibold text-slate-800 text-lg mb-2">{entry.descripcion}</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><MapPin size={12} /> Predio</p>
                          <p className="font-medium text-slate-700">{entry.predio}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Área</p>
                          <p className="font-medium text-slate-700">{entry.area}</p>
                        </div>
                        {entry.duracion && (
                          <div>
                            <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Clock size={12} /> Duración</p>
                            <p className="font-medium text-slate-700">{entry.duracion}</p>
                          </div>
                        )}
                        {entry.consumoAgua && (
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Consumo</p>
                            <p className="font-medium text-blue-700">{entry.consumoAgua} m³</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><User size={12} /> Usuario</p>
                          <p className="font-medium text-slate-700">{entry.usuario}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorialPage;