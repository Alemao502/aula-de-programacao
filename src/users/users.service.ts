import { Injectable, BadRequestException, NotFoundException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Usuario, CriarUsuarioDto, AtualizarUsuarioDto } from './users.interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  listarTodos(): Usuario[] {
    return this.usersRepository.listarTodos();
  }

  buscarPorId(id: number): Usuario {
    const usuario = this.usersRepository.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  criar(dados: CriarUsuarioDto): Usuario {
    if (!dados.nome?.trim())
      throw new BadRequestException('O nome é obrigatório');

    if (!dados.email?.trim())
      throw new BadRequestException('O email é obrigatório');

    this.validarSenha(dados.senha, dados.confirmacaoSenha);

    if (this.usersRepository.buscarPorEmail(dados.email)) {
      throw new ConflictException('Este email já está cadastrado');
    }

    return this.usersRepository.criar({
      nome: dados.nome.trim(),
      email: dados.email.trim().toLowerCase(),
      senha: dados.senha,
      confirmacaoSenha: dados.confirmacaoSenha,
    });
  }

  atualizar(id: number, dados: AtualizarUsuarioDto): Usuario {
    const usuario = this.usersRepository.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dados.nome !== undefined && dados.nome.trim() === '')
      throw new BadRequestException('O nome não pode ser vazio');

    return this.usersRepository.atualizar(usuario, {
      nome: dados.nome?.trim(),
      avatar: dados.avatar?.trim(),
    });
  }

  remover(id: number): { mensagem: string; usuario: Usuario } {
    const removido = this.usersRepository.remover(id);
    if (!removido) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return { mensagem: 'Usuário removido com sucesso', usuario: removido };
  }

  private validarSenha(senha: string, confirmacaoSenha: string): void {
    if (!senha || senha.length < 6)
      throw new UnprocessableEntityException('A senha deve ter pelo menos 6 caracteres');

    if (!this.senhaContemNumero(senha))
      throw new UnprocessableEntityException('A senha deve conter pelo menos 1 número');

    if (senha !== confirmacaoSenha)
      throw new UnprocessableEntityException('As senhas não conferem');
  }

  private senhaContemNumero(senha: string): boolean {
    return /\d/.test(senha);
  }
}
