import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilmesModule } from './filmes/filmes.module';
import { SeedService } from './seed.service';

@Module({
  imports: [UsersModule, FilmesModule],
  providers: [SeedService],
})
export class AppModule {}
