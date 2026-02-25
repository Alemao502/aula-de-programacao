export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  avatar?: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CriarUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
}

export interface AtualizarUsuarioDto {
  nome?: string;
  avatar?: string;
}
