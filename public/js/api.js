const BASE_URL = 'http://localhost:3001/api';

// Função base para todas as requisições
async function request(method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_URL + path, options);
  const data = await response.json();

  if (!response.ok) {
    // NestJS pode retornar message como string ou array
    const mensagem = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message;
    throw new Error(mensagem || 'Erro inesperado');
  }

  return data;
}

// ─── Filmes ────────────────────────────────────────────
const filmesApi = {
  listar(titulo, genero) {
    const params = new URLSearchParams();
    if (titulo) params.set('titulo', titulo);
    if (genero) params.set('genero', genero);
    const query = params.toString() ? '?' + params.toString() : '';
    return request('GET', `/filmes${query}`);
  },

  buscar(id) {
    return request('GET', `/filmes/${id}`);
  },

  criar(dados) {
    return request('POST', '/filmes', dados);
  },

  atualizar(id, dados) {
    return request('PUT', `/filmes/${id}`, dados);
  },

  remover(id) {
    return request('DELETE', `/filmes/${id}`);
  },

  listarAvaliacoes(id) {
    return request('GET', `/filmes/${id}/avaliacoes`);
  },

  avaliar(id, dados) {
    return request('POST', `/filmes/${id}/avaliacoes`, dados);
  },
};

// ─── Usuários ──────────────────────────────────────────
const usuariosApi = {
  listar() {
    return request('GET', '/users');
  },

  buscar(id) {
    return request('GET', `/users/${id}`);
  },

  criar(dados) {
    return request('POST', '/users', dados);
  },

  atualizar(id, dados) {
    return request('PUT', `/users/${id}`, dados);
  },

  remover(id) {
    return request('DELETE', `/users/${id}`);
  },
};

// ─── Utilitários de UI ─────────────────────────────────

function mostrarMensagem(elementoId, texto, tipo) {
  const el = document.getElementById(elementoId);
  if (!el) return;
  el.textContent = texto;
  el.className = 'msg ' + tipo;
}

function ocultarMensagem(elementoId) {
  const el = document.getElementById(elementoId);
  if (!el) return;
  el.className = 'msg';
}

function getParam(nome) {
  return new URLSearchParams(window.location.search).get(nome);
}

function formatarData(dataStr) {
  return new Date(dataStr).toLocaleDateString('pt-BR');
}
