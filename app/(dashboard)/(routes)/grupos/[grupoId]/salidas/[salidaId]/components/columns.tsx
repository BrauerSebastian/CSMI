'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type MisioneroColumnSalida = {
  id: string;
  name: string;
  apellido: string;
  email: string;
  numeroAlumno: string;
  edad: string;
  tipoDocumento: string;
  numeroDocumento: string;
  carrera: string;
  numeroTelefono: string;
  salidaId: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<MisioneroColumnSalida>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'apellido',
    header: 'Apellido',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'numeroAlumno',
    header: 'Número Alumno',
  },
  {
    accessorKey: 'numeroDocumento',
    header: 'Número Documento',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction misionero={row.original} />,
  },
];
