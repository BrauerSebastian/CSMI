'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useModal } from '@/hooks/use-modal-store';

import { GrupoColumn, columns } from './columns';

interface GrupoClientProps {
  data: GrupoColumn[];
}

export const GrupoClient: React.FC<GrupoClientProps> = ({ data }) => {
  const { onOpen } = useModal();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Grupos (${data.length})`}
          description="Administra el grupo misionero"
        />

        <Button onClick={() => onOpen('createGrupo')}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
