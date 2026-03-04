# CARD-10: Tela do Dashboard

| Campo | Valor |
|-------|-------|
| **Prioridade** | 5 - Média |
| **Módulo** | Dashboard |
| **Histórias relacionadas** | HU-15, HU-17, HU-18, HU-19 |
| **Dependências** | CARD-04, CARD-09 |
| **Estimativa** | 1 dia |

## Descrição

Criar a tela principal do sistema (dashboard) que é exibida após o login, com cards de métricas e seções de aniversariantes do dia e da semana.

## Tarefas Técnicas

### Cards de Métricas
- [ ] Criar página `/dashboard` como rota principal após login
- [ ] Card: Total de clientes ativos
- [ ] Card: Total de clientes PF
- [ ] Card: Total de clientes PJ
- [ ] Card: Total de clientes inativos
- [ ] Layout responsivo: cards em grid (2x2 no desktop, empilhados no mobile)

### Seção de Aniversariantes
- [ ] Seção "Aniversariantes de Hoje" com destaque visual
  - Exibir nome, tipo (PF/PJ) e idade (se possível calcular)
  - Mensagem "Nenhum aniversariante hoje" quando vazio
- [ ] Seção "Aniversariantes da Semana"
  - Exibir nome, tipo (PF/PJ), data do aniversário e dias restantes
  - Ordenar por data mais próxima
  - Mensagem "Nenhum aniversariante esta semana" quando vazio

### Navegação
- [ ] Criar layout principal com sidebar ou navbar
  - Links: Dashboard, Clientes, Relatórios
  - Botão de logout
  - Nome do usuário logado
- [ ] Dashboard é a página padrão após login

## Critérios de Aceite

- [ ] Dashboard é exibido ao fazer login no sistema
- [ ] Cards de métricas exibem valores corretos do backend
- [ ] Aniversariantes do dia são destacados visualmente
- [ ] Aniversariantes da semana exibem dias restantes
- [ ] Mensagens de "nenhum aniversariante" aparecem quando aplicável
- [ ] Navegação lateral/superior funciona corretamente
- [ ] Botão de logout encerra a sessão e redireciona ao login
- [ ] Layout é responsivo (desktop, tablet e mobile)
