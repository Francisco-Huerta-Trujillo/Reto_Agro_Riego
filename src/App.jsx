import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//This is how we rename components for simplicity
import {Home as Home} from './Screens/Home.jsx';
import './App.css';
import NavBar from './Components/Layout/NavBar';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <NavBar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
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
