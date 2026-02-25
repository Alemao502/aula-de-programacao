import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilmesModule } from './filmes/filmes.module';


@Module({
  imports: [UsersModule, FilmesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
