import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useClients } from '../hooks/useClients';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClientById, loading, error, deactivateClient, activateClient } = useClients();
  const [client, setClient] = useState(null);
  const [deactivatingId, setDeactivatingId] = useState(null);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const clientData = await getClientById(id);
        setClient(clientData);
      } catch (err) {
        console.error('Erro ao carregar cliente:', err);
      }
    };

    if (id) {
      loadClient();
    }
  }, [id, getClientById]);

  const handleDeactivate = async () => {
    if (window.confirm('Tem certeza que deseja desativar este cliente?')) {
      setDeactivatingId(client.id);
      await deactivateClient(client.id);
      setClient(prev => ({ ...prev, active: false }));
      setDeactivatingId(null);
    }
  };

  const handleActivate = async () => {
    if (window.confirm('Tem certeza que deseja reativar este cliente?')) {
      setDeactivatingId(client.id);
      await activateClient(client.id);
      setClient(prev => ({ ...prev, active: true }));
      setDeactivatingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDocument = (document, type) => {
    if (type === 'PF') {
      // CPF: XXX.XXX.XXX-XX
      return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      // CNPJ: XX.XXX.XXX/XXXX-XX
      return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const getNextBirthday = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = nextBirthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { date: nextBirthday, days: diffDays };
  };

  if (loading && !client) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
        <div className="mt-4">
          <Link
            to="/clients"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Voltar para lista
          </Link>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Cliente não encontrado</h3>
          <div className="mt-6">
            <Link
              to="/clients"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Voltar para lista
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const age = calculateAge(client.birthday);
  const nextBirthday = getNextBirthday(client.birthday);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {client.name}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                client.type === 'PF'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {client.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                client.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {client.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <Link
              to={`/clients/${client.id}/edit`}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Editar
            </Link>
          </span>
          <span className="ml-3 hidden sm:block">
            {client.active ? (
              <button
                onClick={handleDeactivate}
                disabled={deactivatingId === client.id}
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
              >
                {deactivatingId === client.id ? 'Desativando...' : 'Desativar'}
              </button>
            ) : (
              <button
                onClick={handleActivate}
                disabled={deactivatingId === client.id}
                className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
              >
                {deactivatingId === client.id ? 'Ativando...' : 'Reativar'}
              </button>
            )}
          </span>
          <span className="sm:ml-3">
            <Link
              to="/clients"
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Voltar
            </Link>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Informações Principais */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Informações Principais
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Nome</dt>
                <dd className="mt-1 text-sm text-gray-900">{client.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  {client.type === 'PF' ? 'CPF' : 'CNPJ'}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDocument(client.document, client.type)}
                </dd>
              </div>
              {client.type === 'PJ' && client.responsible_name && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Responsável</dt>
                  <dd className="mt-1 text-sm text-gray-900">{client.responsible_name}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Data de Nascimento</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(client.birthday)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Idade</dt>
                <dd className="mt-1 text-sm text-gray-900">{age} anos</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Próximo Aniversário</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(nextBirthday.date.toISOString().split('T')[0])}
                  {nextBirthday.days === 0 ? (
                    <span className="ml-2 text-green-600 font-medium">🎉 Hoje!</span>
                  ) : nextBirthday.days === 1 ? (
                    <span className="ml-2 text-blue-600 font-medium">Amanhã</span>
                  ) : (
                    <span className="ml-2 text-gray-500">({nextBirthday.days} dias)</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Informações de Contato
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {client.email ? (
                    <a
                      href={`mailto:${client.email}`}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      {client.email}
                    </a>
                  ) : (
                    <span className="text-gray-400">Não informado</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {client.phone ? (
                    <a
                      href={`tel:${client.phone}`}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      {client.phone}
                    </a>
                  ) : (
                    <span className="text-gray-400">Não informado</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Informações do Sistema */}
      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Informações do Sistema
          </h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  client.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {client.active ? 'Ativo' : 'Inativo'}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Data de Cadastro</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(client.created_at)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="mt-6 sm:hidden">
        <div className="flex space-x-3">
          <Link
            to={`/clients/${client.id}/edit`}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-gray-700"
          >
            Editar
          </Link>
          {client.active ? (
            <button
              onClick={handleDeactivate}
              disabled={deactivatingId === client.id}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {deactivatingId === client.id ? '...' : 'Desativar'}
            </button>
          ) : (
            <button
              onClick={handleActivate}
              disabled={deactivatingId === client.id}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {deactivatingId === client.id ? '...' : 'Reativar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;