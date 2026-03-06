import { useState, useEffect, useCallback } from 'react';
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

  const fetchClients = useCallback(async (page = 1, search = '', type = '', showInactive = false) => {
    setLoading(true);
    setError('');

    try {
      const params = {
        page,
        limit: pagination.limit,
        search: search || undefined,
        type: type || undefined,
        active: showInactive ? undefined : true
      };

      const result = await clientService.getClients(params);

      if (result.success) {
        setClients(result.clients);
        setPagination(result.pagination);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error('Erro ao buscar clientes:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

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
      // Atualizar status local
      setClients(clients.map(client =>
        client.id === id ? { ...client, active: false } : client
      ));
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

  const getClientById = async (id) => {
    setLoading(true);
    setError('');

    try {
      const result = await clientService.getClientById(id);
      if (result.success) {
        return result.client;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError('Erro ao buscar cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    loading,
    error,
    pagination,
    fetchClients,
    createClient,
    updateClient,
    deactivateClient,
    activateClient,
    getClientById
  };
};