# Criando uma API Node.js com NestJS - Passo a Passo

## 1. Pre-requisitos

```bash
# Verificar se o Node.js esta instalado (v18+)
node -v

# Verificar se o npm esta instalado
npm -v
```

## 2. Instalar o CLI do NestJS

```bash
npm install -g @nestjs/cli
```

## 3. Criar o projeto

```bash
nest new nome-do-projeto
```

Escolha o gerenciador de pacotes (npm, yarn ou pnpm).

## 4. Acessar o diretorio do projeto

```bash
cd nome-do-projeto
```

## 5. Rodar o projeto em modo de desenvolvimento

```bash
npm run start:dev
```

O servidor estara disponivel em `http://localhost:3000`.

## 6. Estrutura do projeto

```
src/
  app.controller.ts    # Controller principal
  app.module.ts        # Modulo raiz
  app.service.ts       # Service principal
  main.ts              # Ponto de entrada da aplicacao
```

## 7. Criar um modulo (CRUD completo)

```bash
# Gerar um recurso completo (module + controller + service + DTOs)
nest generate resource usuarios
```

Escolha **REST API** e confirme a geracao do CRUD.

## 8. Instalar dependencias comuns

### Validacao de dados

```bash
npm install class-validator class-transformer
```

### Banco de dados com TypeORM (PostgreSQL)

```bash
npm install @nestjs/typeorm typeorm pg
```

### Banco de dados com Prisma (alternativa)

```bash
npm install prisma @prisma/client
npx prisma init
```

### Variaveis de ambiente

```bash
npm install @nestjs/config
```

## 9. Configurar validacao global

No arquivo `src/main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

## 10. Configurar banco de dados (TypeORM)

No arquivo `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'meu_banco',
      autoLoadEntities: true,
      synchronize: true, // desabilitar em producao
    }),
  ],
})
export class AppModule {}
```

## 11. Criar uma Entity

Arquivo `src/usuarios/entities/usuario.entity.ts`:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;
}
```

## 12. Criar DTOs com validacao

Arquivo `src/usuarios/dto/create-usuario.dto.ts`:

```typescript
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  senha: string;
}
```

## 13. Implementar o Service

Arquivo `src/usuarios/usuarios.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  create(dto: CreateUsuarioDto) {
    const usuario = this.usuarioRepo.create(dto);
    return this.usuarioRepo.save(usuario);
  }

  findAll() {
    return this.usuarioRepo.find();
  }

  findOne(id: number) {
    return this.usuarioRepo.findOneBy({ id });
  }

  async update(id: number, dto: Partial<CreateUsuarioDto>) {
    await this.usuarioRepo.update(id, dto);
    return this.usuarioRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.usuarioRepo.delete(id);
  }
}
```

## 14. Implementar o Controller

Arquivo `src/usuarios/usuarios.controller.ts`:

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.create(dto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateUsuarioDto>) {
    return this.usuariosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
```

## 15. Configurar o Module do recurso

Arquivo `src/usuarios/usuarios.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
```

## 16. Adicionar Swagger (documentacao da API)

```bash
npm install @nestjs/swagger
```

No `src/main.ts`:

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Minha API')
    .setDescription('Documentacao da API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
```

Acesse a documentacao em `http://localhost:3000/api/docs`.

## 17. Habilitar CORS

No `src/main.ts`:

```typescript
app.enableCors();
```

## 18. Comandos uteis

```bash
# Rodar em desenvolvimento (com hot reload)
npm run start:dev

# Rodar testes
npm run test

# Rodar testes e2e
npm run test:e2e

# Build para producao
npm run build

# Rodar em producao
npm run start:prod

# Gerar modulo
nest generate module nome

# Gerar controller
nest generate controller nome

# Gerar service
nest generate service nome

# Gerar recurso completo (CRUD)
nest generate resource nome
```
