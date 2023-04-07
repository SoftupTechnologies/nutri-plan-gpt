import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/pagination';

import { Analytics } from '@vercel/analytics/react';
import { Provider as RWBProvider } from 'react-wrap-balancer';
import cx from 'classnames';
import localFont from '@next/font/local';
import { Inter } from '@next/font/google';

import HomeContextProvider from '@/components/home/Context/HomeContext';

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ErrorFallback: React.FC<{ error: { message: string; }; resetErrorBoundary: VoidFunction; }> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const MyApp: React.FC<AppProps<{ session: Session; }>> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <HomeContextProvider>
      <RWBProvider>
        <div className={cx(sfPro.variable, inter.variable)}>
          <Component {...pageProps} />
        </div>
      </RWBProvider>
      <Analytics />
    </HomeContextProvider>
  );
};

export default MyApp;
