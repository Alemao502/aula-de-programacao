import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { FilmesRepository } from './filmes.repository';
import {
  Filme,
  Avaliacao,
  CriarFilmeDto,
  AtualizarFilmeDto,
  CriarAvaliacaoDto,
} from './filmes.interfaces';

@Injectable()
export class FilmesService {
  constructor(private readonly filmesRepository: FilmesRepository) {}

  listarTodos(titulo?: string, genero?: string): Filme[] {
    let filmes = this.filmesRepository.listarTodos();

    if (titulo) {
      filmes = filmes.filter((f) =>
        f.titulo.toLowerCase().includes(titulo.toLowerCase()),
      );
    }

    if (genero) {
      filmes = filmes.filter(
        (f) => f.genero.toLowerCase() === genero.toLowerCase(),
      );
    }

    return filmes.map((f) => ({ ...f, mediaAvaliacoes: this.calcularMedia(f.avaliacoes) }));
  }

  buscarPorId(id: number): Filme & { mediaAvaliacoes: number | null } {
    const filme = this.filmesRepository.buscarPorId(id);
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }
    return { ...filme, mediaAvaliacoes: this.calcularMedia(filme.avaliacoes) };
  }

  criar(dados: CriarFilmeDto): Filme {
    if (!dados.titulo?.trim())
      throw new BadRequestException('O título é obrigatório');

    if (!dados.ano || isNaN(Number(dados.ano)))
      throw new BadRequestException('O ano é obrigatório');

    if (!dados.genero?.trim())
      throw new BadRequestException('O gênero é obrigatório');

    if (!dados.diretor?.trim())
      throw new BadRequestException('O diretor é obrigatório');

    if (!dados.duracao || isNaN(Number(dados.duracao)) || Number(dados.duracao) <= 0)
      throw new BadRequestException('A duração deve ser um número positivo (em minutos)');

    return this.filmesRepository.criar({
      titulo: dados.titulo.trim(),
      ano: Number(dados.ano),
      genero: dados.genero.trim(),
      diretor: dados.diretor.trim(),
      duracao: Number(dados.duracao),
      poster: dados.poster?.trim(),
      sinopse: dados.sinopse?.trim(),
      trailer: dados.trailer?.trim(),
    });
  }

  atualizar(id: number, dados: AtualizarFilmeDto): Filme {
    const filme = this.filmesRepository.buscarPorId(id);
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }

    if (dados.titulo !== undefined && dados.titulo.trim() === '')
      throw new BadRequestException('O título não pode ser vazio');

    if (dados.ano !== undefined && isNaN(Number(dados.ano)))
      throw new BadRequestException('Ano inválido');

    if (dados.genero !== undefined && dados.genero.trim() === '')
      throw new BadRequestException('O gênero não pode ser vazio');

    if (dados.diretor !== undefined && dados.diretor.trim() === '')
      throw new BadRequestException('O diretor não pode ser vazio');

    if (dados.duracao !== undefined && (isNaN(Number(dados.duracao)) || Number(dados.duracao) <= 0))
      throw new BadRequestException('A duração deve ser um número positivo');

    return this.filmesRepository.atualizar(filme, {
      titulo: dados.titulo?.trim(),
      ano: dados.ano !== undefined ? Number(dados.ano) : undefined,
      genero: dados.genero?.trim(),
      diretor: dados.diretor?.trim(),
      duracao: dados.duracao !== undefined ? Number(dados.duracao) : undefined,
      poster: dados.poster?.trim(),
      sinopse: dados.sinopse?.trim(),
      trailer: dados.trailer?.trim(),
    });
  }

  remover(id: number): { mensagem: string; filme: Filme } {
    const removido = this.filmesRepository.remover(id);
    if (!removido) {
      throw new NotFoundException('Filme não encontrado');
    }
    return { mensagem: 'Filme removido com sucesso', filme: removido };
  }

  listarAvaliacoes(filmeId: number): {
    filme: string;
    avaliacoes: Avaliacao[];
    media: number | null;
    total: number;
  } {
    const filme = this.filmesRepository.buscarPorId(filmeId);
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }

    return {
      filme: filme.titulo,
      avaliacoes: filme.avaliacoes,
      media: this.calcularMedia(filme.avaliacoes),
      total: filme.avaliacoes.length,
    };
  }

  adicionarAvaliacao(
    filmeId: number,
    dados: CriarAvaliacaoDto,
  ): { avaliacao: Avaliacao; mediaAtual: number | null } {
    const filme = this.filmesRepository.buscarPorId(filmeId);
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
    }

    const nota = Number(dados.nota);
    if (isNaN(nota) || nota < 0 || nota > 10) {
      throw new BadRequestException('A nota deve ser um número entre 0 e 10');
    }

    const avaliacao = this.filmesRepository.adicionarAvaliacao(filme, {
      nota,
      comentario: dados.comentario,
    });

    return {
      avaliacao,
      mediaAtual: this.calcularMedia(filme.avaliacoes),
    };
  }

  private calcularMedia(avaliacoes: Avaliacao[]): number | null {
    if (avaliacoes.length === 0) return null;
    const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0);
    return Math.round((soma / avaliacoes.length) * 10) / 10;
  }
}
