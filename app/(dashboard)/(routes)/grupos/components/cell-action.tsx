'use client';

import axios from 'axios';
import { Edit, Link, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AlertModal } from '@/components/modals/alert-modal';
import { useModal } from '@/hooks/use-modal-store';

import { GrupoColumn } from './columns';

interface CellActionProps {
  grupo: GrupoColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ grupo }) => {
  const { onOpen } = useModal();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/grupos/${grupo.id}`);
      router.refresh();
      toast.success('Grupo eliminado.');
    } catch (error) {
      toast.error('Asegurate de haber borrado los misioneros antes.');
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
          <DropdownMenuItem onClick={() => onOpen('editarGrupo', { grupo })}>
            <Edit className="text-black mr-2 h-4 w-4 " />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 " />
            Eliminar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/grupos/${grupo.id}`)}>
            <Link className="mr-2 h-4 w-4 " />
            Entrar al Grupo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
