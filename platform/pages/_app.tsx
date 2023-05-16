import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import QueryWrapper from "@/layouts/QeryWrapper";
import Heder from "@/components/Heder";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryWrapper>
      <Heder />
      <Component {...pageProps} />
      <Toaster position="top-center" />
      <Footer />
    </QueryWrapper>
  );
}
