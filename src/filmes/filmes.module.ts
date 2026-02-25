import { Module } from '@nestjs/common';
import { FilmesRepository } from './filmes.repository';
import { FilmesService } from './filmes.service';
import { FilmesController } from './filmes.controller';

@Module({
  controllers: [FilmesController],
  providers: [FilmesRepository, FilmesService],
})
export class FilmesModule {}
