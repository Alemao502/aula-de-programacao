import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clientService } from '../services/clientService';

const ClientForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    type: 'PF',
    name: '',
    document: '',
    email: '',
    phone: '',
    responsible_name: '',
    birthday: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Máscaras para os campos
  const formatCPF = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const formatCNPJ = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
      .slice(0, 18);
  };

  const formatPhone = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
      .slice(0, 15);
  };

  // Validações
  const validateCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return false;

    if (/^(\d)\1+$/.test(cleanCPF)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
  };

  const validateCNPJ = (cnpj) => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length !== 14) return false;

    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;
    if (remainder !== parseInt(cleanCNPJ.charAt(12))) return false;

    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    if (remainder < 2) remainder = 0;
    else remainder = 11 - remainder;
    if (remainder !== parseInt(cleanCNPJ.charAt(13))) return false;

    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validações comuns
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.birthday) {
      newErrors.birthday = 'Data de aniversário é obrigatória';
    } else {
      const birthdayDate = new Date(formData.birthday);
      const today = new Date();
      if (birthdayDate > today) {
        newErrors.birthday = 'Data de aniversário não pode ser futura';
      }
    }

    // Validações específicas por tipo
    if (formData.type === 'PF') {
      if (!formData.document) {
        newErrors.document = 'CPF é obrigatório';
      } else if (!validateCPF(formData.document)) {
        newErrors.document = 'CPF inválido';
      }
    } else {
      if (!formData.document) {
        newErrors.document = 'CNPJ é obrigatório';
      } else if (!validateCNPJ(formData.document)) {
        newErrors.document = 'CNPJ inválido';
      }

      if (!formData.responsible_name || formData.responsible_name.trim().length < 3) {
        newErrors.responsible_name = 'Nome do responsável deve ter pelo menos 3 caracteres';
      }
    }

    // Validação de email (opcional)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Carregar dados do cliente para edição
  useEffect(() => {
    if (isEdit && id) {
      const loadClient = async () => {
        setLoading(true);
        const result = await clientService.getClientById(id);
        if (result.success) {
          const client = result.client;
          setFormData({
            type: client.type,
            name: client.name,
            document: client.type === 'PF' ? formatCPF(client.document) : formatCNPJ(client.document),
            email: client.email || '',
            phone: client.phone || '',
            responsible_name: client.responsible_name || '',
            birthday: new Date(client.birthday).toISOString().split('T')[0],
          });
        } else {
          setErrors({ general: result.error });
        }
        setLoading(false);
      };
      loadClient();
    }
  }, [isEdit, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Aplicar máscaras
    let formattedValue = value;
    if (name === 'document') {
      formattedValue = formData.type === 'PF' ? formatCPF(value) : formatCNPJ(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      document: '', // Limpar documento ao trocar tipo
      responsible_name: type === 'PF' ? '' : prev.responsible_name,
    }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setErrors({});

    // Preparar dados para envio
    const submitData = {
      ...formData,
      document: formData.document.replace(/\D/g, ''), // Remover formatação
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      phone: formData.phone.replace(/\D/g, '') || undefined,
      responsible_name: formData.type === 'PJ' ? formData.responsible_name.trim() : undefined,
    };

    const result = isEdit
      ? await clientService.updateClient(id, submitData)
      : await clientService.createClient(submitData);

    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => {
        navigate('/clients');
      }, 2000);
    } else {
      setErrors({ general: result.error });
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {isEdit ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {errors.general && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{errors.general}</div>
          </div>
        )}

        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{successMessage}</div>
          </div>
        )}

        {/* Tipo de Cliente */}
        <div>
          <label className="text-sm font-medium text-gray-700">Tipo de Cliente</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="PF"
                checked={formData.type === 'PF'}
                onChange={() => !isEdit && handleTypeChange('PF')}
                disabled={isEdit}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Pessoa Física</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="PJ"
                checked={formData.type === 'PJ'}
                onChange={() => !isEdit && handleTypeChange('PJ')}
                disabled={isEdit}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Pessoa Jurídica</span>
            </label>
          </div>
        </div>

        {/* Campos comuns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {formData.type === 'PF' ? 'Nome Completo' : 'Razão Social'} *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.name ? 'border-red-300' : ''
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
              {formData.type === 'PF' ? 'CPF' : 'CNPJ'} *
            </label>
            <input
              type="text"
              name="document"
              id="document"
              value={formData.document}
              onChange={handleInputChange}
              placeholder={formData.type === 'PF' ? '000.000.000-00' : '00.000.000/0000-00'}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.document ? 'border-red-300' : ''
              }`}
            />
            {errors.document && <p className="mt-1 text-sm text-red-600">{errors.document}</p>}
          </div>

          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
              Data de Aniversário {formData.type === 'PJ' && 'do Responsável'} *
            </label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.birthday ? 'border-red-300' : ''
              }`}
            />
            {errors.birthday && <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.email ? 'border-red-300' : ''
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(00) 00000-0000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Campo específico para PJ */}
          {formData.type === 'PJ' && (
            <div className="sm:col-span-2">
              <label htmlFor="responsible_name" className="block text-sm font-medium text-gray-700">
                Nome do Responsável *
              </label>
              <input
                type="text"
                name="responsible_name"
                id="responsible_name"
                value={formData.responsible_name}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                  errors.responsible_name ? 'border-red-300' : ''
                }`}
              />
              {errors.responsible_name && <p className="mt-1 text-sm text-red-600">{errors.responsible_name}</p>}
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/clients')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {saving ? (isEdit ? 'Salvando...' : 'Criando...') : (isEdit ? 'Salvar' : 'Criar Cliente')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;