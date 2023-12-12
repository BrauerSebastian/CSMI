'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  userRole: z.string().optional(),
  grupoId: z.string().optional(),
});

export const EditarUsuarioModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'editarUsuario';
  const { usuario } = data;

  const [grupos, setGrupos] = useState<any[]>([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get('/api/grupos');
        setGrupos(response.data);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
        console.error('Detalles del error:', error.response);
      }
    };

    fetchGrupos();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      userRole: 'USER',
      grupoId: '',
    },
  });

  useEffect(() => {
    if (usuario) {
      form.setValue('name', usuario.name);
      form.setValue('email', usuario.email);
      form.setValue('grupoId', usuario.grupoId);
      form.setValue('password', usuario.password);
    }
  }, [usuario, form]);

  useEffect(() => {
    const selectedGrupoId = form.watch('grupoId');

    if (form.getValues('grupoId') !== selectedGrupoId) {
      form.setValue('grupoId', selectedGrupoId);
    }
  }, [form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/usuarios/${usuario?.id}`, values);

      form.reset();

      router.refresh();
      toast.success('Usuario editado correctamente.');
      onClose();
    } catch (error: any) {
      toast.error('Algo ha ido mal.');
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Crea un nuevo grupo misionero
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Crea un nuevo grupo misionero
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full py-8 px-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Nombre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="email@uap.edu.ar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grupoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo Misionero</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecciona el grupo al que pertenece"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {grupos.map((grupo) => (
                          <SelectItem key={grupo.id} value={grupo.id}>
                            {grupo.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Contraseña"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading} className="ml-auto" type="submit">
                Actualizar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
