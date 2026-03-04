# CARD-01: Setup do Projeto

| Campo | Valor |
|-------|-------|
| **Prioridade** | 1 - Crítica |
| **Módulo** | Fundação |
| **Histórias relacionadas** | — (infraestrutura) |
| **Dependências** | Nenhuma |
| **Estimativa** | 0.5 dia |

## Descrição

Criar a estrutura inicial do projeto com frontend (React) e backend (Node.js), incluindo configuração de ferramentas de desenvolvimento, linting, variáveis de ambiente e scripts de execução.

## Tarefas Técnicas

### Backend (Node.js)
- [ ] Inicializar projeto Node.js com `npm init`
- [ ] Instalar dependências: Express, cors, dotenv, bcrypt, jsonwebtoken, nodemailer
- [ ] Configurar estrutura de pastas: `src/routes`, `src/controllers`, `src/models`, `src/middlewares`, `src/services`, `src/config`
- [ ] Criar arquivo `.env.example` com variáveis necessárias (DB, JWT_SECRET, EMAIL)
- [ ] Configurar servidor Express com middlewares básicos (cors, json parser)
- [ ] Configurar ESLint

### Frontend (React)
- [ ] Criar projeto React com Vite
- [ ] Instalar dependências: react-router-dom, axios
- [ ] Configurar estrutura de pastas: `src/pages`, `src/components`, `src/services`, `src/hooks`, `src/contexts`
- [ ] Configurar variáveis de ambiente (VITE_API_URL)
- [ ] Configurar ESLint

### Geral
- [ ] Criar `.gitignore` adequado (node_modules, .env, dist, build)
- [ ] Configurar scripts de desenvolvimento (`dev`, `build`, `start`)

## Critérios de Aceite

- [ ] Backend inicia sem erros na porta configurada
- [ ] Frontend inicia sem erros e exibe uma página em branco funcional
- [ ] Ambos os projetos possuem scripts `dev` funcionando
- [ ] Variáveis de ambiente carregam corretamente via `.env`
- [ ] Estrutura de pastas está organizada conforme definido
