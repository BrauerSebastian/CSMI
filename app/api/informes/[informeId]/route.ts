import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { informeId: string } }
) {
  try {
    const body = await req.json();

    const { name, descripcion, fecha } = body;

    if (!name) {
      return new NextResponse('Nombre del misionero es necesario', {
        status: 400,
      });
    }

    if (!descripcion) {
      return new NextResponse('Descripcion del misionero es necesario', {
        status: 400,
      });
    }
    if (!params.informeId) {
      return new NextResponse('Informe Id es necesario', { status: 400 });
    }

    const informe = await prismadb.informe.update({
      where: {
        id: params.informeId,
      },
      data: {
        name,
        descripcion,
        fecha,
      },
    });

    return NextResponse.json(informe);
  } catch (error) {
    console.log('[INFORME_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { informeId: string } }
) {
  try {
    if (!params.informeId) {
      return new NextResponse('Id del misionero es necesario', { status: 400 });
    }

    const informe = await prismadb.informe.deleteMany({
      where: {
        id: params.informeId,
      },
    });

    return NextResponse.json(informe);
  } catch (error) {
    console.log('INFORME_DELETE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
