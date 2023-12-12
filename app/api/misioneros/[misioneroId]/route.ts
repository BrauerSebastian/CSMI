import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    {params}: {params: {misioneroId: string}},
){
    try {
        const body = await req.json();

        const { name, apellido, email, numeroAlumno, tipoDocumento, numeroDocumento, edad, carrera, numeroTelefono  } = body;

        if (!name) {
            return new NextResponse("Nombre del misionero es necesario", { status: 400 });
          }
      
          if (!apellido) {
            return new NextResponse("Apellido del misionero es necesario", { status: 400 });
          }
      
          if (!email) {
            return new NextResponse("Email es necesario", { status: 400 });
          }
      
          if (!numeroAlumno) {
            return new NextResponse("Numero de alumno es necesario", { status: 400 });
          }
      
          if (!tipoDocumento) {
            return new NextResponse("Tipo de documento es necesario", { status: 400 });
          }
      
          if (!numeroDocumento) {
            return new NextResponse("Numero de documento es necesario", { status: 400 });
          }

        if(!params.misioneroId){
            return new NextResponse("Misionero Id es necesario", {status: 400})
        }

        const misionero = await prismadb.misionero.updateMany({
            where: {
                id: params.misioneroId,
            }, 
            data: {
                name, 
                apellido,
                email, 
                numeroAlumno,
                tipoDocumento,
                numeroDocumento,
                edad,
                carrera,
                numeroTelefono
            }
        })

        return NextResponse.json(misionero); 

    } catch (error) {
        console.log('[MISIONERO_PATCH]', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {misioneroId: string}}
){
    try{
        if(!params.misioneroId){
            return new NextResponse("Id del misionero es necesario", {status: 400});
        }

        const misionero = await prismadb.misionero.deleteMany({
            where: {
                id: params.misioneroId, 
            }
        });

        return NextResponse.json(misionero);

    }catch(error){
        console.log("MISIONERO_DELETE", error);
        return new NextResponse("Internal error", {status: 500});
    }
}
