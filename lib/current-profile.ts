import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

import prismadb from '@/lib/prismadb';

export const currentProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return null;

  return user;
};
