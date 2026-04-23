import { HiExclamationCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

const AlertBanner = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        // Cambia esta URL por tu endpoint real (ej: /api/active-alerts)
        const response = await fetch('/api/active-alerts.json');
        
        if (!response.ok) {
          throw new Error("No se pudo sincronizar con el panel de control.");
        }

        const data = await response.json();
        setAlerts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // --- Estado de Carga ---
  if (loading) {
    return (
      <div className="mt-6 p-10 flex justify-center items-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <Loader2 className="animate-spin text-[#1D2F58] mr-3" />
        <span className="text-gray-500 font-medium">Buscando alertas activas...</span>
      </div>
    );
  }

  // --- Estado de Error (Siguiendo tus instrucciones de estilo) ---
  if (error) {
    return (
      <div className="mt-6 p-8 text-center bg-red-50 rounded-xl border border-red-200">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
        <p className="text-red-800 font-bold text-lg">Error de Monitoreo</p>
        <p className="text-red-800/80 text-sm mt-1">{error}</p>
      </div>
    );
  }

  // Calculamos cuántas alertas críticas hay para el contador superior
  const criticalCount = alerts.filter(a => a.severity?.toUpperCase() === 'CRÍTICO' || a.severity?.toUpperCase() === 'CRITICAL').length;

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-md">
      {/* Header del Panel */}
      <div className="bg-[#1D2F58] p-3 flex justify-between items-center px-6">
        <div className="text-white font-bold flex gap-2 items-center">
          Panel de Alertas Activas 
          <span className="text-xs font-normal opacity-70"> Monitoreo en Tiempo Real </span>
        </div>
        {criticalCount > 0 && (
          <span className="bg-[#FF2F2F] text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
            {criticalCount} {criticalCount === 1 ? 'CRÍTICO' : 'CRÍTICOS'}
          </span>
        )}
      </div>

      {/* Cuerpo de Alertas Dinámicas */}
      {alerts.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {alerts.map((alert, index) => (
            <div key={alert.id || index} className="bg-[#FCF3F2] p-6 flex items-start gap-4 transition-colors hover:bg-[#f8e8e6]">
              <HiExclamationCircle className="text-[#FF2F2F] text-2xl mt-1 shrink-0" />
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-[#FF2F2F] font-bold text-lg">
                    {alert.title}
                  </h3>
                  {alert.severity && (
                    <span className="bg-[#FF2F2F] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                      {alert.severity}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1 italic">
                  {alert.description}
                </p>
                {alert.timestamp && (
                  <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest">
                    Reportado: {alert.timestamp}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Pie del Panel (Estado vacío) */
        <div className="bg-white p-10 text-center">
          <h2 className="text-gray-300 text-4xl font-light tracking-wide">
            No existen más alertas pendientes
          </h2>
        </div>
      )}
    </div>
  );
};

export default AlertBanner;