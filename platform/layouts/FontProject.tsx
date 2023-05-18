import { Exo_2 } from "next/font/google";

const exoFont = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-exoFont",
});

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <main {...props} className={`${exoFont.variable} font-roboto`}>
        {children}
      </main>
    </>
  );
}
