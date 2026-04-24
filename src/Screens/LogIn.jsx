import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Agregamos estados para manejar errores y tiempos de carga
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    // ⚠️ EL SECRETO DE FASTAPI: 
    // OAuth2PasswordRequestForm exige FormData con la llave 'username', no JSON.
    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI mapea esto a tu campo de email
    formData.append('password', password);

    try {
      // Ajusta esta URL si tu prefijo en FastAPI es distinto (ej. solo /login o /api/users/login)
      const res = await fetch('http://localhost:8000/api/v1/usuarios/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: formData.toString()
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.access_token);
        localStorage.removeItem('selectedPredioId');
        window.location.href = '/'; 
        
      } else {
        // Si el usuario se equivoca, FastAPI manda el error en data.detail
        const errData = await res.json();
        setErrorMsg(errData.detail || "Credenciales incorrectas. Verifica tu correo y contraseña.");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMsg("Error al conectar con el servidor. Verifica tu conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 p-6">
      <div className="max-w-4xl w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col md:flex-row">
        
        {/* Lado izquierdo */}
        <div className="hidden md:flex md:w-1/3 bg-green-800 text-white p-8 flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">Gestión de Riego</h1>
          <p className="text-blue-100 text-sm">
            Accede al panel central para monitorear tus parcelas y optimizar el consumo hídrico en tiempo real.
          </p>
        </div>

        {/* Lado derecho */}
        <div className="p-8 md:p-12 flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
          <p className="text-slate-400 mb-8">Ingresa tus credenciales para continuar</p>

          {/* Renderizado condicional del error */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transform transition-all 
                  ${isLoading 
                    ? 'bg-blue-800 cursor-not-allowed text-blue-300' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.01] active:scale-[0.99]'
                  }`}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}