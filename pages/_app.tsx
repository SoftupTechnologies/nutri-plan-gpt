import '@/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";

import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { Provider as RWBProvider } from 'react-wrap-balancer';
import cx from 'classnames';
import localFont from '@next/font/local';
import { Inter } from '@next/font/google';

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { HomeContext, HomeContextInterface } from '@/components/home/Context/HomeContext';
import { useState } from 'react';
const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [modalIsOpen,setModalIsOpen]=useState(false)
  const initialContextValue:HomeContextInterface={modalIsOpen,setModalIsOpen}
  return (

    <HomeContext.Provider value={initialContextValue}>
      <RWBProvider>
        <div className={cx(sfPro.variable, inter.variable)}>
          <Component {...pageProps} />
        </div>
      </RWBProvider>
      <Analytics/>
      </HomeContext.Provider>

    
  );
}
