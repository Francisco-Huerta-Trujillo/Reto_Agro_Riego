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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Bienvenido
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Correo Electrónico</label>
            <input
              type="email"
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}