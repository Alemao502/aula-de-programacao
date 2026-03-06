import api from './api';

export const clientService = {
  // Buscar todos os clientes
  async getClients(page = 1, limit = 10) {
    try {
      const response = await api.get('/clients', {
        params: { page, limit }
      });
      return {
        success: true,
        clients: response.data.clients,
        pagination: response.data.pagination
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao buscar clientes'
      };
    }
  },

  // Buscar cliente por ID
  async getClientById(id) {
    try {
      const response = await api.get(`/clients/${id}`);
      return {
        success: true,
        client: response.data.client
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao buscar cliente'
      };
    }
  },

  // Criar novo cliente
  async createClient(clientData) {
    try {
      const response = await api.post('/clients', clientData);
      return {
        success: true,
        client: response.data.client,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao criar cliente'
      };
    }
  },

  // Atualizar cliente
  async updateClient(id, clientData) {
    try {
      const response = await api.put(`/clients/${id}`, clientData);
      return {
        success: true,
        client: response.data.client,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao atualizar cliente'
      };
    }
  },

  // Desativar cliente
  async deactivateClient(id) {
    try {
      const response = await api.patch(`/clients/${id}/deactivate`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao desativar cliente'
      };
    }
  },

  // Reativar cliente
  async activateClient(id) {
    try {
      const response = await api.patch(`/clients/${id}/activate`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Erro ao ativar cliente'
      };
    }
  }
};