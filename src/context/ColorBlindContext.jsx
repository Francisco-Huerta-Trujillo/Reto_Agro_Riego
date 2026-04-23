import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const ColorBlindContext = createContext();

// Proveedor del contexto
export function ColorBlindProvider({ children }) {
  const [isColorBlindMode, setIsColorBlindMode] = useState(() => {
    // Recuperar del localStorage al iniciar
    return localStorage.getItem("colorBlind") === "true";
  });

  // Efecto para sincronizar con el DOM y localStorage
  useEffect(() => {
    if (isColorBlindMode) {
      document.body.classList.add("color-blind-mode");
    } else {
      document.body.classList.remove("color-blind-mode");
    }
    localStorage.setItem("colorBlind", isColorBlindMode);
  }, [isColorBlindMode]);

  const toggleColorBlindMode = () => {
    setIsColorBlindMode(prev => !prev);
  };

  return (
    <ColorBlindContext.Provider value={{ isColorBlindMode, toggleColorBlindMode }}>
      {children}
    </ColorBlindContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useColorBlind() {
  const context = useContext(ColorBlindContext);
  if (!context) {
    throw new Error('useColorBlind debe ser usado dentro de ColorBlindProvider');
  }
  return context;
}
