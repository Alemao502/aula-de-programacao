import { Injectable } from '@nestjs/common';
import {
  Filme,
  Avaliacao,
  CriarFilmeDto,
  AtualizarFilmeDto,
  CriarAvaliacaoDto,
} from './filmes.interfaces';

@Injectable()
export class FilmesRepository {
  private filmes: Filme[] = [];
  private proximoId = 1;

  listarTodos(): Filme[] {
    return this.filmes;
  }

  buscarPorId(id: number): Filme | undefined {
    return this.filmes.find((f) => f.id === id);
  }

  criar(dados: CriarFilmeDto): Filme {
    const novoFilme: Filme = {
      id: this.proximoId++,
      titulo: dados.titulo,
      ano: dados.ano,
      genero: dados.genero,
      diretor: dados.diretor,
      duracao: dados.duracao,
      sinopse: dados.sinopse,
      avaliacoes: [],
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.filmes.push(novoFilme);
    return novoFilme;
  }

  atualizar(filme: Filme, dados: AtualizarFilmeDto): Filme {
    if (dados.titulo !== undefined) filme.titulo = dados.titulo;
    if (dados.ano !== undefined) filme.ano = dados.ano;
    if (dados.genero !== undefined) filme.genero = dados.genero;
    if (dados.diretor !== undefined) filme.diretor = dados.diretor;
    if (dados.duracao !== undefined) filme.duracao = dados.duracao;
    if (dados.sinopse !== undefined) filme.sinopse = dados.sinopse;

    filme.atualizadoEm = new Date();
    return filme;
  }

  remover(id: number): Filme | undefined {
    const index = this.filmes.findIndex((f) => f.id === id);
    if (index === -1) return undefined;

    const [removido] = this.filmes.splice(index, 1);
    return removido;
  }

  adicionarAvaliacao(filme: Filme, dados: CriarAvaliacaoDto): Avaliacao {
    const novaAvaliacao: Avaliacao = {
      id: filme.avaliacoes.length + 1,
      nota: dados.nota,
      comentario: dados.comentario,
      criadoEm: new Date(),
    };

    filme.avaliacoes.push(novaAvaliacao);
    filme.atualizadoEm = new Date();
    return novaAvaliacao;
  }
}
