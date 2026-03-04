# CARD-06: Tela de Cadastro e Edição de Clientes

| Campo | Valor |
|-------|-------|
| **Prioridade** | 3 - Alta |
| **Módulo** | Cadastro de Clientes |
| **Histórias relacionadas** | HU-04, HU-05, HU-06 |
| **Dependências** | CARD-04, CARD-05 |
| **Estimativa** | 1 dia |

## Descrição

Criar a tela de formulário para cadastro e edição de clientes, com alternância entre pessoa física e pessoa jurídica, máscaras de input, validações no frontend e feedback visual ao usuário.

## Tarefas Técnicas

- [ ] Criar página `/clients/new` com formulário de cadastro
- [ ] Implementar seletor de tipo de cliente (PF / PJ) que alterna os campos exibidos
- [ ] Campos para Pessoa Física:
  - Nome completo (obrigatório, mínimo 3 caracteres)
  - CPF com máscara (XXX.XXX.XXX-XX) e validação de dígitos
  - Email (opcional, validação de formato)
  - Telefone com máscara (XX) XXXXX-XXXX (opcional)
  - Data de aniversário (obrigatório, date picker, não permite data futura)
- [ ] Campos para Pessoa Jurídica:
  - Razão social (obrigatório, mínimo 3 caracteres)
  - CNPJ com máscara (XX.XXX.XXX/XXXX-XX) e validação de dígitos
  - Email (opcional, validação de formato)
  - Telefone com máscara (XX) XXXXX-XXXX (opcional)
  - Nome do responsável (obrigatório, mínimo 3 caracteres)
  - Data de aniversário do responsável (obrigatório, date picker)
- [ ] Criar página `/clients/:id/edit` reutilizando o mesmo formulário
  - Preencher campos com dados atuais do cliente
  - Tipo de cliente (PF/PJ) não pode ser alterado na edição
- [ ] Exibir mensagens de erro da API (ex: CPF já cadastrado)
- [ ] Exibir feedback de sucesso após salvar (toast/notificação)
- [ ] Botão "Cancelar" que retorna à listagem

## Critérios de Aceite

- [ ] Formulário alterna campos corretamente ao trocar entre PF e PJ
- [ ] Máscaras de CPF, CNPJ e telefone funcionam durante a digitação
- [ ] Validação no frontend impede envio com campos obrigatórios vazios
- [ ] Validação de CPF/CNPJ (dígitos verificadores) no frontend
- [ ] Data de aniversário não permite selecionar data futura
- [ ] Cadastro com sucesso exibe mensagem e redireciona à listagem
- [ ] Edição carrega dados atuais e salva alterações corretamente
- [ ] Erros da API (ex: documento duplicado) são exibidos ao usuário
- [ ] Formulário é responsivo (funciona em mobile)
