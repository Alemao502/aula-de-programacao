import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prisma = require('../config/database.cjs');
import { generateToken } from '../config/jwt.js';
import { sendEmail } from '../config/email.js';

export const login = async (email, password) => {
  try {
    // Buscar usuário por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    // Verificar se usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Por segurança, não informar se o email existe ou não
      return { success: true, message: 'Se o email existir, você receberá instruções de recuperação' };
    }

    // Gerar token de recuperação
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Salvar token no banco (usando um campo temporário ou criar uma tabela específica)
    // Por simplicidade, vamos usar um campo adicional na tabela user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Enviar email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const html = `
      <h2>Recuperação de Senha</h2>
      <p>Você solicitou a recuperação de senha.</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetUrl}">Redefinir Senha</a>
      <p>Este link expira em 1 hora.</p>
      <p>Se você não solicitou esta recuperação, ignore este email.</p>
    `;

    const emailResult = await sendEmail(email, 'Recuperação de Senha', html);

    if (!emailResult.success) {
      throw new Error('Erro ao enviar email');
    }

    return { success: true, message: 'Email de recuperação enviado' };
  } catch (error) {
    console.error('Erro no forgotPassword:', error);
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    // Buscar usuário pelo token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error('Token inválido ou expirado');
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha e limpar token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password_hash: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { success: true, message: 'Senha atualizada com sucesso' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
