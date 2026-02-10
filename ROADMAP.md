# Roadmap — Curso de Programação

## Visão geral

Curso prático do zero ao deploy, tendo como projeto guia uma **aplicação web de cadastro de filmes e avaliações** (estilo IMDb). Cada módulo agrega conceitos e um projeto prático que será integrado ao app final.

---

## Objetivo final do projeto

Ao concluir o curso, você terá construído uma aplicação web completa que permite:

| Funcionalidade | Descrição |
|----------------|-----------|
| **Cadastrar** | Incluir novos filmes (título, ano, gênero, etc.) |
| **Listar** | Ver todos os filmes cadastrados |
| **Visualizar** | Abrir detalhes de um filme |
| **Editar** | Alterar informações de filmes existentes |
| **Excluir** | Remover filmes do cadastro |
| **Avaliar** | Adicionar notas/avaliações aos filmes |
| **Média** | Visualizar a média de notas por filme |

---

## Módulo 1: Git — Controle de versão (básico)

Objetivo: versionar o código desde o início e trabalhar com histórico e repositório local/remoto.

### 1.1 O que é Git e por que usar
- Controle de versão: conceito e benefícios
- Git vs outros sistemas
- Instalação e configuração inicial (`git config` — nome e e-mail)

### 1.2 Repositório local
- Inicializar repositório (`git init`)
- Estados dos arquivos (untracked, staged, committed)
- Adicionar arquivos (`git add`) e fazer commit (`git commit`)
- Ver histórico (`git log`, `git status`)
- Arquivo `.gitignore`: o que ignorar (node_modules, arquivos sensíveis, etc.)

### 1.3 Trabalhando com branches e remoto
- O que são branches (`git branch`, `git checkout` / `git switch`)
- Criar e trocar de branch
- Conectar repositório remoto (GitHub, GitLab, etc.) — `git remote add`, `git push`, `git pull`
- Fluxo básico: commit local → push para remoto

**Prática 1.3**: Criar um repositório para o curso, fazer commits iniciais e enviar para um remoto (ex.: GitHub).

---

## Módulo 2: Fundamentos de programação e JavaScript

### 2.1 Introdução à programação
- O que é programação e o que são algoritmos
- Variáveis, tipos de dados e operadores (aritméticos, lógicos, comparação)
- Estruturas condicionais (`if/else`, `switch`)
- Estruturas de repetição (`for`, `while`)

### 2.2 JavaScript básico
- Sintaxe e ambiente de execução
- Variáveis (`let`, `const`, `var`) e escopo
- Tipos: string, number, boolean, array, object
- Funções (declaração, expressão, arrow functions)
- Arrays e métodos (`map`, `filter`, `forEach`, `find`)
- Objetos e propriedades

### 2.3 JavaScript intermediário
- JSON (JavaScript Object Notation)
- Manipulação de arrays e objetos
- Destructuring, spread operator, template literals
- Callbacks e funções de ordem superior

**Projeto prático 2.3**: Script que simula cadastro de filmes em memória (array de objetos). Versionar com Git.

---

## Módulo 3: HTML e CSS — Fundamentos

### 3.1 HTML básico
- Estrutura do documento (html, head, body, title)
- Elementos semânticos (header, nav, main, section, article, footer)
- Formulários (form, input, textarea, select, button)
- Listas, links, atributos (id, class, data-*)

### 3.2 CSS básico
- Sintaxe: seletores, propriedades, valores
- Box model (margin, padding, border)
- Cores e tipografia
- Display (block, inline, flex) e posicionamento

### 3.3 CSS intermediário
- Flexbox e Grid (básico)
- Responsividade (media queries)
- Pseudo-classes e pseudo-elementos
- Transições e variáveis CSS

**Projeto prático 3.3**: Estrutura HTML e estilização CSS da página de listagem de filmes.

---

## Módulo 4: JavaScript no frontend (DOM)

### 4.1 Manipulação do DOM
- Document Object Model (DOM)
- Selecionar elementos (getElementById, querySelector, querySelectorAll)
- Alterar conteúdo, atributos e classes
- Criar e remover elementos
- Eventos (click, submit, change, input)

### 4.2 Eventos e interatividade
- addEventListener e objeto de evento
- preventDefault e propagação (bubbling, capturing)
- Event delegation
- Validação básica em formulários

### 4.3 Armazenamento no navegador
- localStorage e sessionStorage
- JSON.stringify e JSON.parse
- CRUD de dados no localStorage

**Projeto prático 4.3**: Versão frontend-only do cadastro de filmes usando localStorage.

---

## Módulo 5: Node.js e NPM

### 5.1 Introdução ao Node.js
- JavaScript no servidor vs no navegador
- Instalação e execução de scripts
- Módulos (require, module.exports) e módulos nativos (fs, path, http)

### 5.2 NPM (Node Package Manager)
- package.json e scripts
- Instalar e remover pacotes (npm install, npm uninstall)
- node_modules e .gitignore
- dependencies e devDependencies

### 5.3 Estrutura e módulos
- CommonJS e organização do projeto
- Módulos customizados

**Projeto prático 5.3**: Script Node.js que lê e escreve dados de filmes em arquivo JSON.

---

