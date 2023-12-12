'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type SalidaColumn = {
  id: string;
  name: string;
  descripcion: string;
  lugar: string;
  fecha: string;
  grupoId: string;
  misioneroId: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<SalidaColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'lugar',
    header: 'Lugar',
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction salida={row.original} />,
  },
];