# CARD-11: Job de Email de Aniversário

| Campo | Valor |
|-------|-------|
| **Prioridade** | 6 - Média |
| **Módulo** | Notificações de Aniversário |
| **Histórias relacionadas** | HU-16 |
| **Dependências** | CARD-02, CARD-03 |
| **Estimativa** | 0.5 dia |

## Descrição

Implementar um job agendado (cron) que executa diariamente, verifica os aniversariantes do dia e envia um email de notificação para o dono do sistema com a lista de clientes aniversariantes.

## Tarefas Técnicas

- [ ] Instalar e configurar biblioteca de agendamento (node-cron ou similar)
- [ ] Criar job que executa diariamente em horário configurável (ex: 07:00)
- [ ] Implementar consulta de aniversariantes do dia (mês + dia, ignorar ano, apenas ativos)
- [ ] Criar template de email HTML com:
  - Assunto: "Aniversariantes de hoje - [data]"
  - Lista de clientes: nome, tipo (PF/PJ), telefone e email
  - Estilo visual simples e legível
- [ ] Enviar email via Nodemailer usando configurações do `.env`
  - Variáveis: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL
- [ ] Não enviar email se não houver aniversariantes no dia
- [ ] Adicionar log de execução do job (sucesso/erro)

## Critérios de Aceite

- [ ] Job executa automaticamente no horário configurado
- [ ] Email é enviado ao dono do sistema com a lista de aniversariantes do dia
- [ ] Email contém nome, tipo, telefone e email de cada aniversariante
- [ ] Email NÃO é enviado quando não há aniversariantes
- [ ] Apenas clientes ativos são considerados (RN-03)
- [ ] Email é enviado para o dono, não para os clientes (RN-04)
- [ ] Erros de envio são logados sem derrubar a aplicação
- [ ] Horário de execução é configurável via variável de ambiente
