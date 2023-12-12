'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { useModal } from '@/hooks/use-modal-store';
import { SalidaColumn, columns } from './columns';

interface SalidaClientProps {
  data: SalidaColumn[];
}

export const SalidaClient: React.FC<SalidaClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const { onOpen } = useModal();


  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Salidas (${data.length})`}
          description="Administra las salidas"
        />
        <div className="space-x-2">
          <Button onClick={() => {
            console.log('Botón "Crear Salida" presionado');
            onOpen('crearSalida');
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Salida
          </Button>
          </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};