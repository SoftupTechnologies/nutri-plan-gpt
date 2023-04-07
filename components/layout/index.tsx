import Image from "next/image";
import Link from "next/link";
import { useContext, ReactNode } from "react";
import cn from "classnames";

import Meta from "./meta";
import { GlobalContext } from "context/GlobalContext";

interface Props {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ meta, children }) => {
  const { modalIsOpen } = useContext(GlobalContext);

  return (
    <>
      <Meta {...meta} />
      <div
        className={`header-navigation "bg-white/0" z-30 mx-auto h-16 w-4/5 pt-4 transition-all`}
      >
        <header className="flex h-16 w-full items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image src="/logo.svg" alt="logo" width="370" height="60" />
          </Link>
        </header>
      </div>
      <main className="mx-auto flex min-h-screen flex-col items-center p-4 md:p-8">
        {children}
      </main>
      <footer
        className={cn(
          "sm:h-15 bottom-0 mx-auto mx-auto flex h-max w-4/5 flex-col items-center justify-between border-t border-gray-500  pt-4 text-center sm:mb-0 sm:flex-row sm:pt-0 ",
          modalIsOpen ? "-z-50 hidden" : "block",
        )}
      >
        <div className="py-4 text-gray-500">
          Powered by{" "}
          <a
            className="font-bold underline-offset-2 transition hover:text-gray-300 hover:underline"
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
            className="font-bold underline-offset-2 transition hover:text-gray-300 hover:underline"
            target="_blank"
            rel="noreferrer"
            href="https://softup.co/"
          >
            NextJS
          </a>
          ,
          <a
            className="font-bold underline-offset-2 transition hover:text-gray-300 hover:underline"
            target="_blank"
            rel="noreferrer"
            href="https://softup.co/"
          >
            TailwindCSS
          </a>{" "}
          and
          <a
            className="font-bold underline-offset-2 transition hover:text-gray-300 hover:underline"
            target="_blank"
            rel="noreferrer"
            href="https://softup.co/"
          >
            {" "}
            Vercel
          </a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
