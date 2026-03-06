import { useState, useEffect } from 'react';
import { clientService } from '../services/clientService';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchClients = async (page = 1, limit = 10) => {
    setLoading(true);
    setError('');

    const result = await clientService.getClients(page, limit);

    if (result.success) {
      setClients(result.clients);
      setPagination(result.pagination);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const createClient = async (clientData) => {
    setLoading(true);
    setError('');

    const result = await clientService.createClient(clientData);

    if (result.success) {
      // Recarregar a lista após criar
      await fetchClients(pagination.page, pagination.limit);
      return { success: true, message: result.message };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const updateClient = async (id, clientData) => {
    setLoading(true);
    setError('');

    const result = await clientService.updateClient(id, clientData);

    if (result.success) {
      // Recarregar a lista após atualizar
      await fetchClients(pagination.page, pagination.limit);
      return { success: true, message: result.message };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const deactivateClient = async (id) => {
    const result = await clientService.deactivateClient(id);

    if (result.success) {
      // Remover da lista local
      setClients(clients.filter(client => client.id !== id));
      return { success: true, message: result.message };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const activateClient = async (id) => {
    const result = await clientService.activateClient(id);

    if (result.success) {
      // Recarregar a lista para incluir o cliente reativado
      await fetchClients(pagination.page, pagination.limit);
      return { success: true, message: result.message };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    pagination,
    fetchClients,
    createClient,
    updateClient,
    deactivateClient,
    activateClient
  };
};