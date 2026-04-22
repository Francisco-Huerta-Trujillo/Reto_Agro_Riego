import api from './api';

export const historialService = {
  getAll: async () => {
    try {
      const response = await api.get('/historial/'); 
      return response.data;
    } catch (error) {
      console.error("Error al obtener el historial completo:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/historial/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el registro de historial con ID ${id}:`, error);
      throw error;
    }
  }
};