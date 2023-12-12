import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { grupoId: string } }
) {
  try {
    const body = await req.json();
    const { name, misioneroId, disconnectMisionero } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!params.grupoId) {
      return new NextResponse('Store Id is required', { status: 400 });
    }

    let data: any = {
      name,
    };

    if (misioneroId) {
      data.misioneros = {
        connect: {
          id: misioneroId,
        },
      };
    }

    if (disconnectMisionero) {
      data.misioneros = {
        disconnect: Array.isArray(disconnectMisionero)
          ? disconnectMisionero.map((id) => ({ id }))
          : [{ id: disconnectMisionero }],
      };
    }

    const grupo = await prismadb.grupo.update({
      where: {
        id: params.grupoId,
      },
      data,
    });

    return NextResponse.json(grupo);
  } catch (error) {
    console.error('[GRUPO_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { grupoId: string } }
) {
  try {
    if (!params.grupoId) {
      return new NextResponse('Id del grupo es necesario', { status: 400 });
    }

    const grupo = await prismadb.grupo.deleteMany({
      where: {
        id: params.grupoId,
      },
    });

    return NextResponse.json(grupo);
  } catch (error) {
    console.log('GRUPO_DELETE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { grupoId: string } }
) {
  try {
    if (!params.grupoId) {
      return new NextResponse('Id del grupo es necesario', { status: 400 });
    }

    const grupo = await prismadb.grupo.findUnique({
      where: {
        id: params.grupoId,
      },
    });

    return NextResponse.json(grupo);
  } catch (error) {
    console.log('GRUPO_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
