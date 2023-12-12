'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type GrupoColumn = {
  id: string;
  name: string;
  misioneroId: string;
  userId: string;
  informeId: string;
  updatedAt: Date;
  createdAt: Date;
};

export const columns: ColumnDef<GrupoColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction grupo={row.original} />,
  },
];
