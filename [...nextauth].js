import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.supnu3m7f9klool8jivcdmb7k2fhukcu,
      clientSecret: process.env.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,
    }),
  ],
};

export default NextAuth(options);
