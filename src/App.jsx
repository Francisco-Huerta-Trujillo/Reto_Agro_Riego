import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Screens/Home";
import {AreasRiegoPage} from "./Screens/AreasRiego";
import {HistorialPage} from "./Screens/HistorialPages";
import NavBar from "./Components/Layout/NavBar";
import TopBar from "./Components/Layout/TopBar";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen w-full bg-slate-50">
        {/* Sidebar: Asegúrate que NavBar.css tenga un width fijo (ej. 260px) */}
        <NavBar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0"> 
          <TopBar />
          
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/areas" element={<AreasRiegoPage />} />
              <Route path="/historial" element={<HistorialPage />} />
              {/* Agregamos estas para que los links del NavBar no rompan la app */}
              <Route path="/alertas" element={<div className="p-10">Alertas en desarrollo...</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;