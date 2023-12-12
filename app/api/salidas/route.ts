import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, lugar, fecha, descripcion, grupoId } = body;

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
    if (!grupoId) {
      return new NextResponse('GrupoId es necesario', {
        status: 400,
      });
    }

    const salida = await prismadb.salida.create({
      data: {
        name,
        lugar,
        fecha,
        descripcion,
        grupoId,
      },
    });

    return NextResponse.json(salida);
  } catch (error) {
    console.log('[SALIDAS_POST]', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const salidas = await prismadb.salida.findMany();

    return NextResponse.json(salidas);
  } catch (error) {
    console.error('[SALIDAS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
