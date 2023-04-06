import Image from 'next/image';
import Link from 'next/link';
import { useContext, ReactNode } from 'react';
import cn from 'classnames';

import Meta from './meta';
import { GlobalContext } from 'context/GlobalContext';

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
}) => {
  const { modalIsOpen }=useContext(GlobalContext);
  return(<>
    <Meta {...meta} />
    <div className={`h-16 header-navigation "bg-white/0" z-30 transition-all w-4/5 mx-auto pt-4`}>
      <header className="flex h-16 w-full items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center font-display text-2xl">
          <Image
            src="/logo.svg"
            alt="logo"
            width="370"
            height="60"
          />
        </Link>
      </header>
    </div>
    <main className="flex flex-col items-center p-4 md:p-8 mx-auto" >
      {children}
    </main>
    <footer className={cn("w-4/5 mx-auto sm:h-15 border-gray-500 bottom-0 mx-auto flex h-max flex-col items-center justify-between border-t  pt-4 text-center sm:mb-0 sm:flex-row sm:pt-0 ",modalIsOpen?"blur":"")}>
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
        {" "} and
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
  </>)}


export default Layout;
