import api from './axiosConfig'

export const predioService = {
    getAll: async () => {
        try{
            const response = await api.get('/predios/');
            return response.data;
        } catch (error){
            console.error("Error al obtener predios: ", error);
            throw error;
        }
    },

    getById: async (id) => {
        const response = await api.get('/predios/${id}');
        return response.data;
    },

    getAreas: async (id) => {
        const response = await api.get('/predios/${id}/areas');
        return response.data;
    }
}