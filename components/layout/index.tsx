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
    <div className="mx-auto min-h-full w-full p-2  sm:w-4/5 sm:p-0">
      <div
        className={`top-0 w-full  "bg-white/0" z-30 transition-all`}
      >
        <header className="flex h-16 w-full items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="40"
              height="40"
              className="mr-2 rounded-sm"
            ></Image>
            <h1 className="ml-2 text-xl font-bold tracking-tight text-section-title sm:text-3xl">
              NutriHealthGPT
            </h1>
          </Link>
        </header>
      </div>
      <main className="flex w-full flex-col items-center  py-16 min-h-screen" >
        {children}
      </main>
      <footer className="sm:h-15 border-gray-500 bottom-0 mx-auto mt-10 mb-3 flex  h-16 flex-col items-center justify-between border-t px-3 pt-4 text-center sm:mb-0 sm:flex-row sm:pt-0">
        <div className="text-gray-500">
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
          ,and
          <a
            className="hover:text-gray-300 font-bold underline-offset-2 transition hover:underline"
            target="_blank"
            rel="noreferrer"
            href="https://softup.co/"
          >
            Vercel
          </a>
        </div>
      </footer>
    </div>
  </>
);

export default Layout;
