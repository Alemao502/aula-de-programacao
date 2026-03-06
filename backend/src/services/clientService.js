import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prisma = require('../config/database.cjs');
import { validateDocument } from '../config/validations.js';

export const createClient = async (clientData) => {
  try {
    const { type, name, document, email, phone, responsible_name, birthday } = clientData;

    // Validações básicas
    if (!type || !['PF', 'PJ'].includes(type)) {
      throw new Error('Tipo de cliente deve ser PF ou PJ');
    }

    if (!name || name.trim().length === 0) {
      throw new Error('Nome é obrigatório');
    }

    if (!document) {
      throw new Error('Documento é obrigatório');
    }

    // Validar formato do documento
    if (!validateDocument(document, type)) {
      const docType = type === 'PF' ? 'CPF' : 'CNPJ';
      throw new Error(`${docType} inválido`);
    }

    // Verificar unicidade do documento
    const existingClient = await prisma.client.findUnique({
      where: { document: document.replace(/\D/g, '') },
    });

    if (existingClient) {
      throw new Error('Documento já cadastrado');
    }

    // Validações específicas por tipo
    if (type === 'PJ' && (!responsible_name || responsible_name.trim().length === 0)) {
      throw new Error('Nome do responsável é obrigatório para pessoa jurídica');
    }

    // Validar data de aniversário
    const birthdayDate = new Date(birthday);
    const today = new Date();

    if (birthdayDate > today) {
      throw new Error('Data de aniversário não pode ser futura');
    }

    // Criar cliente
    const client = await prisma.client.create({
      data: {
        type,
        name: name.trim(),
        document: document.replace(/\D/g, ''), // Salvar apenas números
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        responsible_name: type === 'PJ' ? responsible_name.trim() : null,
        birthday: birthdayDate,
        active: true,
      },
    });

    return {
      success: true,
      client,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getClients = async (params = {}) => {
  try {
    const { page = 1, limit = 10, search = '', type = '', active } = params;
    const skip = (page - 1) * limit;

    // Construir filtros
    const where = {};

    // Filtro por status ativo/inativo
    if (active !== undefined) {
      where.active = active;
    }

    // Filtro por tipo
    if (type && ['PF', 'PJ'].includes(type)) {
      where.type = type;
    }

    // Filtro de busca
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          document: {
            contains: search.replace(/\D/g, '') // Remover caracteres não numéricos para busca
          }
        },
        {
          email: {
            contains: search,
            mode: 'insensitive'
          }
        },
        ...(type === 'PJ' ? [{
          responsible_name: {
            contains: search,
            mode: 'insensitive'
          }
        }] : [])
      ];
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        select: {
          id: true,
          type: true,
          name: true,
          document: true,
          email: true,
          phone: true,
          responsible_name: true,
          birthday: true,
          active: true,
          created_at: true,
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      prisma.client.count({ where }),
    ]);

    return {
      success: true,
      clients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getClientById = async (id) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return {
      success: true,
      client,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const { type, name, document, email, phone, responsible_name, birthday } = clientData;

    // Verificar se cliente existe
    const existingClient = await prisma.client.findUnique({
      where: { id },
    });

    if (!existingClient) {
      throw new Error('Cliente não encontrado');
    }

    // Validações básicas
    if (type && !['PF', 'PJ'].includes(type)) {
      throw new Error('Tipo de cliente deve ser PF ou PJ');
    }

    const finalType = type || existingClient.type;

    if (name && name.trim().length === 0) {
      throw new Error('Nome não pode ser vazio');
    }

    // Validar documento se fornecido
    if (document) {
      if (!validateDocument(document, finalType)) {
        const docType = finalType === 'PF' ? 'CPF' : 'CNPJ';
        throw new Error(`${docType} inválido`);
      }

      // Verificar unicidade (exceto para o próprio cliente)
      const cleanDocument = document.replace(/\D/g, '');
      const documentExists = await prisma.client.findFirst({
        where: {
          document: cleanDocument,
          id: { not: id },
        },
      });

      if (documentExists) {
        throw new Error('Documento já cadastrado para outro cliente');
      }
    }

    // Validações específicas por tipo
    if (finalType === 'PJ' && responsible_name && responsible_name.trim().length === 0) {
      throw new Error('Nome do responsável não pode ser vazio para pessoa jurídica');
    }

    // Validar data de aniversário se fornecida
    let birthdayDate = existingClient.birthday;
    if (birthday) {
      birthdayDate = new Date(birthday);
      const today = new Date();

      if (birthdayDate > today) {
        throw new Error('Data de aniversário não pode ser futura');
      }
    }

    // Atualizar cliente
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        type: type || existingClient.type,
        name: name ? name.trim() : existingClient.name,
        document: document ? document.replace(/\D/g, '') : existingClient.document,
        email: email !== undefined ? (email?.trim() || null) : existingClient.email,
        phone: phone !== undefined ? (phone?.trim() || null) : existingClient.phone,
        responsible_name: finalType === 'PJ' ? (responsible_name ? responsible_name.trim() : existingClient.responsible_name) : null,
        birthday: birthdayDate,
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      client: updatedClient,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deactivateClient = async (id) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    if (!client.active) {
      throw new Error('Cliente já está inativo');
    }

    await prisma.client.update({
      where: { id },
      data: {
        active: false,
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: 'Cliente desativado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const activateClient = async (id) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    if (client.active) {
      throw new Error('Cliente já está ativo');
    }

    await prisma.client.update({
      where: { id },
      data: {
        active: true,
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: 'Cliente ativado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};