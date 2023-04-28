import '@/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";
import 'react-tooltip/dist/react-tooltip.css'
import { Provider as RWBProvider } from 'react-wrap-balancer';
import cx from 'classnames';
import localFont from '@next/font/local';
import { Inter } from '@next/font/google';
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import Layout from '@/components/layout';
import GlobalContextProvider from 'context/GlobalContext';
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
    <GlobalContextProvider>
      <RWBProvider>
        <div className={cx(sfPro.variable, inter.variable)}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </RWBProvider>
    </GlobalContextProvider>
  );
};

export default MyApp;
