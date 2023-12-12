'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import MainNav from '@/components/user/MainNav';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

interface NavbarUserProps {
  data: String | undefined;
}

const NavbarUser: React.FC<NavbarUserProps> = ({ data }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button className="cursor-pointer" variant="outline">
          {data}
        </Button>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="outline">
                {/* {session?.user?.name} */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
