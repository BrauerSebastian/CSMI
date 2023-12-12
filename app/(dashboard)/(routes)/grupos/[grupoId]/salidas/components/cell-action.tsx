'use client';

import axios from 'axios';
import { Edit, List, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useModal } from '@/hooks/use-modal-store';
import { SalidaColumn } from './columns';

interface CellActionProps {
  salida: SalidaColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ salida }) => {
  const { grupoId } = useParams();
  const { onOpen } = useModal();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/salidas/${salida.id}`);
      router.refresh();
      toast.success('Salida eliminada.');
    } catch (error) {
      toast.error('Algo ha ido mal al eliminar la salida.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem
            //@ts-ignore
            onClick={() => onOpen('editarSalida', { salida })}
          >
            <Edit className="mr-2 h-4 w-4 " />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 " />
            Eliminar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/grupos/${grupoId}/salidas/${salida.id}`)
            }
          >
            <List className="mr-2 h-4 w-4 " />
            Asistencias
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};