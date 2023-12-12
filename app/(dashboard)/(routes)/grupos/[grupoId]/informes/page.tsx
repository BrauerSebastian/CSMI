import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { InformeClient } from './components/client';
import { InformeColumn } from './components/columns';

const InformeGrupoPage = async ({
  params,
}: {
  params: {
    grupoId: string;
  };
}) => {
  const informes = await prismadb.informe.findMany({
    where: {
      grupoId: params.grupoId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedInforme: InformeColumn[] = informes.map((item) => ({
    id: item.id,
    name: item.name,
    descripcion: item.descripcion,
    grupoId: item.grupoId,
    fecha: format(new Date(item.fecha), 'MM/dd/yyyy'),
    createdAt: format(new Date(item.createdAt), 'MM/dd/yyyy'),
    updatedAt: format(new Date(item.updatedAt), 'MM/dd/yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <InformeClient data={formattedInforme} />
      </div>
    </div>
  );
};

export default InformeGrupoPage;
