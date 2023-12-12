'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { useModal } from '@/hooks/use-modal-store';
import { MisioneroColumn, columns } from './columns';

interface MisioneroClientProps {
  data: MisioneroColumn[];
}

export const MisioneroClient: React.FC<MisioneroClientProps> = ({ data }) => {
  const { onOpen } = useModal();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Misioneros (${data.length})`}
          description="Administra los misioneros"
        />
        <Button onClick={() => onOpen('crearMisionero')}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
