import React, { createContext, useContext, useEffect, useState } from 'react';
import { predioService } from '../Services/predioService';

const PredioContext = createContext();

const getPredioId = (predio) => {
  if (!predio) return '';
  return String(predio.id_predio || predio.id || predio._id || '');
};

export function PredioProvider({ children }) {
  const [predios, setPredios] = useState([]);
  const [selectedPredioId, setSelectedPredioId] = useState(() => {
    const storedId = localStorage.getItem('selectedPredioId');
    return storedId && storedId !== 'undefined' ? storedId : '';
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
          const initialId = storedId && data.some((p) => getPredioId(p) === String(storedId))
            ? String(storedId)
            : data.length > 0
              ? getPredioId(data[0])
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
    const normalizedId = String(id || '');
    setSelectedPredioId(normalizedId);
    localStorage.setItem('selectedPredioId', normalizedId);
  };

  const selectedPredio = predios.find((p) => getPredioId(p) === String(selectedPredioId)) || null;

  return (
    <PredioContext.Provider value={{ predios, selectedPredio, selectedPredioId, setPredio, loadingPredios, predioError, getPredioId }}>
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
