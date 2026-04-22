import api from './axiosConfig'

export const areaService = {
    getAll: async () => {
        try{
            const response = await api.get('/areas/');
            return response.data;
        } catch (error){
            console.error("Error al obtener areas: ", error);
            throw error;
        }
    },

    getById: async (id) => {
        const response = await api.get('/areas/${id}');
        return response.data;
    },

    getSensors: async (id) => {
        const response = await api.get('/areas/${id}/sensors');
        return response.data;
    },

    getAlerts: async (id) => {
    const response = await api.get(`/areas/${id}/alertas`);
    return response.data;
  },

  // No se si estos metodos si van aqui: Crear, actualizar y eliminar
  create: async (data) => {
    const response = await api.post('/areas', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/areas/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/areas/${id}`);
    return response.data;
  }
};