'use client';

import { Button } from '@/components/ui/button';
import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn()} variant="ghost">
      Iniciar Sesión
    </Button>
  );
};

export const LogOutButton = () => {
  return (
    <Button onClick={() => signOut()} variant="destructive">
      Cerrar Sesión
    </Button>
  );
};
