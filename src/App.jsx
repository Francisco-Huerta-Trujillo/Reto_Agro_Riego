import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//This is how we rename components for simplicity
import Home from './Screens/Home';
import './App.css';
import NavBar from './Components/Layout/NavBar';
import TopBar from './Components/Layout/TopBar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <NavBar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <TopBar />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Aquí irán las otras rutas después */}
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
