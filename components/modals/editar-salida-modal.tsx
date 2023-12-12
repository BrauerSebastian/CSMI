import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  descripcion: z.string().min(2),
  lugar: z.string().min(2),
  fecha: z.date({
    required_error: 'La fecha es requerida',
  }),
  grupoId: z.string(),
});

export const EditarSalidaModal = () => {
  const { grupoId } = useParams();
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'editarSalida';
  const { salida } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      descripcion: '',
      lugar: '',
      fecha: null,
      grupoId: grupoId,
    },
  });

  useEffect(() => {
    if (salida) {
      form.setValue('name', salida.name);
      form.setValue('descripcion', salida.descripcion);
      form.setValue('lugar', salida.lugar);
      form.setValue('fecha', new Date(salida.fecha));
      form.setValue('grupoId', salida.grupoId);
    }
  }, [salida, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/salidas/${salida?.id}`, values);

      form.reset();

      router.refresh();
      toast.success('Salida actualizada correctamente.');
      onClose();
    } catch (error) {
      toast.error('Algo ha ido mal al actualizar la salida.');
      console.error(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-3xl">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Editar Salida
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Modifica la información necesaria para editar la salida.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full py-8 px-6"
          >
            <div className="flex justify-between">
              <div className="flex-1 flex-col pr-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Nombre de la salida"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Descripción corta"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lugar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lugar</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Lugar de la salida"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de la salida</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border"
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
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
