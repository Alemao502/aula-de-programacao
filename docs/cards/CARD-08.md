# CARD-08: Busca e Filtros de Clientes

| Campo | Valor |
|-------|-------|
| **Prioridade** | 4 - Média |
| **Módulo** | Busca e Filtros |
| **Histórias relacionadas** | HU-10, HU-11, HU-12, HU-13 |
| **Dependências** | CARD-05, CARD-07 |
| **Estimativa** | 0.5 dia |

## Descrição

Adicionar funcionalidades de busca textual e filtros na listagem de clientes, tanto no backend (query params) quanto no frontend (campos de busca e filtros na interface).

## Tarefas Técnicas

### Backend
- [ ] Adicionar query params ao endpoint `GET /api/clients`:
  - `search` — busca por nome/razão social (LIKE/ILIKE)
  - `document` — busca por CPF ou CNPJ (match parcial)
  - `type` — filtro por tipo: `PF` ou `PJ`
  - `active` — filtro por status: `true`, `false` ou `all` (default: `true`)
- [ ] Implementar busca case-insensitive e com remoção de acentos

### Frontend
- [ ] Adicionar campo de busca textual acima da tabela de clientes
  - Busca por nome/razão social com debounce (300ms)
- [ ] Adicionar campo de busca por CPF/CNPJ
- [ ] Adicionar filtro dropdown por tipo (Todos, Pessoa Física, Pessoa Jurídica)
- [ ] Adicionar toggle/checkbox para "Exibir inativos"
- [ ] Atualizar a listagem em tempo real conforme os filtros são aplicados
- [ ] Exibir mensagem "Nenhum cliente encontrado" quando a busca não retorna resultados
- [ ] Botão "Limpar filtros" para resetar todos os campos

## Critérios de Aceite

- [ ] Busca por nome encontra clientes PF e PJ (case-insensitive)
- [ ] Busca por CPF/CNPJ encontra o cliente correspondente (parcial ou completo)
- [ ] Filtro por tipo exibe apenas PF ou apenas PJ
- [ ] Toggle de inativos mostra/oculta clientes inativos na listagem
- [ ] Filtros podem ser combinados (ex: buscar "João" + tipo PF + apenas ativos)
- [ ] Campo de busca tem debounce para não sobrecarregar a API
- [ ] Mensagem "Nenhum cliente encontrado" é exibida quando aplicável
- [ ] Botão "Limpar filtros" reseta tudo e exibe a listagem padrão
