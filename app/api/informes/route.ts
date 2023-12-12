import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, descripcion, fecha, grupoId } = body;

    if (!name) {
      return new NextResponse('Nombre de informe es necesario', {
        status: 400,
      });
    }

    if (!descripcion) {
      return new NextResponse('Descripcion de informe es necesaria', {
        status: 400,
      });
    }

    if (!grupoId) {
      return new NextResponse('GrupoId es necesario', {
        status: 400,
      });
    }

    const informe = await prismadb.informe.create({
      data: {
        name,
        descripcion,
        fecha,
        grupoId,
      },
    });

    return NextResponse.json(informe);
  } catch (error) {
    console.log('[INFORME_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const informes = await prismadb.informe.findMany(); 

    return NextResponse.json(informes);
  } catch (error) {
    console.error('[INFORMES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
