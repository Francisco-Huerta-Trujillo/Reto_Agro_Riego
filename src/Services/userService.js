import api from './axiosConfig'

export const userService = {
    login: async (credenciales) => {
        try {
            const response = await api.post(`/usuarios/login`, credenciales);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    getAll: async () => {
        try {
            const response = await api.get(`/usuarios/`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    getById: async (id) => {
        try {
            const response = await api.get(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    create: async (user) => {
        try {
            const response = await api.post(`/usuarios/`, user);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    delete: async (id) => {
        try {
            const response = await api.delete(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getAreas: async (id) => {
        try {
            const response = await api.get(`/usuarios/${id}/areas`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}