'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { MoreHorizontal, Trash } from 'lucide-react';
import { MisioneroColumn } from './columns';

interface CellActionProps {
  data: MisioneroColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { grupoId } = useParams();

  const { onClose } = useModal();

  const [loading, setLoading] = useState(false);
  const [removedMissionary, setRemovedMissionary] = useState(null);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchGroupName = async () => {
      try {
        const response = await axios.get(`/api/grupos/${grupoId}`);
        setGroupName(response.data.name);
      } catch (error) {
        console.error('Error fetching group name:', error);
      }
    };

    fetchGroupName();
  }, [grupoId]);

  const onDelete = async () => {
    try {
      await axios.patch(`/api/grupos/${grupoId}`, {
        name: groupName,
        disconnectMisionero: data.id,
      });

      setRemovedMissionary(data.id);

      router.refresh();

      toast.success('Misionero eliminado');
    } catch (error) {
      console.error('Error removing missionary:', error);
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
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4 " />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
