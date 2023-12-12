import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      apellido,
      email,
      numeroAlumno,
      tipoDocumento,
      numeroDocumento,
      edad,
      carrera,
      numeroTelefono,
    } = body;

    if (!name) {
      return new NextResponse('Nombre del misionero es necesario', {
        status: 400,
      });
    }

    if (!apellido) {
      return new NextResponse('Apellido del misionero es necesario', {
        status: 400,
      });
    }

    if (!email) {
      return new NextResponse('Email es necesario', { status: 400 });
    }

    if (!numeroAlumno) {
      return new NextResponse('Numero de alumno es necesario', { status: 400 });
    }

    if (!tipoDocumento) {
      return new NextResponse('Tipo de documento es necesario', {
        status: 400,
      });
    }

    if (!numeroDocumento) {
      return new NextResponse('Numero de documento es necesario', {
        status: 400,
      });
    }

    const misioneros = await prismadb.misionero.create({
      data: {
        name,
        apellido,
        email,
        numeroAlumno,
        tipoDocumento,
        numeroDocumento,
        edad,
        carrera,
        numeroTelefono,
      },
    });

    return NextResponse.json(misioneros);
  } catch (error) {
    console.log('[MISIONEROS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const misioneros = await prismadb.misionero.findMany(); // Obtener la lista de misioneros

    return NextResponse.json(misioneros);
  } catch (error) {
    console.error('[MISIONEROS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
