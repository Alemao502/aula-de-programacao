# CARD-03: API de Autenticação

| Campo | Valor |
|-------|-------|
| **Prioridade** | 2 - Alta |
| **Módulo** | Autenticação |
| **Histórias relacionadas** | HU-01, HU-02, HU-03 |
| **Dependências** | CARD-01, CARD-02 |
| **Estimativa** | 1 dia |

## Descrição

Implementar os endpoints de autenticação no backend: login, validação de token (manter logado) e recuperação de senha por email.

## Tarefas Técnicas

- [ ] Criar endpoint `POST /api/auth/login`
  - Receber email e senha
  - Validar credenciais contra o banco
  - Retornar JWT com expiração configurável
- [ ] Criar endpoint `POST /api/auth/forgot-password`
  - Receber email
  - Gerar token de recuperação com expiração (ex: 1 hora)
  - Enviar email com link de redefinição
- [ ] Criar endpoint `POST /api/auth/reset-password`
  - Receber token e nova senha
  - Validar token e expiração
  - Atualizar hash da senha no banco
- [ ] Criar endpoint `GET /api/auth/me`
  - Validar JWT do header Authorization
  - Retornar dados do usuário logado
- [ ] Criar middleware `authMiddleware` para proteger rotas autenticadas
  - Verificar presença e validade do JWT
  - Injetar dados do usuário na request
- [ ] Configurar serviço de envio de email (Nodemailer)

## Critérios de Aceite

- [ ] Login com credenciais válidas retorna JWT (status 200)
- [ ] Login com credenciais inválidas retorna erro (status 401)
- [ ] Token JWT expira após o tempo configurado
- [ ] Endpoint `/me` retorna dados do usuário com token válido
- [ ] Endpoint `/me` retorna 401 com token inválido/expirado
- [ ] Email de recuperação é enviado ao solicitar forgot-password
- [ ] Senha é atualizada com sucesso via reset-password com token válido
- [ ] Token de recuperação expira após 1 hora
- [ ] Senhas são armazenadas com bcrypt (nunca em texto puro)
