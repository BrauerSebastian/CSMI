import axios from 'axios';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useModal } from '@/hooks/use-modal-store';

const BuscarMisinoerosSalida = () => {
  const router = useRouter();
  const { grupoId, salidaId } = useParams();
  const { onClose } = useModal();

  const [misioneros, setMisioneros] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [salidaDetails, setSalidaDetails] = useState({
    name: '',
    descripcion: '',
    lugar: '',
    fecha: '',
    // Otros campos necesarios
  });

  useEffect(() => {
    const fetchMisioneros = async () => {
      try {
        const response = await axios.get('/api/misioneros');
        setMisioneros(response.data);
      } catch (error) {
        console.error('Error fetching misioneros:', error);
      }
    };

    const fetchSalidaDetails = async () => {
      try {
        const response = await axios.get(`/api/salidas/${salidaId}`);
        setSalidaDetails(response.data);
      } catch (error) {
        console.error('Error fetching salida details:', error);
      }
    };

    const fetchGroupName = async () => {
      try {
        const response = await axios.get(`/api/grupos/${grupoId}`);
        setGroupName(response.data.name);
      } catch (error) {
        console.error('Error fetching group name:', error);
      }
    };

    fetchMisioneros();
    fetchSalidaDetails();
    fetchGroupName();
  }, [grupoId, salidaId]);

  const handleAgregarMisionero = async (misioneroId) => {
    try {
      await axios.patch(`/api/salidas/${salidaId}`, {
        misioneroId,
        name: salidaDetails.name,
        descripcion: salidaDetails.descripcion,
        lugar: salidaDetails.lugar,
        fecha: salidaDetails.fecha,
        groupId: grupoId,
        salidaId,
      });

      console.log({
        misioneroId,
        name: salidaDetails.name,
        descripcion: salidaDetails.descripcion,
        lugar: salidaDetails.lugar,
        fecha: salidaDetails.fecha,
        groupId: grupoId,
        salidaId,
      });

      router.refresh();
      toast.success('Misionero agregado correctamente');

      onClose();
    } catch (error) {
      toast.error('Algo ha ido mal al agregar el misionero');
      console.error(error);
    }
  };

  return (
    <Command className="p-4 rounded-lg">
      <CommandInput
        className="border rounded p-2"
        placeholder="Busca un misionero"
      />
      <CommandList className="mt-4">
        {misioneros.length === 0 && (
          <CommandEmpty className="text-red-500">
            No se encuentran misioneros
          </CommandEmpty>
        )}
        {misioneros.map((misionero) => (
          <CommandItem
            key={misionero.id}
            onSelect={() => handleAgregarMisionero(misionero.id)}
            className="flex justify-between cursor-pointer p-2 rounded"
          >
            {misionero.name} {misionero.apellido}
            <Plus className="h-4 w-4" />
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};

export default BuscarMisinoerosSalida;
