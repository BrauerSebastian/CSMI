'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';

type GrupoSidebarProps = {
  name: string;
};

const GrupoSidebar = ({ name }: GrupoSidebarProps) => {
  const { data: session } = useSession();

  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <div className="p-4">
        <Button
          className="text-rose-600 cursor-pointer"
          variant="outline"
          onClick={() => router.push(`/grupos/${params.grupoId}`)}
        >
          Grupo: {name}
        </Button>
      </div>
      <Separator className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
      <div className="flex flex-col">
        {' '}
        <div className="flex items-start space-x-6 m-2">
          <div className="flex flex-col h-full space-y-5">
            <Link
              className={cn(
                'text-xl text-muted-foreground font-medium transition-colors'
              )}
              href={`/grupos/${params?.grupoId}/misioneros`}
            >
              Misioneros
            </Link>
            <Link
              className={cn(
                'text-xl font-medium text-muted-foreground transition-colors'
              )}
              href={`/grupos/${params?.grupoId}/salidas`}
            >
              Salidas
            </Link>
            <Link
              className={cn(
                'text-xl font-medium text-muted-foreground transition-colors'
              )}
              href={`/grupos/${params?.grupoId}/informes`}
            >
              Informes
            </Link>
          </div>
        </div>
      </div>
      {session?.user?.role !== 'ADMIN' && (
        <div className="flex items-center justify-center align-bottom pt-4 mt-[470px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="cursor-pointer w-full m-2 font-bold"
                variant="outline"
              >
                {session?.user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Salir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default GrupoSidebar;
