import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import Home from "./Screens/Home";
import { AreasRiegoPage } from "./Screens/AreasRiego";
import { HistorialPage } from "./Screens/HistorialPages";
import { AlertsPages } from "./Screens/AlertsPages";
import Login from "./Screens/LogIn"; 
import { AdminDashboardPage } from "./Screens/AdminDashboardPages"; 

import NavBar from "./Components/Layout/NavBar";
import TopBar from "./Components/Layout/TopBar";
import { ColorBlindProvider } from "./context/ColorBlindContext";
import { PredioProvider } from "./context/PredioContext";

import "./App.css";

// 1. Guardia de Autenticación General (Para logueados)
const PrivateLayout = () => {
  const isAuth = localStorage.getItem("token");
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

// ✨ 2. NUEVO GUARDIA DE ROLES ✨
// Revisa si el rol guardado coincide con los roles permitidos
const RoleProtectedLayout = ({ allowedRoles }) => {
  // Asumimos que al hacer login guardaste el rol en localStorage
  const userRole = localStorage.getItem("rol"); 
  
  if (!allowedRoles.includes(userRole)) {
    // Si no tiene el rol, lo mandamos al inicio para que no vea la pantalla
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
};

const pageTitles = {
  '/': 'AgroRiego | Inicio',
  '/areas': 'AgroRiego | Áreas de Riego',
  '/historial': 'AgroRiego | Historial',
  '/alertas': 'AgroRiego | Alertas',
  '/login': 'AgroRiego | Login',
  '/admin': 'AgroRiego | Panel de Administración', // Añadimos el título
};

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitles[location.pathname] || 'AgroRiego';
  }, [location.pathname]);

  return null;
}

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <NavBar />
      <div className="flex-1 flex flex-col min-w-0"> 
        <TopBar />
        <main className="flex-1 p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ColorBlindProvider>
      <PredioProvider>
        <Router> 
          <TitleManager />
          <Routes>
            {/* Ruta Pública */}
            <Route path="/login" element={<Login />} /> 

            {/* Rutas Privadas */}
            <Route element={<PrivateLayout />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Home />} /> 
                <Route path="areas" element={<AreasRiegoPage />} />
                <Route path="historial" element={<HistorialPage />} />
                <Route path="alertas" element={<AlertsPages />} />

                {/* ✨ RUTA PROTEGIDA POR ROL ✨ */}
                {/* Solo los usuarios que tengan "organizador" en su localStorage podrán entrar a /admin */}
                <Route element={<RoleProtectedLayout allowedRoles={['organizador', 'Organizador']} />}>
                  <Route path="admin" element={<AdminDashboardPage />} />
                </Route>
                
              </Route>
            </Route>

            {/* Catch-all: Si la ruta no existe, manda a login o home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PredioProvider>
    </ColorBlindProvider>
  );
}

export default App;