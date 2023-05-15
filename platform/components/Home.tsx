"use client";

import Image from "next/image";
import Logo from "../public/img/Frame.png";
import HeroImg from "../public/img/HERO IMAGE 2.png";
import BrainsterLogo from "../public/img/Brainster-Logo 1.png";
import ScandivLogo from "../public/img/LogoSCiDEV 1.png";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Home() {
  const { asPath } = useRouter();

  return (
    <>
      <div className="w-10/12 mx-auto py-10 border-b-2 border-[#0AE47C]">
        <Image
          src={Logo.src}
          alt={"Logo"}
          width={75}
          height={75}
          className="ml-auto mt-7"
        />

        <nav className=" w-8/12 mx-auto">
          <ul className="flex justify-between items-center mt-10">
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
                href="/Blog"
                className={`font-roboto text-lg ${
                  asPath === "/Partnerup"
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
                href="/login"
                className="font-roboto text-lg text-white font-semibold bg-[#0AE47C] py-2 px-7 rounded-lg "
              >
                Log in
              </Link>
            </li>
          </ul>
          <hr className="border-b-1 border-[#8A8787] " />
        </nav>
        <div className="flex justify-between items-center py-10 gap-10 w-8/12 mx-auto ">
          <div className="text-[#0AE47C] font-bold text-5xl leading-normal flex flex-col">
            <h1>
              <br></br> HackMatch<br></br>
            </h1>
            <div>
              <button className="bg-white text-[#0AE47C] py-1 px-2 rounded-lg mt-5 text-lg border-[#0AE47C] border-2">
                Get Update
              </button>
            </div>
          </div>
          <div>
            <Image
              width={1000}
              height={150}
              src={HeroImg.src}
              alt={"Hero Banners"}
              className=" w-[500px] h-auto"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-10 justify-end items-center w-10/12 mx-auto py-10">
        <p>powered by:</p>
        <Image
          src={BrainsterLogo.src}
          width={75}
          height={75}
          alt={"Brainster logo"}
        />
        <Image
          src={ScandivLogo.src}
          width={75}
          height={75}
          alt={"Scandiv logo"}
        />
      </div>
    </>
  );
}
