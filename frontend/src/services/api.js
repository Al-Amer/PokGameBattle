const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const api = {
  testConnection: async () => {
    try {
      const response = await fetch(`${API_URL}/test`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: error.message };
    }
  },

  healthCheck: async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default api;
