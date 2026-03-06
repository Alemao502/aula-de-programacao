import { login, forgotPassword, resetPassword, getCurrentUser } from '../services/authService.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const result = await login(email, password);

    if (!result.success) {
      return res.status(401).json({ error: result.error });
    }

    res.json({
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const result = await forgotPassword(email);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({ message: result.message });
  } catch (error) {
    console.error('Erro no forgot password:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token e nova senha são obrigatórios' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    const result = await resetPassword(token, newPassword);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.json({ message: result.message });
  } catch (error) {
    console.error('Erro no reset password:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getMeController = async (req, res) => {
  try {
    const result = await getCurrentUser(req.user.id);

    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }

    res.json({ user: result.user });
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
