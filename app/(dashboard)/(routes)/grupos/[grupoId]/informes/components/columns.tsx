'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type InformeColumn = {
  id: string;
  name: string;
  descripcion: string;
  fecha: string;
  grupoId: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<InformeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Titulo',
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction informe={row.original} />,
  },
];
