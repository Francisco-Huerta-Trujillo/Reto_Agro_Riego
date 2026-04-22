import api from './axiosConfig'

export const alertService = {
    getAll: async () => {
        try {
            const response = await api.get(`/alertas/`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/alertas/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getAreaAlerts: async (id) => {
        try {
            const response = await api.get(`/alertas/area/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const response = await api.post(`/alertas/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
  
    update: async (id, data) => {
        try {
            const response = await api.put(`/alertas/${id}/read`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
  
    delete: async (id) => {
        try {
            const response = await api.delete(`/alertas/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}