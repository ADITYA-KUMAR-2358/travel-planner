import api from './api';

export const destinationService = {
  getDestinations: async (params = {}) => {
    const response = await api.get('/destinations', { params });
    return response.data;
  },

  getDestinationById: async (id) => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  },

  getFeaturedDestinations: async () => {
    const response = await api.get('/destinations/featured');
    return response.data;
  },

  createDestination: async (destinationData) => {
    const response = await api.post('/destinations', destinationData);
    return response.data;
  },

  updateDestination: async (id, destinationData) => {
    const response = await api.put(`/destinations/${id}`, destinationData);
    return response.data;
  },

  deleteDestination: async (id) => {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  }
};
