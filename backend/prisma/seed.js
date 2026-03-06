import pkg from '@prisma/client';
import bcrypt from 'bcrypt';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  // Limpar dados antigos (opcional)
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password_hash: hashedPassword,
    },
  });

  console.log('✅ Usuário admin criado:', adminUser.email);

  // Criar clientes de exemplo (Pessoa Física)
  const clientPF = await prisma.client.create({
    data: {
      type: 'PF',
      name: 'João Silva Santos',
      document: '12345678901',
      email: 'joao@example.com',
      phone: '(11) 98765-4321',
      birthday: new Date('1990-05-15'),
      active: true,
    },
  });

  console.log('✅ Cliente PF criado:', clientPF.name);

  // Criar cliente de exemplo (Pessoa Jurídica)
  const clientPJ = await prisma.client.create({
    data: {
      type: 'PJ',
      name: 'Tech Solutions LTDA',
      document: '12345678000190',
      email: 'contato@techsolutions.com',
      phone: '(11) 3456-7890',
      responsible_name: 'Maria Oliveira',
      birthday: new Date('1985-03-22'),
      active: true,
    },
  });

  console.log('✅ Cliente PJ criado:', clientPJ.name);

  // Testar rejeição de CPF/CNPJ duplicado
  try {
    await prisma.client.create({
      data: {
        type: 'PF',
        name: 'Outro Cliente',
        document: '12345678901', // Duplicado
        birthday: new Date('1995-01-01'),
      },
    });
  } catch (error) {
    console.log('✅ Validação de unicidade funcionando: documento duplicado rejeitado');
  }

  console.log('✅ Seed de dados finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
