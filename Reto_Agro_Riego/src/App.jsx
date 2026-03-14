import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//This is how we rename components for simplicity
import {Home as Home} from './Screens/Home';
import NavBar from './Components/NavBar';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
    <NavBar/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
