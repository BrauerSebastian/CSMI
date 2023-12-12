'use client';

import Link from 'next/link';
import { Globe2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const session = useSession();

  const isLoggedIn = !!session?.data?.user;
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Link href="/landing">
          <Globe2 className="w-8 h8" />
        </Link>
        <div className="space-x-4 md:block md:w-auto flex iatems-center justify-between w-full">
          <Button size="sm" asChild>
            <Link href="https://desarrolloinstitucional.uap.edu.ar/donate">
              Donaciones
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            {isLoggedIn ? (
              <Link href="/">Dashboard</Link>
            ) : (
              <Link href="/api/auth/signin">Iniciar Sesión</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
