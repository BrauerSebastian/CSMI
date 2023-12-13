import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { hash } from 'bcrypt'; // Asumiendo que estás utilizando bcrypt para hashear contraseñas

export async function GET(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  try {
    if (!params?.usuarioId) {
      return new NextResponse('Id del usuario es necesario', { status: 400 });
    }

    const users = await prismadb.user.findMany({
      where: {
        id: params.usuarioId,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('[USUARIOS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  try {
    const body = await req.json();

    const { name, email, password, grupoId } = body;

    if (!name || !email || !password || !grupoId || !params?.usuarioId) {
      return new NextResponse('Faltan datos necesarios', { status: 400 });
    }

    const hashpassword = await hash(password, 10); // Se asume el nivel de salado como 10, ajusta según necesites

    const user = await prismadb.user.updateMany({
      where: {
        id: params.usuarioId,
      },
      data: {
        name,
        email,
        password: hashpassword,
        grupoId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[USER_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { usuarioId: string } }
) {
  try {
    if (!params?.usuarioId) {
      return new NextResponse('Id del usuario es necesario', { status: 400 });
    }

    const user = await prismadb.user.deleteMany({
      where: {
        id: params.usuarioId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('USER_DELETE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