## Módulo 6: Express.js — API no backend

### 6.1 Introdução ao Express
- Servidor HTTP básico
- Rotas e métodos HTTP (GET, POST, PUT, DELETE)
- Objetos req e res

### 6.2 Rotas e middleware
- Parâmetros de rota (:id) e query (?param=value)
- Request body
- Middleware (express.json(), express.static()) e middleware customizado

### 6.3 API REST
- Conceitos REST, URLs e métodos
- Status codes (200, 201, 404, 500)
- Organização com Router

**Projeto prático 6.3**: API com GET, POST, PUT, DELETE para filmes (dados em memória).

---

## Módulo 7: Persistência de dados

### 7.1 Arquivos e JSON
- fs.readFile / fs.writeFile (sync e async)
- JSON.parse e JSON.stringify
- try/catch e validação

### 7.2 CRUD com arquivos
- Create, Read, Update, Delete persistidos em JSON
- Validação e tratamento de erros

**Projeto prático 7.2**: CRUD completo de filmes com persistência em arquivo JSON.

---

## Módulo 8: Integração frontend e backend

### 8.1 Fetch API
- Requisições GET, POST, PUT, DELETE
- Tratamento de resposta (then/catch, async/await)

### 8.2 CORS
- O que é CORS e configuração no Express

### 8.3 Consumir API no frontend
- Conectar frontend ao backend
- Funções por operação CRUD
- Feedback (loading, sucesso, erro)

**Projeto prático 8.3**: Conectar o frontend ao backend Express.

---

## Módulo 9: Funcionalidades avançadas

### 9.1 Sistema de notas/avaliações
- Estrutura de dados para avaliações
- Adicionar avaliação e calcular média
- Validação (ex.: nota 0–10)

### 9.2 Busca e filtros
- Busca por nome, filtro por gênero
- Ordenação e paginação básica (opcional)

### 9.3 Validação e erros
- Validação no backend e no frontend
- Mensagens e status codes adequados

**Projeto prático 9.3**: Sistema de notas e busca no aplicativo.

---

## Módulo 10: Interface e experiência do usuário

### 10.1 Páginas e navegação
- Listagem, detalhes, cadastro/edição
- Navegação (múltiplas páginas ou SPA simples)

### 10.2 Formulários e UX
- Formulários de cadastro, edição e avaliação
- Validação visual e feedback (toast, alertas)

### 10.3 Estilização final
- Layout responsivo e acessibilidade básica
- Ícones, imagens e refinamento visual

**Projeto prático 10.3**: Interface completa e polida.

---

## Módulo 11: Finalização e deploy

### 11.1 Testes e qualidade
- Testar fluxos e casos de erro
- Testar em diferentes navegadores
- Correção de bugs

### 11.2 Organização e documentação
- Estrutura de arquivos e README
- Comentários e documentação da API

### 11.3 Deploy (opcional)
- Backend (Railway, Render, Heroku)
- Frontend (Vercel, Netlify, GitHub Pages)
- Variáveis de ambiente

**Projeto final**: Aplicativo completo de CRUD de filmes e notas em funcionamento.

---

## Estrutura final do projeto

```
projeto-filmes/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── filmes.js
│   ├── data/
│   │   └── filmes.json
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   └── ui.js
│   └── README.md
└── README.md
```

---

## Ferramentas e requisitos

### Ferramentas
- **Node.js** (v18+)
- **NPM**
- **Git**
- Editor de código (ex.: VS Code)
- Navegador moderno
- Cliente para API (Postman, Insomnia) — opcional

### Pacotes principais
- express (backend)
- cors (backend)
- nodemon (dev, opcional)

### Pré-requisitos
- Nenhum conhecimento prévio; o curso parte do zero.

---

## Duração estimada

| Módulo | Conteúdo | Duração |
|--------|----------|---------|
| 1 | Git (básico) | 3–5 dias |
| 2 | Fundamentos e JavaScript | 2–3 semanas |
| 3 | HTML e CSS | 1–2 semanas |
| 4 | DOM e frontend | 1–2 semanas |
| 5 | Node.js e NPM | ~1 semana |
| 6 | Express (API) | ~2 semanas |
| 7 | Persistência (arquivos) | ~1 semana |
| 8 | Integração front/back | 1–2 semanas |
| 9 | Funcionalidades avançadas | 1–2 semanas |
| 10 | Interface e UX | 1–2 semanas |
| 11 | Finalização e deploy | ~1 semana |

**Total**: aproximadamente **12–18 semanas** (3–4 meses), conforme o ritmo.

---

## Objetivos de aprendizado por fase

**Após Módulos 1–4**
- Usar Git para versionar o projeto
- Lógica de programação e JavaScript (básico e intermediário)
- Interfaces com HTML/CSS e manipulação do DOM

**Após Módulos 5–7**
- Node.js, NPM e APIs com Express
- CRUD e persistência em arquivos

**Após Módulos 8–11**
- Integração frontend e backend
- App completo, refinamento e deploy

---

## Próximos passos após o curso

- Banco de dados (SQL ou NoSQL)
- Autenticação e autorização
- Testes automatizados
- Frameworks frontend (React, Vue)
- TypeScript
- Docker e CI/CD
