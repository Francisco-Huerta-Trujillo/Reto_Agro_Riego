import React, { createContext, useContext, useEffect, useState } from 'react';
import { predioService } from '../Services/predioService';

const PredioContext = createContext();

export function PredioProvider({ children }) {
  const [predios, setPredios] = useState([]);
  const [selectedPredioId, setSelectedPredioId] = useState(() => {
    return localStorage.getItem('selectedPredioId') || '';
  });
  const [loadingPredios, setLoadingPredios] = useState(true);
  const [predioError, setPredioError] = useState(null);

  useEffect(() => {
    const fetchPredios = async () => {
      setLoadingPredios(true);
      try {
        const data = await predioService.getAll();
        if (Array.isArray(data)) {
          setPredios(data);
          setPredioError(null);

          const storedId = localStorage.getItem('selectedPredioId');
          const initialId = storedId && data.some((p) => String(p.id) === String(storedId))
            ? storedId
            : data.length > 0
              ? String(data[0].id)
              : '';

          setSelectedPredioId(initialId);
          if (initialId) {
            localStorage.setItem('selectedPredioId', initialId);
          }
        } else {
          throw new Error('Respuesta de predios inválida');
        }
      } catch (error) {
        console.error('Error cargando predios:', error);
        setPredioError(error.message || 'No se pudieron cargar los predios');
      } finally {
        setLoadingPredios(false);
      }
    };

    fetchPredios();
  }, []);

  const setPredio = (id) => {
    setSelectedPredioId(id);
    localStorage.setItem('selectedPredioId', id);
  };

  const selectedPredio = predios.find((p) => String(p.id) === String(selectedPredioId)) || null;

  return (
    <PredioContext.Provider value={{ predios, selectedPredio, selectedPredioId, setPredio, loadingPredios, predioError }}>
      {children}
    </PredioContext.Provider>
  );
}

export function usePredio() {
  const context = useContext(PredioContext);
  if (!context) {
    throw new Error('usePredio debe usarse dentro de PredioProvider');
  }
  return context;
}
