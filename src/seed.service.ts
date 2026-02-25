import { Injectable, OnModuleInit } from '@nestjs/common';
import { FilmesRepository } from './filmes/filmes.repository';
import { UsersRepository } from './users/users.repository';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly filmesRepository: FilmesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  onModuleInit() {
    this.popularFilmes();
    this.popularUsuarios();
  }

  private popularFilmes() {
    const filmes = [
      {
        titulo: 'O Poderoso Chefão',
        ano: 1972,
        genero: 'Drama',
        diretor: 'Francis Ford Coppola',
        duracao: 175,
        poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        sinopse: 'A família Corleone é uma das mais poderosas famílias mafiosas de Nova York. Quando o patriarca Vito Corleone é assassinado, seu filho Michael assume o controle do império criminoso.',
      },
      {
        titulo: 'Batman: O Cavaleiro das Trevas',
        ano: 2008,
        genero: 'Ação',
        diretor: 'Christopher Nolan',
        duracao: 152,
        poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        sinopse: 'Batman enfrenta o Coringa, um criminoso caótico que quer mergulhar Gotham City no caos. Um duelo entre o herói e o vilão que desafia os limites da moral.',
      },
      {
        titulo: 'A Origem',
        ano: 2010,
        genero: 'Ficção Científica',
        diretor: 'Christopher Nolan',
        duracao: 148,
        poster: 'https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
        sinopse: 'Um ladrão especializado em extrair segredos do subconsciente durante o sono recebe a missão inversa: plantar uma ideia na mente de um alvo.',
      },
      {
        titulo: 'Pulp Fiction',
        ano: 1994,
        genero: 'Crime',
        diretor: 'Quentin Tarantino',
        duracao: 154,
        poster: 'https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
        sinopse: 'Histórias entrelaçadas de criminosos, um boxeador corrupto e dois assassinos profissionais no submundo de Los Angeles.',
      },
      {
        titulo: 'Forrest Gump',
        ano: 1994,
        genero: 'Drama',
        diretor: 'Robert Zemeckis',
        duracao: 142,
        poster: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
        sinopse: 'A vida extraordinária de um homem simples do Alabama que, sem querer, testemunha e influencia alguns dos eventos mais marcantes da história americana.',
      },
      {
        titulo: 'Um Sonho de Liberdade',
        ano: 1994,
        genero: 'Drama',
        diretor: 'Frank Darabont',
        duracao: 142,
        poster: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
        sinopse: 'Andy Dufresne é condenado injustamente à prisão de Shawshank. Ao longo de 20 anos, ele mantém esperança e transforma a vida dos outros detentos.',
      },
    ];

    const avaliacoes: Record<number, { nota: number; comentario: string }[]> = {
      0: [
        { nota: 10, comentario: 'Obra-prima absoluta do cinema.' },
        { nota: 9, comentario: 'Roteiro e atuações impecáveis.' },
        { nota: 10, comentario: 'Assisti três vezes e continua incrível.' },
      ],
      1: [
        { nota: 10, comentario: 'O melhor filme de super-herói já feito.' },
        { nota: 9, comentario: 'Heath Ledger como Coringa é inesquecível.' },
      ],
      2: [
        { nota: 9, comentario: 'Roteiro genial, visualmente deslumbrante.' },
        { nota: 8, comentario: 'Um pouco confuso na primeira vez, mas vale muito.' },
        { nota: 10, comentario: 'Nolan no seu melhor.' },
      ],
      3: [
        { nota: 9, comentario: 'Diálogos únicos, narrativa brilhante.' },
        { nota: 10, comentario: 'Tarantino revolucionou o cinema com esse filme.' },
      ],
      4: [
        { nota: 9, comentario: 'Tom Hanks entregou uma atuação memorável.' },
        { nota: 8, comentario: 'Emocionante do início ao fim.' },
      ],
      5: [
        { nota: 10, comentario: 'Um dos melhores filmes de todos os tempos.' },
        { nota: 10, comentario: 'Mensagem poderosa sobre esperança e amizade.' },
        { nota: 9, comentario: 'Morgan Freeman e Tim Robbins são perfeitos.' },
      ],
    };

    filmes.forEach((dados, index) => {
      const filme = this.filmesRepository.criar(dados);
      avaliacoes[index]?.forEach((av) => {
        this.filmesRepository.adicionarAvaliacao(filme, av);
      });
    });
  }

  private popularUsuarios() {
    const usuarios = [
      { nome: 'Admin', email: 'admin@cineapp.com', senha: 'admin123', confirmacaoSenha: 'admin123' },
      { nome: 'Maria Silva', email: 'maria@email.com', senha: 'maria123', confirmacaoSenha: 'maria123' },
    ];

    usuarios.forEach((u) => this.usersRepository.criar(u));
  }
}
