import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import Meta from './meta';

interface Props {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}

const Layout: React.FC<Props> = ({
  meta,
  children,
}) => (
  <>
    <Meta {...meta} />
    <div className={`h-16 header-navigation "bg-white/0" z-30 transition-all w-4/5 mx-auto`}>
      <header className="flex h-16 w-full items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center font-display text-2xl">
          <Image
            src="/logo.svg"
            alt="logo"
            width="300"
            height="60"
          />
        </Link>
      </header>
    </div>
    <main className="flex flex-col items-center p-8 mx-auto" >
      {children}
    </main>
    <footer className="w-4/5 mx-auto sm:h-15 border-gray-500 bottom-0 mx-auto flex h-max flex-col items-center justify-between border-t px-3 pt-4 text-center sm:mb-0 sm:flex-row sm:pt-0">
      <div className="py-4 text-gray-500">
        Powered by{" "}
        <a
          className="hover:text-gray-300 font-bold underline-offset-2 transition hover:underline"
          target="_blank"
          rel="noreferrer"
          href="https://softup.co/"
        >
          Softup Technologies GmbH 🚀
        </a>
      </div>
      <div className="text-gray-500">
        Developed with{" "}
        <a
          className="hover:text-gray-300 font-bold underline-offset-2 transition hover:underline"
          target="_blank"
          rel="noreferrer"
          href="https://softup.co/"
        >
          NextJS
        </a>
        ,
        <a
          className="hover:text-gray-300 font-bold underline-offset-2 transition hover:underline"
          target="_blank"
          rel="noreferrer"
          href="https://softup.co/"
        >
          TailwindCSS
        </a>
        , and
        <a
          className="hover:text-gray-300 font-bold underline-offset-2 transition hover:underline"
          target="_blank"
          rel="noreferrer"
          href="https://softup.co/"
        >
          {" "}  Vercel
        </a>
      </div>
    </footer>
  </>
);

export default Layout;
