import { ROLE } from '@prisma/client';
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: ROLE;
    groupId: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    role: ROLE;
    user: User;
    groupId: string;
  }
}
