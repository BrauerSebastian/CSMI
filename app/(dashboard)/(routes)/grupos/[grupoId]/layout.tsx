import prismadb from '@/lib/prismadb';

import GrupoSidebar from './_components/grupo-sidebar';

export default async function DashboardLayout({
  children,
  params,
}: {
  params: { grupoId: string };
  children: React.ReactNode;
}) {
  const grupos = await prismadb.grupo.findUnique({
    where: {
      id: params.grupoId,
    },
  });

  return (
    <div className="h-full">
      <div className="hidden md:flex w-60 z-20 fixed h-full">
        <GrupoSidebar name={grupos.name} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
