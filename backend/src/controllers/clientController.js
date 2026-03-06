import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deactivateClient,
  activateClient,
} from '../services/clientService.js';

export const createClientController = async (req, res) => {
  try {
    const clientData = req.body;

    const result = await createClient(clientData);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({
      message: 'Cliente criado com sucesso',
      client: result.client,
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getClientsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const type = req.query.type || '';
    const active = req.query.active !== undefined ? req.query.active === 'true' : undefined;

    // Validar parâmetros
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        error: 'Parâmetros de paginação inválidos'
      });
    }

    const result = await getClients({ page, limit, search, type, active });

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      clients: result.clients,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getClientByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getClientById(id);

    if (!result.success) {
      const statusCode = result.error === 'Cliente não encontrado' ? 404 : 500;
      return res.status(statusCode).json({ error: result.error });
    }

    res.json({ client: result.client });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateClientController = async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;

    const result = await updateClient(id, clientData);

    if (!result.success) {
      const statusCode = result.error.includes('não encontrado') ? 404 : 400;
      return res.status(statusCode).json({ error: result.error });
    }

    res.json({
      message: 'Cliente atualizado com sucesso',
      client: result.client,
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deactivateClientController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deactivateClient(id);

    if (!result.success) {
      const statusCode = result.error.includes('não encontrado') ? 404 : 400;
      return res.status(statusCode).json({ error: result.error });
    }

    res.json({ message: result.message });
  } catch (error) {
    console.error('Erro ao desativar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const activateClientController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await activateClient(id);

    if (!result.success) {
      const statusCode = result.error.includes('não encontrado') ? 404 : 400;
      return res.status(statusCode).json({ error: result.error });
    }

    res.json({ message: result.message });
  } catch (error) {
    console.error('Erro ao ativar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};