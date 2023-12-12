import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { UserClient } from './components/client';
import { UsuarioColumn } from './components/columns';

const GruposPage = async () => {
  const users = await prismadb.user.findMany({
    include: {
      grupo: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedUsuario: UsuarioColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    grupoId: item?.grupoId,
    grupo: item.grupo?.name,
    userRole: item.userRole,
    password: item.password,
    createdAt: format(item.createdAt, 'MM/dd/yyyy'),
    updatedAt: format(item.updatedAt, 'MM/dd/yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <UserClient data={formattedUsuario} />
      </div>
    </div>
  );
};

export default GruposPage;
