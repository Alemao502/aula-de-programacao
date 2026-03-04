# CARD-05: API CRUD de Clientes

| Campo | Valor |
|-------|-------|
| **Prioridade** | 3 - Alta |
| **Módulo** | Cadastro de Clientes |
| **Histórias relacionadas** | HU-04, HU-05, HU-06, HU-07, HU-08, HU-09 |
| **Dependências** | CARD-02, CARD-03 |
| **Estimativa** | 1 dia |

## Descrição

Implementar os endpoints de CRUD de clientes no backend, suportando tanto pessoa física (PF) quanto pessoa jurídica (PJ), com validação de campos, unicidade de documento (CPF/CNPJ) e soft delete (inativação).

## Tarefas Técnicas

- [ ] Criar endpoint `POST /api/clients`
  - Receber dados do cliente (PF ou PJ)
  - Validar campos obrigatórios conforme tipo (PF: nome, CPF, aniversário | PJ: razão social, CNPJ, responsável, aniversário)
  - Validar formato e dígitos verificadores do CPF/CNPJ
  - Validar unicidade do documento no banco
  - Validar que data de aniversário não é futura
  - Retornar cliente criado (status 201)
- [ ] Criar endpoint `GET /api/clients`
  - Listar clientes ativos (paginado)
  - Retornar dados resumidos para listagem
- [ ] Criar endpoint `GET /api/clients/:id`
  - Retornar dados completos de um cliente
  - Retornar 404 se não encontrado
- [ ] Criar endpoint `PUT /api/clients/:id`
  - Atualizar dados do cliente
  - Revalidar campos obrigatórios e unicidade de documento
  - Retornar cliente atualizado
- [ ] Criar endpoint `PATCH /api/clients/:id/deactivate`
  - Setar campo `active` para `false`
  - Retornar status 200
- [ ] Criar endpoint `PATCH /api/clients/:id/activate`
  - Setar campo `active` para `true`
  - Retornar status 200
- [ ] Todas as rotas protegidas pelo `authMiddleware`
- [ ] Criar validações reutilizáveis para CPF e CNPJ

## Critérios de Aceite

- [ ] Cadastro de PF com todos os campos obrigatórios retorna 201
- [ ] Cadastro de PJ com todos os campos obrigatórios retorna 201
- [ ] Cadastro sem campos obrigatórios retorna 400 com mensagem clara
- [ ] CPF/CNPJ inválido (dígitos verificadores) retorna 400
- [ ] CPF/CNPJ duplicado retorna 409 (conflito)
- [ ] Listagem retorna apenas clientes ativos por padrão
- [ ] Detalhe retorna todos os dados do cliente
- [ ] Edição atualiza os campos corretamente
- [ ] Inativação muda `active` para `false` sem excluir o registro
- [ ] Reativação muda `active` para `true`
- [ ] Todas as rotas retornam 401 sem token válido
