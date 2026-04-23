import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
// Verifica que estas rutas sean EXACTAS
import Home from "./Screens/Home";
import { AreasRiegoPage } from "./Screens/AreasRiego";
import { HistorialPage } from "./Screens/HistorialPages";
import { AlertsPages } from "./Screens/AlertsPages";
import Login from "./Screens/LogIn"; 

import NavBar from "./Components/Layout/NavBar";
import TopBar from "./Components/Layout/TopBar";
import { ColorBlindProvider } from "./context/ColorBlindContext";

import "./App.css";

// 1. Asegúrate de que PrivateLayout esté fuera del componente App
const PrivateLayout = () => {
  const isAuth = localStorage.getItem("token");
  // Agregamos una validación simple para evitar errores si localStorage falla
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <NavBar />
      <div className="flex-1 flex flex-col min-w-0"> 
        <TopBar />
        <main className="p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ColorBlindProvider>
      <Router>
        <Routes>
          {/* Ruta Pública */}
          <Route path="/login" element={<Login />} /> 

          {/* Rutas Privadas */}
          <Route element={<PrivateLayout />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Home />} /> {/* Usar 'index' para la ruta raíz interna */}
              <Route path="areas" element={<AreasRiegoPage />} />
              <Route path="historial" element={<HistorialPage />} />
              <Route path="alertas" element={<AlertsPages />} />
            </Route>
          </Route>

          {/* Catch-all: Si la ruta no existe, manda a login o home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ColorBlindProvider>
  );
}

export default App;