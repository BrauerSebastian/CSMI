import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

const { hash } = require('credentials');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password, grupoId } = body;

    if (!name) {
      return new NextResponse('Nombre del usuario es necesario', {
        status: 400,
      });
    }
    if (!email) {
      return new NextResponse('El email del usuario es necesario', {
        status: 400,
      });
    }
    if (!password) {
      return new NextResponse('La contraseña es necesaria', { status: 400 });
    }

    if (!grupoId) {
      return new NextResponse('El grupo del usuario es necesario', {
        status: 400,
      });
    }

    const exists = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exists) {
      return new NextResponse('El usuario ya existe', { status: 400 });
    }

    const hashpassword = await hash(password);

    const users = await prismadb.user.create({
      data: {
        name,
        email,
        password: hashpassword,
        grupoId,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log('[USUARIOS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
