import express from 'express';
import {
  createClientController,
  getClientsController,
  getClientByIdController,
  updateClientController,
  deactivateClientController,
  activateClientController,
} from '../controllers/clientController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas as rotas de clientes são protegidas
router.use(authMiddleware);

// POST /api/clients
router.post('/', createClientController);

// GET /api/clients
router.get('/', getClientsController);

// GET /api/clients/:id
router.get('/:id', getClientByIdController);

// PUT /api/clients/:id
router.put('/:id', updateClientController);

// PATCH /api/clients/:id/deactivate
router.patch('/:id/deactivate', deactivateClientController);

// PATCH /api/clients/:id/activate
router.patch('/:id/activate', activateClientController);

export default router;