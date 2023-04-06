import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";
import { Provider as RWBProvider } from 'react-wrap-balancer';
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { useState } from "react";
import Layout from "@/components/layout";
import { GlobalContext, GlobalContextInterface } from "context/GlobalContext";
import { FastingRequestType } from "@/lib/types";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isContentGenerated, setIsContentGenerated] = useState(false);
  const [formValues, setFormValues] = useState<FastingRequestType>({
    ingredients: "",
    fastingType: "16:8",
    weight: 0,
    height: 0,
    targetWeight: 0,
    periodToLoseWeight: 0,
  });
  const initialContextValue: GlobalContextInterface = {
    modalIsOpen,
    setModalIsOpen,
    isContentGenerated,
    setIsContentGenerated,
    formValues,
    setFormValues,
  };
  return (
    <GlobalContext.Provider value={initialContextValue}>
      <RWBProvider>
        <div className={cx(sfPro.variable, inter.variable)}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </RWBProvider>
    </GlobalContext.Provider>
  );
}
