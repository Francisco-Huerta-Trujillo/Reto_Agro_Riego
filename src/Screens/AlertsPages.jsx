import { AlertTriangle, Droplets, Clock, MapPin, X, CheckCircle, AlertCircle as AlertCircleIcon, Bell } from 'lucide-react';
import { useState } from 'react';

export function AlertsPages() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'estres_hidrico',
      severity: 'critical',
      title: 'Estrés Hídrico Severo',
      description: 'Nivel crítico de humedad detectado en Sector A. Cultivo en riesgo inmediato. Se requiere acción urgente.',
      location: 'Sector A - Nodo 3',
      predio: 'Predio Central',
      time: 'Hace 5 min',
      timestamp: Date.now() - 5 * 60 * 1000,
      resolved: false,
      actions: ['Activar riego inmediato en zona afectada', 'Verificar funcionamiento de válvulas', 'Revisar sensores de humedad cercanos'],
    },
    {
      id: '2',
      type: 'saturacion',
      severity: 'warning',
      title: 'Saturación de Suelo Detectada',
      description: 'Humedad excesiva en Sector B. Existe riesgo de encharcamiento y daño a las raíces del cultivo.',
      location: 'Sector B - Nodo 2',
      predio: 'Predio Central',
      time: 'Hace 15 min',
      timestamp: Date.now() - 15 * 60 * 1000,
      resolved: false,
      actions: ['Suspender riego programado', 'Verificar sistema de drenaje', 'Revisar programación de riego'],
    },
    {
      id: '3',
      type: 'consumo',
      severity: 'warning',
      title: 'Consumo de Agua Elevado',
      description: 'El consumo está un 25% por encima del promedio semanal en Predio Central. Posible fuga o mal funcionamiento.',
      location: 'Predio Central',
      predio: 'Predio Central',
      time: 'Hace 1 hora',
      timestamp: Date.now() - 60 * 60 * 1000,
      resolved: false,
      actions: ['Inspeccionar sistema de tuberías', 'Revisar válvulas y conexiones', 'Verificar programación'],
    },
    {
      id: '4',
      type: 'estres_hidrico',
      severity: 'critical',
      title: 'Zona Crítica - Riego Urgente Requerido',
      description: 'Sector Sur D presenta humedad del 32%. Nivel muy por debajo del óptimo. Requiere atención inmediata.',
      location: 'Sector Sur D - Nodo 4',
      predio: 'Predio Sur',
      time: 'Hace 2 min',
      timestamp: Date.now() - 2 * 60 * 1000,
      resolved: false,
      actions: ['Activar riego de emergencia', 'Verificar sistema de distribución', 'Contactar supervisor de campo'],
    },
    {
      id: '5',
      type: 'sensor',
      severity: 'warning',
      title: 'Sensor con Lecturas Anómalas',
      description: 'El Nodo 5 del Predio Norte está reportando valores inconsistentes. Posible falla en calibración.',
      location: 'Zona Norte - Nodo 5',
      predio: 'Predio Norte',
      time: 'Hace 30 min',
      timestamp: Date.now() - 30 * 60 * 1000,
      resolved: false,
      actions: ['Reiniciar sensor', 'Verificar conexión eléctrica', 'Realizar calibración manual'],
    },
    {
      id: '6',
      type: 'mantenimiento',
      severity: 'info',
      title: 'Mantenimiento Preventivo Pendiente',
      description: 'Revisión trimestral de sensores programada para el Predio Este. Se recomienda realizar en las próximas 48 horas.',
      location: 'Predio Este - Todos los sectores',
      predio: 'Predio Este',
      time: 'Hace 2 horas',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      resolved: false,
      actions: ['Programar visita técnica', 'Preparar equipos de calibración', 'Notificar personal de mantenimiento'],
    },
    {
      id: '7',
      type: 'saturacion',
      severity: 'warning',
      title: 'Posible Saturación en Parcela Este 4',
      description: 'La Parcela Este 4 muestra niveles altos de humedad (78%). Monitorear de cerca para evitar encharcamiento.',
      location: 'Parcela Este 4 - Nodo 4',
      predio: 'Predio Este',
      time: 'Hace 10 min',
      timestamp: Date.now() - 10 * 60 * 1000,
      resolved: false,
      actions: ['Reducir frecuencia de riego', 'Monitorear evolución de drenaje', 'Evaluar ajuste de programación'],
    },
    {
      id: '8',
      type: 'sistema',
      severity: 'info',
      title: 'Actualización de Sistema Disponible',
      description: 'Nueva versión del software de control disponible. Incluye mejoras de rendimiento y nuevas funcionalidades.',
      location: 'Sistema Central',
      predio: 'Todos los predios',
      time: 'Hace 3 horas',
      timestamp: Date.now() - 3 * 60 * 60 * 1000,
      resolved: false,
      actions: ['Revisar notas de actualización', 'Programar ventana de mantenimiento', 'Realizar backup de configuración'],
    },
  ]);

  const [filterSeverity, setFilterSeverity] = useState('todas');
  const [filterResolved, setFilterResolved] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState(null);

  const handleResolveAlert = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleResolveAll = () => {
    if (window.confirm('¿Estás seguro de marcar todas las alertas como resueltas?')) {
      setAlerts(alerts.map(alert => ({ ...alert, resolved: true })));
    }
  };

  const getAlertConfig = (severity) => {
    if (severity === 'critical') {
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        icon: 'text-red-600',
        iconBg: 'bg-red-100',
        title: 'text-red-800',
        badge: 'bg-red-500',
      };
    } else if (severity === 'warning') {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        icon: 'text-yellow-600',
        iconBg: 'bg-yellow-100',
        title: 'text-yellow-800',
        badge: 'bg-yellow-500',
      };
    } else {
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        icon: 'text-blue-600',
        iconBg: 'bg-blue-100',
        title: 'text-blue-800',
        badge: 'bg-blue-500',
      };
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'estres_hidrico':
        return AlertTriangle;
      case 'saturacion':
        return Droplets;
      case 'sensor':
        return AlertCircleIcon;
      case 'sistema':
        return Bell;
      default:
        return AlertTriangle;
    }
  };

  const alertsFiltered = alerts
    .filter(a => !filterResolved || !a.resolved)
    .filter(a => filterSeverity === 'todas' || a.severity === filterSeverity);

  const criticalCount = alerts.filter(a => !a.resolved && a.severity === 'critical').length;
  const warningCount = alerts.filter(a => !a.resolved && a.severity === 'warning').length;
  const infoCount = alerts.filter(a => !a.resolved && a.severity === 'info').length;
  const resolvedCount = alerts.filter(a => a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Centro de Alertas</h2>
          <p className="text-slate-500 mt-1">Gestiona y resuelve todas las alertas del sistema</p>
        </div>
        {alerts.filter(a => !a.resolved).length > 0 && (
          <button
            onClick={handleResolveAll}
            className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            Resolver Todas las Alertas
          </button>
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-red-500 to-red-600 p-6 rounded-xl text-white shadow-lg">
          <AlertTriangle className="mb-2" size={32} />
          <p className="text-sm opacity-80 mb-1">Alertas Críticas</p>
          <p className="text-4xl font-bold">{criticalCount}</p>
          <p className="text-xs opacity-70 mt-1">Requieren acción inmediata</p>
        </div>

        <div className="bg-linear-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-lg">
          <AlertCircleIcon className="mb-2" size={32} />
          <p className="text-sm opacity-80 mb-1">Advertencias</p>
          <p className="text-4xl font-bold">{warningCount}</p>
          <p className="text-xs opacity-70 mt-1">Atención requerida</p>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <Bell className="mb-2" size={32} />
          <p className="text-sm opacity-80 mb-1">Informativas</p>
          <p className="text-4xl font-bold">{infoCount}</p>
          <p className="text-xs opacity-70 mt-1">Para tu información</p>
        </div>

        <div className="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <CheckCircle className="mb-2" size={32} />
          <p className="text-sm opacity-80 mb-1">Resueltas Hoy</p>
          <p className="text-4xl font-bold">{resolvedCount}</p>
          <p className="text-xs opacity-70 mt-1">Problemas solucionados</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterSeverity('todas')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterSeverity === 'todas' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterSeverity === 'critical' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Críticas ({criticalCount})
            </button>
            <button
              onClick={() => setFilterSeverity('warning')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterSeverity === 'warning' ? 'bg-yellow-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Advertencias ({warningCount})
            </button>
            <button
              onClick={() => setFilterSeverity('info')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterSeverity === 'info' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Info ({infoCount})
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!filterResolved}
              onChange={(e) => setFilterResolved(!e.target.checked)}
              className="w-4 h-4 rounded border-slate-300"
            />
            <span className="text-sm font-medium text-slate-700">Ocultar resueltas</span>
          </label>
        </div>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {alertsFiltered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Todo en orden!</h3>
            <p className="text-slate-500">No hay alertas activas. Todos los sistemas funcionan correctamente.</p>
          </div>
        ) : (
          alertsFiltered.map((alert) => {
            const config = getAlertConfig(alert.severity);
            const Icon = getAlertIcon(alert.type);
            const isExpanded = expandedAlert === alert.id;

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-xl border-2 ${config.border} shadow-lg overflow-hidden transition-all ${
                  alert.resolved ? 'opacity-60' : ''
                }`}
              >
                <div className={`p-6 ${config.bg} border-b ${config.border}`}>
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 p-3 ${config.iconBg} rounded-xl`}>
                      <Icon className={config.icon} size={28} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className={`font-bold text-lg ${config.title}`}>
                              {alert.title}
                            </h4>
                            <span className={`px-3 py-1 ${config.badge} text-white text-xs font-bold rounded uppercase`}>
                              {alert.severity === 'critical' ? 'Crítico' : alert.severity === 'warning' ? 'Advertencia' : 'Info'}
                            </span>
                            {alert.resolved && (
                              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded uppercase">
                                ✓ Resuelta
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                            {alert.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span className="font-medium">{alert.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{alert.time}</span>
                            </div>
                            <div className="font-semibold text-slate-800">
                              📍 {alert.predio}
                            </div>
                          </div>
                        </div>
                        {!alert.resolved && (
                          <button
                            onClick={() => handleDeleteAlert(alert.id)}
                            className="shrink-0 p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Descartar"
                          >
                            <X size={20} className="text-red-600" />
                          </button>
                        )}
                      </div>

                      {alert.actions && alert.actions.length > 0 && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                          <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            Acciones Recomendadas:
                          </p>
                          <ul className="space-y-2">
                            {alert.actions.map((action, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                                <span className="shrink-0 w-6 h-6 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="flex-1">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {!alert.resolved && (
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-md"
                          >
                            <CheckCircle size={18} />
                            Marcar como Resuelta
                          </button>
                          <button
                            onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}