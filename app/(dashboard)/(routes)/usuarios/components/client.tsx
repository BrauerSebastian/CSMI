'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { useModal } from '@/hooks/use-modal-store';
import { UsuarioColumn, columns } from './columns';

interface UsuarioProps {
  data: UsuarioColumn[];
}

export const UserClient: React.FC<UsuarioProps> = ({ data }) => {
  const { onOpen } = useModal();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Usuario (${data.length})`}
          description="Administra los usuarios"
        />
        <Button onClick={() => onOpen('crearUsuario')}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
