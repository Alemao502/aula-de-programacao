# CARD-12: Importação de Planilha

| Campo | Valor |
|-------|-------|
| **Prioridade** | 7 - Baixa |
| **Módulo** | Importação |
| **Histórias relacionadas** | HU-14 |
| **Dependências** | CARD-05 |
| **Estimativa** | 1 dia |

## Descrição

Implementar funcionalidade de importação em massa de clientes a partir de arquivos CSV ou XLSX. O upload será simples (sem tela de prévia), processando os dados diretamente.

## Tarefas Técnicas

### Backend
- [ ] Instalar biblioteca para leitura de planilhas (xlsx/exceljs ou csv-parser)
- [ ] Criar endpoint `POST /api/clients/import` (multipart/form-data)
  - Aceitar arquivos .csv e .xlsx
  - Limitar tamanho do arquivo (ex: 5MB)
- [ ] Implementar parsing do arquivo:
  - Detectar formato (CSV ou XLSX)
  - Mapear colunas esperadas: tipo, nome/razão social, documento, email, telefone, responsável, aniversário
- [ ] Validar cada linha:
  - Campos obrigatórios conforme tipo (PF/PJ)
  - Formato de CPF/CNPJ
  - Formato de data
  - Unicidade de documento (contra o banco e dentro do próprio arquivo)
- [ ] Inserir registros válidos no banco
- [ ] Retornar resultado da importação:
  - Total de registros processados
  - Total importados com sucesso
  - Lista de erros (linha + motivo)
- [ ] Rota protegida pelo `authMiddleware`

### Frontend
- [ ] Criar página ou modal `/clients/import`
- [ ] Campo de upload de arquivo (drag & drop ou botão)
  - Aceitar apenas .csv e .xlsx
  - Exibir nome do arquivo selecionado
- [ ] Botão "Importar" que envia o arquivo ao backend
- [ ] Exibir loading durante o processamento
- [ ] Exibir resultado da importação:
  - Total importados com sucesso (destaque positivo)
  - Lista de erros com número da linha e motivo (se houver)
- [ ] Link para download de planilha modelo (template)
- [ ] Criar planilha modelo com colunas e exemplo de preenchimento

## Critérios de Aceite

- [ ] Upload de CSV importa clientes corretamente
- [ ] Upload de XLSX importa clientes corretamente
- [ ] Linhas com erro não bloqueiam a importação das demais
- [ ] Resultado exibe quantidade de sucessos e lista de erros
- [ ] Documentos duplicados (no banco ou no arquivo) são reportados como erro
- [ ] Campos obrigatórios faltantes são reportados com número da linha
- [ ] Planilha modelo está disponível para download
- [ ] Arquivos acima de 5MB são rejeitados com mensagem clara
- [ ] Interface é responsiva
