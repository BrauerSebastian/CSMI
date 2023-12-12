'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(2),
  apellido: z.string().min(2),
  email: z.string().email(),
  numeroAlumno: z.string().min(2),
  edad: z.string().min(2).optional(),
  tipoDocumento: z.string().min(2),
  numeroDocumento: z.string().min(2),
  carrera: z.string().min(2),
  numeroTelefono: z.string().min(2).optional(),
});

export const EditarMisioneroModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'editarMisionero';
  const { misionero } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      apellido: '',
      email: '',
      numeroAlumno: '',
      edad: '',
      tipoDocumento: '',
      numeroDocumento: '',
      carrera: '',
      numeroTelefono: '',
    },
  });

  useEffect(() => {
    if (misionero) {
      form.setValue('name', misionero.name);
      form.setValue('apellido', misionero.apellido);
      form.setValue('email', misionero.email);
      form.setValue('numeroAlumno', misionero.numeroAlumno);
      form.setValue('edad', misionero.edad);
      form.setValue('tipoDocumento', misionero.tipoDocumento);
      form.setValue('numeroDocumento', misionero.numeroDocumento);
      form.setValue('carrera', misionero.carrera);
      form.setValue('numeroTelefono', misionero.numeroTelefono);
    }
  }, [misionero, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/misioneros/${misionero?.id}`, values);

      form.reset();

      router.refresh();
      toast.success('Misionero editado correctamente');
      onClose();
    } catch (error) {
      toast.error('Algo ha ido mal al editar el misionero');
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-5xl">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Crear Misionero
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Añade la información necesaria para crear un nuevo misionero.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full py-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Misionero</FormLabel>
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
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Apellido"
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
                name="numeroAlumno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nº Alumno</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Número de alumno"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="edad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edad</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Edad del misionero"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipoDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Documento</FormLabel>
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
                            placeholder="Selecciona un tipo de documento"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DNI">DNI</SelectItem>
                        <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nº Documento</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Número de documento"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carrera"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carrera</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Qué carrera estudia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroTelefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nº Telefono</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="+xx xxx xxx xxxx"
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
                Editar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
