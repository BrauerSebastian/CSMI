'use client';

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

const BuscarMisinoeros = () => {
  const router = useRouter();
  const { grupoId } = useParams();
  const { onClose } = useModal();

  const [misioneros, setMisioneros] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchMisioneros = async () => {
      const response = await fetch('/api/misioneros');
      const data = await response.json();

      setMisioneros(data);
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
    fetchGroupName();
  }, [grupoId]);

  const handleAgregarMisionero = async (misioneroId) => {
    try {
      await axios.patch(`/api/grupos/${grupoId}`, {
        name: groupName,
        misioneroId,
      });

      router.refresh();
      toast.success('Misionero agregado');

      onClose();
    } catch (error) {
      toast.error('Algo ha ido mal al agregar el misionero');
    }
  };

  return (
    <Command className="p-4 rounded-lg">
      <CommandInput
        className="border rounded p-2"
        placeholder="Busca un misionero"
      />
      <CommandList className="mt-4">
        <CommandEmpty className="text-red-500">No se encuentran</CommandEmpty>
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
export default BuscarMisinoeros;
