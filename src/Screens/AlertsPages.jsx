import { AlertTriangle, Droplets, Clock, MapPin, X, CheckCircle, AlertCircle as AlertCircleIcon, Bell, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AlertsPages() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterSeverity, setFilterSeverity] = useState('todas');
  const [filterResolved, setFilterResolved] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/alerts.json');
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        const data = await response.json();
        setAlerts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleResolveAlert = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleResolveAll = () => {
    if (window.confirm('¿Confirmar todas como resueltas?')) {
      setAlerts(alerts.map(alert => ({ ...alert, resolved: true })));
    }
  };

  const getAlertConfig = (severity) => {
    const configs = {
      critical: { bg: 'bg-red-50', border: 'border-red-300', icon: 'text-red-600', iconBg: 'bg-red-100', title: 'text-red-800', badge: 'bg-red-500' },
      warning: { bg: 'bg-yellow-50', border: 'border-yellow-300', icon: 'text-yellow-600', iconBg: 'bg-yellow-100', title: 'text-yellow-800', badge: 'bg-yellow-500' },
      info: { bg: 'bg-blue-50', border: 'border-blue-300', icon: 'text-blue-600', iconBg: 'bg-blue-100', title: 'text-blue-800', badge: 'bg-blue-500' }
    };
    return configs[severity] || configs.info;
  };

  const getAlertIcon = (type) => {
    const icons = {
      estres_hidrico: AlertTriangle,
      saturacion: Droplets,
      sensor: AlertCircleIcon,
      sistema: Bell,
      mantenimiento: Clock
    };
    return icons[type] || AlertTriangle;
  };

  const alertsFiltered = alerts
    .filter(a => !filterResolved || !a.resolved)
    .filter(a => filterSeverity === 'todas' || a.severity === filterSeverity);

  const stats = {
    critical: alerts.filter(a => !a.resolved && a.severity === 'critical').length,
    warning: alerts.filter(a => !a.resolved && a.severity === 'warning').length,
    info: alerts.filter(a => !a.resolved && a.severity === 'info').length,
    resolved: alerts.filter(a => a.resolved).length
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="animate-spin text-green-600" size={48} />
        <p className="text-slate-500 font-medium">Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-xl border border-red-200">
        <AlertCircleIcon className="mx-auto text-red-500 mb-4" size={48} />
        <p className="text-red-800 font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Centro de Alertas</h2>
          <p className="text-slate-500 mt-1">{alerts.length} registros encontrados</p>
        </div>
        {alerts.filter(a => !a.resolved).length > 0 && (
          <button
            onClick={handleResolveAll}
            className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Resolver Todas
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard color="from-red-500 to-red-600" icon={<AlertTriangle />} label="Críticas" value={stats.critical} />
        <StatCard color="from-yellow-500 to-yellow-600" icon={<AlertCircleIcon />} label="Advertencias" value={stats.warning} />
        <StatCard color="from-blue-500 to-blue-600" icon={<Bell />} label="Informativas" value={stats.info} />
        <StatCard color="from-green-500 to-green-600" icon={<CheckCircle />} label="Resueltas" value={stats.resolved} />
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {['todas', 'critical', 'warning', 'info'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filterSeverity === sev ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sev === 'critical' ? 'Críticas' : sev}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border">
          <input
            type="checkbox"
            checked={!filterResolved}
            onChange={(e) => setFilterResolved(!e.target.checked)}
            className="w-4 h-4 text-green-600 rounded"
          />
          <span className="text-sm font-semibold text-slate-700">Ocultar resueltas</span>
        </label>
      </div>

      <div className="space-y-4">
        {alertsFiltered.length === 0 ? (
          <EmptyState />
        ) : (
          alertsFiltered.map((alert) => (
            <AlertItem 
              key={alert.id} 
              alert={alert} 
              config={getAlertConfig(alert.severity)} 
              Icon={getAlertIcon(alert.type)} 
              onResolve={handleResolveAlert} 
              onDelete={handleDeleteAlert}
              isExpanded={expandedAlert === alert.id}
              onExpand={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ color, icon, label, value }) {
  return (
    <div className={`bg-linear-to-br ${color} p-5 rounded-xl text-white shadow-md`}>
      <div className="flex justify-between items-start">
        {icon}
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="text-sm opacity-90 mt-2 font-medium">{label}</p>
    </div>
  );
}

function AlertItem({ alert, config, Icon, onResolve, onDelete, isExpanded, onExpand }) {
  return (
    <div className={`bg-white rounded-xl border-2 ${config.border} shadow-sm overflow-hidden transition-all ${alert.resolved ? 'opacity-50' : ''}`}>
      <div className={`p-5 ${config.bg}`}>
        <div className="flex gap-4">
          <div className={`p-3 h-fit ${config.iconBg} rounded-lg`}>
            <Icon className={config.icon} size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className={`font-bold text-lg ${config.title}`}>{alert.title}</h4>
              {!alert.resolved && (
                <button onClick={() => onDelete(alert.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              )}
            </div>
            <p className="text-slate-600 text-sm mt-1">{alert.description}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1"><MapPin size={14}/> {alert.location}</span>
              <span className="flex items-center gap-1"><Clock size={14}/> {alert.time}</span>
              <span className="bg-white/50 px-2 py-0.5 rounded border">📍 {alert.predio}</span>
            </div>
            {isExpanded && alert.actions && (
              <div className="mt-4 bg-white/60 p-3 rounded-lg border border-dashed border-slate-300">
                {alert.actions.map((act, i) => (
                  <div key={i} className="flex gap-2 text-sm text-slate-700 mb-1">
                    <span className="text-green-600">→</span> {act}
                  </div>
                ))}
              </div>
            )}
            {!alert.resolved && (
              <div className="flex gap-2 mt-4">
                <button onClick={() => onResolve(alert.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">
                  Resolver
                </button>
                <button onClick={onExpand} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-300">
                  {isExpanded ? 'Cerrar' : 'Acciones'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-slate-200">
      <CheckCircle className="mx-auto text-green-200 mb-4" size={64} />
      <h3 className="text-xl font-bold text-slate-800">Sin Alertas</h3>
    </div>
  );
}