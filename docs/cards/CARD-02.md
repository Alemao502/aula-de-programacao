# CARD-02: Modelagem do Banco de Dados

| Campo | Valor |
|-------|-------|
| **Prioridade** | 1 - Crítica |
| **Módulo** | Fundação |
| **Histórias relacionadas** | — (infraestrutura) |
| **Dependências** | CARD-01 |
| **Estimativa** | 0.5 dia |

## Descrição

Definir e implementar o esquema do banco de dados com as tabelas necessárias para o sistema: usuários (autenticação) e clientes (PF/PJ). Incluir migrations ou script de criação.

## Tarefas Técnicas

- [ ] Escolher e instalar ORM/query builder (ex: Prisma, Sequelize ou Knex)
- [ ] Configurar conexão com banco de dados (PostgreSQL ou MySQL)
- [ ] Criar tabela `users` (autenticação do dono do sistema)
  - `id` (PK, UUID)
  - `email` (único, não nulo)
  - `password_hash` (não nulo)
  - `created_at`, `updated_at`
- [ ] Criar tabela `clients`
  - `id` (PK, UUID)
  - `type` (enum: PF, PJ)
  - `name` (não nulo) — nome completo (PF) ou razão social (PJ)
  - `document` (único, não nulo) — CPF ou CNPJ
  - `email` (opcional)
  - `phone` (opcional)
  - `responsible_name` (opcional, obrigatório se PJ)
  - `birthday` (não nulo) — data de aniversário (PF) ou do responsável (PJ)
  - `active` (boolean, default true)
  - `created_at`, `updated_at`
- [ ] Criar migration/script de seed para dados iniciais (usuário admin)
- [ ] Adicionar índices em `document` e `birthday`

## Critérios de Aceite

- [ ] Banco de dados é criado via migration/script sem erros
- [ ] Tabela `users` permite inserir e consultar usuários
- [ ] Tabela `clients` permite inserir PF e PJ com os campos corretos
- [ ] Constraint de unicidade funciona em `document` (rejeita CPF/CNPJ duplicado)
- [ ] Campo `active` tem valor padrão `true`
- [ ] Índices estão criados nos campos `document` e `birthday`
