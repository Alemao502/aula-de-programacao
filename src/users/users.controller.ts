import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';

// Interface de usuário
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Exemplo de dados em memória
let users: User[] = []


@Controller('users')
export class UsersController {
  constructor() {}


  // Listagem de usuários
  @Get()
  findAll() {
    return users;
  }

  // Criação de usuário
  @Post()
  create(@Body() body: { name: string, email: string, avatar: string }) {
    users.push({
      id: users.length + 1,
      name: body.name,
      email: body.email,
      avatar: body.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return users;
  }

}
