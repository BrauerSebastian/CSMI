import axios from 'axios';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';

import { MisioneroColumnSalida } from './columns';

interface CellActionProps {
  misionero: MisioneroColumnSalida;
}

export const CellAction: React.FC<CellActionProps> = ({ misionero }) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [asistenciaTomada, setAsistenciaTomada] = useState(() => {
    const savedAsistencia = localStorage.getItem('asistenciaTomada');
    return savedAsistencia ? JSON.parse(savedAsistencia) : false;
  });

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/misioneros/${misionero.id}`);
      router.refresh();
      toast.success('Misionero eliminado.');
    } catch (error) {
      toast.error('Algo ha ido mal.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleAsistenciaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAsistenciaTomada(isChecked);
    localStorage.setItem('asistenciaTomada', JSON.stringify(isChecked));
  };

  useEffect(() => {
    const savedAsistencia = localStorage.getItem('asistenciaTomada');
    if (savedAsistencia !== null) {
      setAsistenciaTomada(JSON.parse(savedAsistencia));
    }
  }, []);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center">
        <Checkbox
          checked={asistenciaTomada}
          onChange={handleAsistenciaChange}
          label="Tomar asistencia"
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
              onClick={() => onOpen('editarMisionero', { misionero })}
            >
              <Edit className="mr-2 h-4 w-4 " />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4 " />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
