# CARD-04: Telas de Autenticação

| Campo | Valor |
|-------|-------|
| **Prioridade** | 2 - Alta |
| **Módulo** | Autenticação |
| **Histórias relacionadas** | HU-01, HU-02, HU-03 |
| **Dependências** | CARD-01, CARD-03 |
| **Estimativa** | 1 dia |

## Descrição

Criar as telas de login, recuperação de senha e redefinição de senha no frontend. Implementar o contexto de autenticação para gerenciar o estado do usuário logado e a persistência da sessão.

## Tarefas Técnicas

### Contexto de Autenticação
- [ ] Criar `AuthContext` com estado do usuário e funções de login/logout
- [ ] Implementar persistência do token no localStorage
- [ ] Ao iniciar o app, verificar token salvo via endpoint `/api/auth/me`
- [ ] Criar componente `PrivateRoute` para proteger rotas autenticadas
- [ ] Configurar interceptor do Axios para injetar token no header Authorization
- [ ] Configurar interceptor para redirecionar ao login quando receber 401

### Tela de Login
- [ ] Criar página `/login` com formulário de email e senha
- [ ] Validação de campos (email válido, senha não vazia)
- [ ] Exibir mensagem de erro em caso de credenciais inválidas
- [ ] Redirecionar para dashboard após login bem-sucedido
- [ ] Link "Esqueci minha senha" para tela de recuperação

### Tela de Recuperação de Senha
- [ ] Criar página `/forgot-password` com campo de email
- [ ] Chamar endpoint de forgot-password
- [ ] Exibir mensagem de confirmação de envio do email

### Tela de Redefinição de Senha
- [ ] Criar página `/reset-password/:token` com campos de nova senha e confirmação
- [ ] Validar que as senhas coincidem
- [ ] Chamar endpoint de reset-password
- [ ] Redirecionar para login após sucesso

## Critérios de Aceite

- [ ] Usuário consegue fazer login com email e senha válidos
- [ ] Mensagem de erro é exibida para credenciais inválidas
- [ ] Após login, o usuário é redirecionado ao dashboard
- [ ] Ao fechar e reabrir o navegador, o usuário permanece logado (token persistido)
- [ ] Token expirado redireciona para tela de login
- [ ] Fluxo de recuperação de senha funciona de ponta a ponta
- [ ] Rotas protegidas redirecionam para login quando não autenticado
- [ ] Todas as telas são responsivas (desktop e mobile)
