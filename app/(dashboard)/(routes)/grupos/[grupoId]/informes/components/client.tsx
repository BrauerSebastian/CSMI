'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useModal } from '@/hooks/use-modal-store';

import { InformeColumn, columns } from './columns';

interface InformeClientProps {
  data: InformeColumn[];
}

export const InformeClient: React.FC<InformeClientProps> = ({ data }) => {
  const { onOpen } = useModal();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Informes (${data.length})`}
          description="Administra los informes del grupo"
        />
        <div className="space-x-2">
          <Button onClick={() => onOpen('crearInforme')}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Informe
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
