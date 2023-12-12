import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { salidaId: string } }
) {
  try {
    const body = await req.json();

    const { name, lugar, fecha, descripcion, misioneroId } = body;

    if (!name) {
      return new NextResponse('El Nombre de la salida es necesario', {
        status: 400,
      });
    }
    if (!lugar) {
      return new NextResponse('El lugar de la salida es necesario', {
        status: 400,
      });
    }
    if (!fecha) {
      return new NextResponse('La fecha de la salida es necesaria', {
        status: 400,
      });
    }
    if (!descripcion) {
      return new NextResponse('La descripción de la salida es necesaria', {
        status: 400,
      });
    }
    if (!misioneroId) {
      return new NextResponse('misioneroId es necesario', {
        status: 400,
      });
    }

    const salida = await prismadb.salida.update({
      where: {
        id: params.salidaId,
      },
      data: {
        name,
        descripcion,
        lugar,
        fecha,
        misioneros: {
          connect: misioneroId ? [{ id: misioneroId }] : undefined,
        },
      },
    });

    return NextResponse.json(salida);
  } catch (error) {
    console.error('[SALIDA_PATCH]', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { salidaId: string } }
) {
  try {
    if (!params.salidaId) {
      return new NextResponse('Id de la salida es necesario', { status: 400 });
    }

    const salida = await prismadb.salida.deleteMany({
      where: {
        id: params.salidaId,
      },
    });

    return NextResponse.json(salida);
  } catch (error) {
    console.log('SALIDA_DELETE', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { salidaId: string } }
) {
  try {
    if (!params.salidaId) {
      return new NextResponse('Id de la salida es necesario', { status: 400 });
    }

    const salida = await prismadb.salida.findUnique({
      where: {
        id: params.salidaId,
      },
      include: {
        misioneros: true,
      },
    });

    if (!salida) {
      return new NextResponse('Salida no encontrada', { status: 404 });
    }

    return NextResponse.json(salida);
  } catch (error) {
    console.error('SALIDA_GET', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}