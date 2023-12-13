import prismadb from '@/lib/prismadb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { hash as generateHash, verify as verifyHash } from 'credentials';

export const runtime = 'nodejs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
      
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;

        // Generar un hash de la contraseña ingresada
        const hashedPassword = generateHash(credentials.password);

        // Verificar si el hash generado coincide con el hash almacenado
        const isValid = verifyHash(hashedPassword, user.password);

        if (!isValid) return null;
      
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.userRole,
          groupId: user.grupoId,
        } as any;
      },
    }),
  ],


  callbacks: {
    jwt: async ({ token, user }) => {
      try {
        if (user) {
          return {
            ...token,
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            groupId: user.groupId,
          };
        }
        return token;
      } catch (error) {
        console.error('Error en callback jwt:', error);
        throw error;
      }
    },

    session: ({ session, token }) => {
      try {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            email: token.email,
            role: token.role,
            groupId: token.grupoId,
          },
        };
      } catch (error) {
        console.error('Error en callback session:', error);
        throw error;
      }
    },
  }
};
  const handler = NextAuth(authOptions);

  export { handler as GET, handler as POST };
