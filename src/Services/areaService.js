import api from './axiosConfig'

export const areaService = {
    getAll: async () => {
        try {
            const response = await api.get(`/areas/`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/areas/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getSensors: async (id) => {
        try {
            const response = await api.get(`/areas/${id}/sensors`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getAlerts: async (id) => {
        try {
            const response = await api.get(`/areas/${id}/alerts`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const response = await api.post(`/areas/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    update: async (id, data) => {
        try {
            const response = await api.put(`/areas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    delete: async (id) => {
        try {
            const response = await api.delete(`/areas/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};