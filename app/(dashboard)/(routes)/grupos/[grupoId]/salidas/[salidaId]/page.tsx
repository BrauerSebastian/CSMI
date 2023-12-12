import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { MisioneroClientSalida } from './components/client';
import { MisioneroColumnSalida } from './components/columns';

const MisionerosSalidasPage = async ({
  params,
}: {
  params: {
    salidaId: string;
  };
}) => {
  const misioneros = await prismadb.misionero.findMany({
    where: {
      salidaId: params.salidaId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedMisioneroSalida: MisioneroColumnSalida[] = misioneros.map(
    (item) => ({
      id: item.id,
      name: item.name,
      apellido: item.apellido,
      email: item.email,
      numeroAlumno: item.numeroAlumno,
      edad: item.edad,
      tipoDocumento: item.tipoDocumento,
      numeroDocumento: item.numeroDocumento,
      carrera: item.carrera,
      numeroTelefono: item.numeroTelefono,
      salidaId: item.salidaId,
      createdAt: format(item.createdAt, 'MM/dd/yyyy'),
      updatedAt: format(item.updatedAt, 'MM/dd/yyyy'),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <MisioneroClientSalida data={formattedMisioneroSalida} />
      </div>
    </div>
  );
};

export default MisionerosSalidasPage;
