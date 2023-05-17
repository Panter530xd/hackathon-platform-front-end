import Image from "next/image";
import HeroImg from "../../public/img/hero-img.png";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Home() {
  const { asPath } = useRouter();

  return (
    <div className="w-10/12 mx-auto py-5 ">
      <nav className=" w-8/12 mx-auto hidden md:block">
        <ul className="flex justify-between items-center ">
          <li>
            <Link
              href="/"
              className={`font-roboto text-lg ${
                asPath === "/"
                  ? "font-bold text-[#0AE47C] border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`font-roboto text-lg ${
                asPath === "/about"
                  ? "font-bold text-[#0AE47C] border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`font-roboto text-lg ${
                asPath === "/Partnerup"
                  ? "font-bold text-[#0AE47C] border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              Partner Up
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`font-roboto text-lg ${
                asPath === "/blog"
                  ? "font-bold text-[#0AE47C] border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className={`font-roboto text-lg ${
                asPath === "/faq"
                  ? "font-bold text-[#0AE47C] border-b-4 border-[#8A8787]"
                  : ""
              }`}
            >
              FAQ
            </Link>
          </li>
          <li className="mb-5">
            <Link
              href="/admin-login"
              className="font-roboto text-lg text-white font-semibold bg-[#0AE47C] py-2 px-7 rounded-lg "
            >
              Log in
            </Link>
          </li>
        </ul>
        <hr className="border-b-1 border-[#8A8787] " />
      </nav>
      <div className=" md:flex md:flex-row  flex flex-col-reverse justify-between items-center md:py-10 md:gap-10  md:w-8/12 w-11/12 mx-auto">
        <div className="text-[#0AE47C] font-bold md:text-5xl text-3xl md:leading-normal">
          <h1 className="p-0">HackMatch</h1>
          <div className="flex flex-col md:flex-row md:gap-5 gap-2">
            <button className="bg-white text-[#0AE47C] py-1 px-2 rounded-lg md:mt-5 mt-3 text-lg  border-[#0AE47C] border-2">
              Get Update
            </button>
          </div>
        </div>
        <div>
          <Image
            width={1000}
            height={150}
            src={HeroImg}
            alt={"Hero Banners"}
            priority
            className="w-[500px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
