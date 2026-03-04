# CARD-07: Tela de Listagem e Detalhes de Clientes

| Campo | Valor |
|-------|-------|
| **Prioridade** | 3 - Alta |
| **Módulo** | Cadastro de Clientes |
| **Histórias relacionadas** | HU-07, HU-08, HU-09 |
| **Dependências** | CARD-05, CARD-06 |
| **Estimativa** | 1 dia |

## Descrição

Criar a tela de listagem de clientes com tabela/cards, visualização de detalhes e ações de inativação/reativação. A listagem deve exibir os dados resumidos e permitir navegação para edição e detalhes.

## Tarefas Técnicas

### Listagem
- [ ] Criar página `/clients` com tabela de clientes
- [ ] Exibir colunas: nome/razão social, tipo (PF/PJ), documento (CPF/CNPJ), telefone, aniversário, status
- [ ] Implementar paginação
- [ ] Botão "Novo Cliente" que redireciona para `/clients/new`
- [ ] Ações por linha: Visualizar, Editar, Inativar/Reativar
- [ ] Indicação visual de clientes inativos (ex: linha esmaecida, badge)
- [ ] Layout responsivo: tabela no desktop, cards no mobile

### Detalhes
- [ ] Criar página ou modal `/clients/:id` com todos os dados do cliente
- [ ] Exibir todos os campos cadastrados de forma organizada
- [ ] Botões de ação: Editar, Inativar/Reativar
- [ ] Exibir badge de tipo (PF/PJ) e status (Ativo/Inativo)

### Inativação/Reativação
- [ ] Ao clicar em "Inativar", exibir modal de confirmação
- [ ] Chamar endpoint de inativação e atualizar a listagem
- [ ] Ao clicar em "Reativar", chamar endpoint e atualizar a listagem
- [ ] Exibir feedback de sucesso (toast/notificação)

## Critérios de Aceite

- [ ] Listagem exibe todos os clientes ativos ao acessar a página
- [ ] Paginação funciona corretamente
- [ ] Clique em "Visualizar" exibe todos os dados do cliente
- [ ] Clique em "Editar" redireciona para o formulário de edição
- [ ] Inativação com confirmação funciona e atualiza a lista
- [ ] Reativação funciona e atualiza a lista
- [ ] Clientes inativos possuem indicação visual diferenciada
- [ ] Botão "Novo Cliente" redireciona para o formulário de cadastro
- [ ] Layout responsivo: tabela no desktop, cards empilhados no mobile
