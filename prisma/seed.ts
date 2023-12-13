import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt'; // Asumiendo que estás utilizando bcrypt para hashear contraseñas

const prisma = new PrismaClient();

async function main() {
  try {
    const password = await hash('test', 12); // Hashea la contraseña 'test' con un nivel de salado de 12

    const user = await prisma.user.upsert({
      where: { email: 'test@test.com' }, // Corregido: quitando la comilla extra al final del correo electrónico
      update: {},
      create: {
        email: 'eze@test.com',
        name: 'Ezequiel',
        password,
        userRole: 'ADMIN',
      },
    });
    console.log({ user });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
