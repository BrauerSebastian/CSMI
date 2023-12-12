'use client';

import { ROLE } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type UsuarioColumn = {
  id: string;
  name: string;
  email: string;
  grupoId: string;
  grupo: string;
  password: string;
  userRole: ROLE;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<UsuarioColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'grupo',
    header: 'Grupo Misionero',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction usuario={row.original} />,
  },
];
