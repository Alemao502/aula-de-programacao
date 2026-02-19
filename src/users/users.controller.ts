import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';

// Interface de usuário
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Exemplo de dados em memória
let users: User[] = []


// funcoes gerais
// // exemplo de funcao
// function soma(a, b){
//   return a + b
// }

// const resultado = soma(10,11)

function passwordHasNumber(password:string){
  const numbers = '0123456789'

  for (let i = 0; i < password.length; i++) {
    if (numbers.includes(password[i])) {
      return true
    }
  }
}

function validatePassword(password: string, passwordConfirmation: string){

  const isMatch = password == passwordConfirmation // true ou false
  if(isMatch == false)
    throw new HttpException("As senhas nao conferem.", HttpStatus.CONFLICT)

  if(password.length < 6)
    throw new HttpException("Senha menor que 6", HttpStatus.CONFLICT)

  if(!passwordHasNumber(password))
    throw new HttpException("Senha precisa de pelo menos 1 numero", HttpStatus.CONFLICT)

  return true
}

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
  create(@Body() body: any) {

    // validacoes da regra de negocio

    validatePassword(body.password, body.passwordConfirmation)

    if(body.name == null || body.name == "" )
      throw new HttpException("O nome e obrigatorio", HttpStatus.CONFLICT)

    if(body.email == null || body.email == "")
      throw new HttpException("O email e obrigatorio", HttpStatus.CONFLICT)

    // Grava o usuario no banco de dados
    users.push({
      id: users.length + 1,
      name: body.name,
      email: body.email,
      password: body.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return users;
  }

}
