import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar tras el login

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Loguea sin importar que escriba
    console.log("Simulando login con:", email, password);
  
    // Guarda token de mentira
    localStorage.setItem('token', 'token_de_prueba_123');

    // Redirige al Home
    navigate('/');

    // try {
    //   const res = await fetch('http://localhost:3000/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   });

    //   if (res.ok) {
    //     const data = await res.json();
    //     localStorage.setItem('token', data.token);
    //     // Redirigir al home automáticamente después de loguearse
    //     navigate('/');
    //   } else {
    //     alert("Credenciales incorrectas");
    //   }
    // } catch (error) {
    //   console.error("Error en el login:", error);
    // }
  };

 return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 p-6">
      {/* Contenedor más ancho: max-w-4xl (aprox 896px) */}
      <div className="max-w-4xl w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col md:flex-row">
        
        {/* Lado izquierdo: Decorativo/Info (Opcional, se oculta en móvil) */}
        <div className="hidden md:flex md:w-1/3 bg-green-800 text-white p-8 flex-col justify-center ">
          <h1 className="text-2xl font-bold mb-4">Gestión de Riego</h1>
          <p className="text-blue-100 text-sm">
            Accede al panel central para monitorear tus parcelas y optimizar el consumo hídrico en tiempo real.
          </p>
        </div>

        {/* Lado derecho: Formulario */}
        <div className="p-8 md:p-12 flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
          <p className="text-slate-400 mb-8">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Grid para que en pantallas anchas se vea mejor */}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}