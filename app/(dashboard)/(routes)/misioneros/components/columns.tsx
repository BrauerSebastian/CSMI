'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type MisioneroColumn = {
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
  grupoId: string;
  salidaId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<MisioneroColumn>[] = [
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
