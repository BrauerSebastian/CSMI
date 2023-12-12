import { Grupo, Informe, Misionero, Salida, User } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | 'createGrupo'
  | 'editarGrupo'
  | 'crearMisionero'
  | 'editarMisionero'
  | 'añadirMisionero'
  | 'crearUsuario'
  | 'editarUsuario'
  | 'crearInforme'
  | 'editarInforme'
  | 'editarSalida'
  | 'crearSalida'
  | 'agregarMisionero'
  | 'agregarMisinoeroSalida';

interface ModalData {
  grupo?: Grupo | undefined;
  misionero?: Misionero | undefined;
  usuario?: User | undefined;
  informe?: Informe | undefined;
  salida?: Salida | undefined;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => {
    console.log('Abriendo modal de tipo:', type);
    console.log('Datos asociados:', data);
    set({ type, isOpen: true, data });
  },
  onClose: () => set({ type: null, isOpen: false }),
}));