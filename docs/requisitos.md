# Documento de Requisitos - Sistema de Cadastro de Clientes

> **Status:** Em definição
> **Data:** 03/03/2026
> **Versão:** 1.0

---

## 1. Visão Geral do Projeto

Web app para cadastro de clientes de uma empresa de contabilidade, com foco principal em gerenciar dados de clientes e lembrar datas de aniversário.

| Item | Definição |
|------|-----------|
| Usuário | Proprietário da contabilidade (uso individual) |
| Tipo de clientes | Pessoa Física (PF) e Pessoa Jurídica (PJ) |
| Stack | React (frontend) + Node.js (backend) |
| Design | Responsivo (desktop, tablet e celular) |
| Prazo | Urgente (1-2 semanas) |

---

## 2. Histórias de Usuário

### Módulo: Autenticação

| ID | História |
|----|----------|
| HU-01 | Como usuário, quero fazer login com email e senha para acessar o sistema de forma segura. |
| HU-02 | Como usuário, quero recuperar minha senha por email caso a esqueça. |
| HU-03 | Como usuário, quero permanecer logado para não precisar inserir credenciais a cada acesso. |

### Módulo: Cadastro de Clientes

| ID | História |
|----|----------|
| HU-04 | Como usuário, quero cadastrar um cliente pessoa física informando: nome, telefone, email, CPF e data de aniversário. |
| HU-05 | Como usuário, quero cadastrar um cliente pessoa jurídica informando: razão social, telefone, email, CNPJ, nome do responsável/sócio e data de aniversário do responsável. |
| HU-06 | Como usuário, quero editar os dados de um cliente já cadastrado. |
| HU-07 | Como usuário, quero inativar um cliente para que ele não apareça nas listagens, mas seus dados sejam mantidos no sistema (soft delete). |
| HU-08 | Como usuário, quero reativar um cliente que foi inativado anteriormente. |
| HU-09 | Como usuário, quero visualizar os detalhes completos de um cliente. |

### Módulo: Busca e Filtros

| ID | História |
|----|----------|
| HU-10 | Como usuário, quero buscar clientes por nome ou razão social para encontrá-los rapidamente. |
| HU-11 | Como usuário, quero buscar clientes por CPF ou CNPJ. |
| HU-12 | Como usuário, quero filtrar clientes por tipo (pessoa física ou jurídica). |
| HU-13 | Como usuário, quero filtrar para exibir ou ocultar clientes inativos. |

### Módulo: Importação

| ID | História |
|----|----------|
| HU-14 | Como usuário, quero importar clientes a partir de uma planilha (CSV/Excel) para não precisar cadastrar um por um. |

### Módulo: Notificações de Aniversário

| ID | História |
|----|----------|
| HU-15 | Como usuário, quero ver no dashboard os aniversariantes do dia ao fazer login no sistema. |
| HU-16 | Como usuário, quero receber um email diário listando os clientes que fazem aniversário naquele dia. |

### Módulo: Dashboard

| ID | História |
|----|----------|
| HU-17 | Como usuário, quero ver um painel com o total de clientes ativos cadastrados. |
| HU-18 | Como usuário, quero ver no dashboard os aniversariantes do dia e da semana. |
| HU-19 | Como usuário, quero ver métricas resumidas (total PF, total PJ, total ativos/inativos). |

### Módulo: Relatórios

| ID | História |
|----|----------|
| HU-20 | Como usuário, quero gerar um relatório com os aniversariantes de um mês específico para me planejar antecipadamente. |

---

## 3. Requisitos Não Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | O sistema deve ser responsivo, funcionando em desktop, tablet e celular. |
| RNF-02 | O frontend deve ser desenvolvido em React e o backend em Node.js. |
| RNF-03 | As senhas devem ser armazenadas com hash seguro (bcrypt ou similar). |
| RNF-04 | O sistema deve ter tempo de resposta inferior a 2 segundos para operações comuns. |
| RNF-05 | A importação de planilha deve suportar formatos CSV e XLSX. |
| RNF-06 | O envio de email de notificação de aniversário deve ser automatizado via job diário. |

---

## 4. Regras de Negócio

| ID | Regra |
|----|-------|
| RN-01 | CPF e CNPJ devem ser únicos no sistema — não é permitido cadastrar duplicatas. |
| RN-02 | A data de aniversário é obrigatória para todos os clientes. |
| RN-03 | Clientes inativos não aparecem na listagem padrão nem nos relatórios de aniversário. |
| RN-04 | O email de notificação de aniversário é enviado apenas para o dono do sistema, não para o cliente. |
| RN-05 | Para pessoa jurídica, o aniversário registrado é do responsável/sócio, não da data de fundação da empresa. |
| RN-06 | O tipo de cliente (PF ou PJ) determina quais campos são obrigatórios no cadastro. |

---

## 5. Campos do Cadastro

### Pessoa Física

| Campo | Obrigatório | Tipo | Validação |
|-------|:-----------:|------|-----------|
| Nome completo | Sim | Texto | Mínimo 3 caracteres |
| CPF | Sim | Texto formatado | Validação de CPF (11 dígitos + dígitos verificadores) |
| Email | Não | Email | Formato de email válido |
| Telefone | Não | Texto formatado | Formato (XX) XXXXX-XXXX |
| Data de aniversário | Sim | Data | Data válida, não futura |

### Pessoa Jurídica

| Campo | Obrigatório | Tipo | Validação |
|-------|:-----------:|------|-----------|
| Razão social | Sim | Texto | Mínimo 3 caracteres |
| CNPJ | Sim | Texto formatado | Validação de CNPJ (14 dígitos + dígitos verificadores) |
| Email | Não | Email | Formato de email válido |
| Telefone | Não | Texto formatado | Formato (XX) XXXXX-XXXX |
| Nome do responsável | Sim | Texto | Mínimo 3 caracteres |
| Data de aniversário (responsável) | Sim | Data | Data válida, não futura |
