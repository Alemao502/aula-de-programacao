import { Injectable } from '@nestjs/common';
import { Usuario, CriarUsuarioDto, AtualizarUsuarioDto } from './users.interfaces';

@Injectable()
export class UsersRepository {
  private usuarios: Usuario[] = [];
  private proximoId = 1;

  listarTodos(): Usuario[] {
    return this.usuarios;
  }

  buscarPorId(id: number): Usuario | undefined {
    return this.usuarios.find((u) => u.id === id);
  }

  buscarPorEmail(email: string): Usuario | undefined {
    return this.usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  }

  criar(dados: CriarUsuarioDto): Usuario {
    const novoUsuario: Usuario = {
      id: this.proximoId++,
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  atualizar(usuario: Usuario, dados: AtualizarUsuarioDto): Usuario {
    if (dados.nome !== undefined) usuario.nome = dados.nome;
    if (dados.avatar !== undefined) usuario.avatar = dados.avatar;

    usuario.atualizadoEm = new Date();
    return usuario;
  }

  remover(id: number): Usuario | undefined {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    const [removido] = this.usuarios.splice(index, 1);
    return removido;
  }
}
