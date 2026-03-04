# CARD-09: API do Dashboard

| Campo | Valor |
|-------|-------|
| **Prioridade** | 5 - Média |
| **Módulo** | Dashboard |
| **Histórias relacionadas** | HU-15, HU-17, HU-18, HU-19 |
| **Dependências** | CARD-05 |
| **Estimativa** | 0.5 dia |

## Descrição

Criar endpoint no backend que retorne os dados consolidados para o dashboard: métricas de clientes e aniversariantes do dia/semana.

## Tarefas Técnicas

- [ ] Criar endpoint `GET /api/dashboard`
  - Retornar objeto com todas as métricas em uma única chamada
- [ ] Implementar consulta de métricas:
  - `total_clients` — total de clientes ativos
  - `total_pf` — total de PF ativos
  - `total_pj` — total de PJ ativos
  - `total_inactive` — total de clientes inativos
- [ ] Implementar consulta de aniversariantes:
  - `birthdays_today` — lista de clientes que fazem aniversário hoje (comparar mês e dia, ignorar ano)
  - `birthdays_week` — lista de clientes que fazem aniversário nos próximos 7 dias
- [ ] Considerar apenas clientes ativos nos aniversariantes (RN-03)
- [ ] Rota protegida pelo `authMiddleware`

## Critérios de Aceite

- [ ] Endpoint retorna todas as métricas em uma única resposta JSON
- [ ] Contagem de clientes está correta (total, PF, PJ, inativos)
- [ ] Aniversariantes do dia lista apenas clientes com aniversário hoje
- [ ] Aniversariantes da semana lista clientes dos próximos 7 dias
- [ ] Clientes inativos não aparecem na lista de aniversariantes
- [ ] Comparação de data ignora o ano (apenas mês e dia)
- [ ] Endpoint retorna 401 sem autenticação
