# CARD-13: Relatório de Aniversariantes do Mês

| Campo | Valor |
|-------|-------|
| **Prioridade** | 8 - Baixa |
| **Módulo** | Relatórios |
| **Histórias relacionadas** | HU-20 |
| **Dependências** | CARD-05, CARD-10 |
| **Estimativa** | 0.5 dia |

## Descrição

Criar funcionalidade de relatório que lista os aniversariantes de um mês específico selecionado pelo usuário, permitindo visualização na tela e exportação.

## Tarefas Técnicas

### Backend
- [ ] Criar endpoint `GET /api/reports/birthdays?month=MM`
  - Receber parâmetro `month` (1-12)
  - Retornar lista de clientes ativos cujo aniversário cai no mês informado
  - Ordenar por dia do aniversário (crescente)
  - Incluir: nome, tipo (PF/PJ), documento, telefone, email, dia do aniversário
- [ ] Rota protegida pelo `authMiddleware`

### Frontend
- [ ] Criar página `/reports/birthdays`
- [ ] Seletor de mês (dropdown com os 12 meses, default: mês atual)
- [ ] Ao selecionar o mês, carregar os aniversariantes via API
- [ ] Exibir tabela com: dia, nome, tipo, documento, telefone, email
- [ ] Exibir total de aniversariantes no mês selecionado
- [ ] Mensagem "Nenhum aniversariante neste mês" quando vazio
- [ ] Acessível via menu de navegação (link "Relatórios")

## Critérios de Aceite

- [ ] Seletor de mês permite escolher qualquer mês do ano
- [ ] Ao trocar o mês, a lista é atualizada automaticamente
- [ ] Apenas clientes ativos aparecem no relatório (RN-03)
- [ ] Lista é ordenada por dia do aniversário
- [ ] Total de aniversariantes é exibido
- [ ] Mensagem de "nenhum aniversariante" aparece quando o mês não tem resultados
- [ ] Tela é responsiva
