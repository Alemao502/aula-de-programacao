export interface Avaliacao {
  id: number;
  nota: number;
  comentario?: string;
  criadoEm: Date;
}

export interface Filme {
  id: number;
  titulo: string;
  ano: number;
  genero: string;
  diretor: string;
  duracao: number; // em minutos
  sinopse?: string;
  avaliacoes: Avaliacao[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CriarFilmeDto {
  titulo: string;
  ano: number;
  genero: string;
  diretor: string;
  duracao: number;
  sinopse?: string;
}

export interface AtualizarFilmeDto {
  titulo?: string;
  ano?: number;
  genero?: string;
  diretor?: string;
  duracao?: number;
  sinopse?: string;
}

export interface CriarAvaliacaoDto {
  nota: number;
  comentario?: string;
}
