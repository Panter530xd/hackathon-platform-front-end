import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import QueryWrapper from "@/layouts/QeryWrapper";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Layout from "@/layouts/FontProject";
import { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { DashboardProvider } from "../context/DashboardContext";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  initialSession: Session;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryWrapper>
        <DashboardProvider>
          <Layout>
            {getLayout(<Component {...pageProps} />)}
            <Toaster position="top-center" />
          </Layout>
        </DashboardProvider>
      </QueryWrapper>
    </SessionContextProvider>
  );
}
