import React, { useState, useEffect } from 'react';
import { 
  Bell, CheckCircle, Layout, Download, MapPin, 
  Clock, X, User, ShieldAlert, Loader2, AlertCircle
} from 'lucide-react';

// IMPORTAMOS TUS SERVICIOS REALES
import { alertService } from '../services/alertService';
import { userService } from '../services/userService';

export function AdminDashboardPage() {
  // Estados para los datos de la base de datos
  const [alertas, setAlertas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para la UI
  const [filtroAlerta, setFiltroAlerta] = useState('Todas');
  const [ocultarResueltas, setOcultarResueltas] = useState(false);

  // 1. CARGAR DATOS DESDE EL BACKEND
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Promise.all ejecuta ambas peticiones al mismo tiempo
        const [alertasData, usuariosData] = await Promise.all([
          alertService.getAll(),
          userService.getAll()
        ]);
        
        setAlertas(alertasData);
        setUsuarios(usuariosData);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
        setError("No se pudo conectar con el servidor para cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. FUNCIÓN PARA MARCAR ALERTA COMO RESUELTA
  const handleResolverAlerta = async (id) => {
    try {
      // Llamamos al endpoint PUT /{alert_id}/read de tu backend
      await alertService.update(id, {}); 
      // Actualizamos el estado local para quitarla de la vista inmediatamente
      setAlertas(alertas.filter(a => a.id !== id));
    } catch (err) {
      alert("Hubo un error al marcar la alerta como resuelta.");
    }
  };

  // 3. ESTADOS DE CARGA Y ERROR
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-green-600" size={48} />
        <p className="text-slate-500 font-medium">Cargando panel de administración...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-10 p-12 text-center bg-red-50 rounded-3xl border border-red-200">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
        <p className="text-2xl font-bold text-red-800 mb-2">Error de Conexión</p>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Filtrado de alertas (puedes ajustar esta lógica según los tipos exactos de tu BD)
  const alertasFiltradas = alertas.filter(a => {
    if (filtroAlerta === 'Todas') return true;
    // Si tu BD guarda "Info" o "Advertencia" en 'tipo_de_alerta', haz que coincida aquí
    return a.tipo_de_alerta?.toLowerCase().includes(filtroAlerta.split(' ')[0].toLowerCase());
  });

  return (
    <div className="space-y-10 pt-6 animate-in fade-in duration-500 pb-12">
      
      {/* SECCIÓN 1: ESTADÍSTICAS GLOBALES (Visuales estáticos por ahora) */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Accesos Recientes</h2>
          <p className="text-slate-500 mt-1">Monitoree los accesos en las últimas 24 horas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta Azul */}
          <div className="bg-[#2563eb] rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            {/* ... (Todo el contenido de la Tarjeta Azul se queda exactamente igual) ... */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={24} className="opacity-90" />
                  <h3 className="font-semibold text-lg opacity-90">Usuarios Registrados</h3>
                </div>
                <p className="text-6xl font-bold mb-2">{usuarios.length}</p>
                <p className="text-sm opacity-80 max-w-50 leading-tight">
                  Total de cuentas activas en el sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta Verde */}
          <div className="bg-[#16a34a] rounded-2xl p-6 text-white shadow-lg shadow-green-200">
            {/* ... (Todo el contenido de la Tarjeta Verde se queda exactamente igual) ... */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={24} className="opacity-90" />
                  <h3 className="font-semibold text-lg opacity-90">Alertas Históricas</h3>
                </div>
                <p className="text-6xl font-bold mb-2">{alertas.length}</p>
                <p className="text-sm opacity-80 max-w-50 leading-tight">
                  Total de alertas registradas en la base de datos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: ALERTAS DE SEGURIDAD REALES */}
      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Alertas de Seguridad</h2>
        
        {/* Controles de Filtro */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            {['Todas', 'Estrés Hídrico', 'Temperatura'].map((filtro) => (
              <button 
                key={filtro}
                onClick={() => setFiltroAlerta(filtro)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filtroAlerta === filtro ? 'bg-green-600 text-white shadow' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {filtro}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Alertas Mapeada desde PostgreSQL */}
        <div className="space-y-4">
          {alertasFiltradas.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
              <h3 className="text-2xl text-slate-600 font-bold">Todo en orden</h3>
              <p className="text-slate-400">No hay alertas pendientes en esta categoría.</p>
            </div>
          ) : (
            alertasFiltradas.map((alerta) => (
              <div key={alerta.id} className="relative border-2 border-amber-300 bg-amber-50 rounded-xl p-5">
                <button 
                  onClick={() => handleResolverAlerta(alerta.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  title="Ocultar"
                >
                  <X size={20} />
                </button>
                
                <div className="flex gap-4">
                  <div className="mt-1">
                    <ShieldAlert className="text-amber-500" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-amber-800">
                        {alerta.tipo_de_alerta}
                      </h3>
                    </div>
                    
                    {/* Mensaje real de tu base de datos */}
                    <p className="text-slate-700 mb-3 font-medium">
                      {alerta.mensaje_de_alerta}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
                      {/* Formateamos la fecha que llega de Postgres */}
                      <span className="flex items-center gap-1.5">
                        <Clock size={16} /> 
                        {new Date(alerta.fecha).toLocaleString('es-MX')}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleResolverAlerta(alerta.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                      >
                        <CheckCircle size={16} /> Marcar como Resuelta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECCIÓN 3: USUARIOS REALES */}
      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Usuarios Registrados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usuarios.map((user) => (
            <div key={user.id_usuario} className="bg-[#2563eb] rounded-2xl p-6 text-white flex items-start gap-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-500/50 p-4 rounded-full shrink-0">
                <User size={64} className="text-white opacity-90" />
              </div>
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <h3 className="text-2xl font-bold mb-2 capitalize">{user.nombre}</h3>
                  <div className="inline-block bg-blue-700/50 px-3 py-1 rounded-full text-sm font-medium mb-4 uppercase tracking-wide">
                    {user.rol || 'Usuario Estándar'}
                  </div>
                  <p className="text-sm opacity-90 mb-2">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}