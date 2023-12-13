import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { hash } from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, grupoId } = body;

    if (!name || !email || !password || !grupoId) {
      return new NextResponse('Falta información del usuario', { status: 400 });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse('El usuario ya existe', { status: 400 });
    }

    // Verificar si ya existe un usuario con ese email
    const existingEmail = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return new NextResponse('El email ya está en uso', { status: 400 });
    }

    // Hashear la contraseña
    const hashpassword = await hash(password);

    // Crear el usuario
    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        password: hashpassword,
        grupoId,
      },
    });

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.error('[USUARIOS_POST]', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}
