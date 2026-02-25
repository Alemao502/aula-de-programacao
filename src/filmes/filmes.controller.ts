import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { FilmesService } from './filmes.service';

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Get()
  listarTodos(@Query('titulo') titulo?: string, @Query('genero') genero?: string) {
    return this.filmesService.listarTodos(titulo, genero);
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.filmesService.buscarPorId(Number(id));
  }

  @Post()
  criar(@Body() body: any) {
    return this.filmesService.criar(body);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() body: any) {
    return this.filmesService.atualizar(Number(id), body);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.filmesService.remover(Number(id));
  }

  @Get(':id/avaliacoes')
  listarAvaliacoes(@Param('id') id: string) {
    return this.filmesService.listarAvaliacoes(Number(id));
  }

  @Post(':id/avaliacoes')
  adicionarAvaliacao(@Param('id') id: string, @Body() body: any) {
    return this.filmesService.adicionarAvaliacao(Number(id), body);
  }
}
