import api from './api';

export const medicionesService = {
  getAll: async () => {
    try {
      const response = await api.get('/mediciones/');
      return response.data;
    } catch (error) {
      console.error("Error al obtener todas las mediciones:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/mediciones/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la medición con ID ${id}:`, error);
      throw error;
    }
  },

  getByAreaId: async (areaId) => {
    try {
      const response = await api.get(`/mediciones/area/${areaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener las mediciones para el área ${areaId}:`, error);
      throw error;
    }
  }
};