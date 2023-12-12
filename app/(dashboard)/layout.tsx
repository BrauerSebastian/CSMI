import { getServerSession } from 'next-auth';

import Navbar from '@/components/Navbar';
import { Providers } from '@/components/providers/providers';

import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Providers>
        {session?.user?.role === 'ADMIN' && <Navbar />}
        {children}
      </Providers>
    </>
  );
}
