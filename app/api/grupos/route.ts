import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Nombre del grupo es necesario", { status: 400 });
    }

    const grupo = await prismadb.grupo.create({
      data: {
        name,
      }
    });
  
    return NextResponse.json(grupo);
  } catch (error) {
    console.log('[GRUPOS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const grupos = await prismadb.grupo.findMany(); // Obtener la lista de grupos

    return NextResponse.json(grupos);
  } catch (error) {
    console.error('[GRUPOS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};