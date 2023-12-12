import { Globe2 } from 'lucide-react';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Separator } from '@/components/ui/separator';
import InformesFeedPage from './_components/feed';

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
});

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const LandingPage = () => {
  return (
    <div className="flex items-center flex-col">
      <div
        className={cn(
          'flex items-center justify-center flex-col',
          headingFont.className
        )}
      >
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 font-bold">
          Instituto Misionero
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Compartir a Jesús
        </div>
      </div>
      <div
        className={cn(
          'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
          textFont.className
        )}
      >
        Instituto Misionero es una organización de estudiantes de FCS de la
        Universidad Adventista del Plata, formada por 20 grupos misioneros que
        buscan compartir a Jesús.
      </div>
      <InformesFeedPage />
    </div>
  );
};

export default LandingPage;
