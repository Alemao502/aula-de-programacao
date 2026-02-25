import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  listarTodos() {
    return this.usersService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usersService.buscarPorId(Number(id));
  }

  @Post()
  criar(@Body() body: any) {
    return this.usersService.criar(body);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() body: any) {
    return this.usersService.atualizar(Number(id), body);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.usersService.remover(Number(id));
  }
}
