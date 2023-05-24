import Footer from "@/components/Footer";
import Heder from "@/components/heder/Heder";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu2 } from "tabler-icons-react";
import { useState } from "react";
type Props = {
  children: React.ReactNode;
};

type DashboardLinkProps = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function DashboardLink({ href, onClick, children }: DashboardLinkProps) {
  const router = useRouter();

  if (href) {
    return (
      <Link
        href={href}
        className={`flex  items-center text-lg ${
          router.pathname === href
            ? " font-semibold text-pink border-b-2 border-pink"
            : ""
        }`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`flex items-center  rounded-lg `}>
      {children}
    </button>
  );
}

export default function DashboardLayout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-dashboard relative">
      <Heder />
      <main className="min-h-screen w-full ">
        <nav>
          <div className=" flex items-center ">
            {/* Show navigation bar on desktop */}
            <div className="hidden md:flex items-center gap-7 md:w-7/12 w-11/12  mx-auto ">
              <DashboardLink href="/dashboard/description">
                Description
              </DashboardLink>
              <DashboardLink href="/dashboard/agenda">Agenda</DashboardLink>
              <DashboardLink href="/dashboard/teams">Teams</DashboardLink>
              <DashboardLink href="/dashboard/statistics">
                Statistics
              </DashboardLink>
              <DashboardLink href="/dashboard/results">Results</DashboardLink>
              <div className="ml-auto">
                <DashboardLink>
                  <div className="bg-orange text-black py-2 px-10 rounded-lg whitespace-nowrap font-semibold">
                    Export as Excel sheet
                  </div>
                </DashboardLink>
              </div>
            </div>

            {/* Show hamburger menu on mobile */}
            <div className="md:hidden">
              {isMenuOpen ? (
                <div className="absolute left-0 top-0 h-full w-full  bg-white z-50">
                  <div className="flex items-center justify-between px-4 py-2">
                    <h3 className="text-xl font-semibold">Menu</h3>
                    <button
                      onClick={toggleMenu}
                      className="text-gray-600 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 p-4">
                    <DashboardLink
                      href="/dashboard/description"
                      onClick={toggleMenu}
                    >
                      Description
                    </DashboardLink>
                    <DashboardLink
                      href="/dashboard/agenda"
                      onClick={toggleMenu}
                    >
                      Agenda
                    </DashboardLink>
                    <DashboardLink href="/dashboard/teams" onClick={toggleMenu}>
                      Teams
                    </DashboardLink>
                    <DashboardLink
                      href="/dashboard/statistics"
                      onClick={toggleMenu}
                    >
                      Statistics
                    </DashboardLink>
                    <DashboardLink
                      href="/dashboard/results"
                      onClick={toggleMenu}
                    >
                      Results
                    </DashboardLink>
                    <div>
                      <DashboardLink>
                        <div
                          className="bg-orange text-black py-2 px-10 rounded-lg whitespace-nowrap font-semibold"
                          onClick={toggleMenu}
                        >
                          Export as Excel sheet
                        </div>
                      </DashboardLink>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={toggleMenu}
                  className="flex items-center rounded-lg absolute top-[70px] left-5"
                >
                  <Menu2 size={30} />
                </button>
              )}
            </div>
          </div>
        </nav>
        <section className="w-full">{children}</section>
      </main>
      <Footer />
    </div>
  );
}
