'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const Sidebar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/grupos/${params.grupoId}/grupo/misioneros`,
      label: 'Misioneros',
      active: pathname === `/grupos/${params.grupoId}/misioneros`,
    },
    {
      href: `/grupos/${params.grupoId}/grupo/salidas`,
      label: 'Salidas',
      active: pathname === `/grupos/${params.grupoId}/salidas`,
    },
    {
      href: `/grupos/${params.grupoId}/grupo/usuarios`,
      label: 'Usuarios',
      active: pathname === `/grupos/${params.grupoId}/usuarios`,
    },
    {
      href: `/grupos/${params.grupoId}/grupo/informes`,
      label: 'Informes',
      active: pathname === `/grupos/${params.grupoId}/informes`,
    },
  ];
  return (
    <div className="h-screen grid grid-cols-5">
      <div className="grid-span-1 border-x-[1px] border-neutral-200">
        <nav className={cn('py-4')}>
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary block py-4 px-4',
                    route.active
                      ? 'text-black dark:text-white'
                      : 'text-muted-foreground'
                  )}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
