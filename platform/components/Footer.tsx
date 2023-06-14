import BrainsterLogo from "../public/img/brainster.png";
import ScandivLogo from "../public/img/scidev.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto ">
      <div className="flex md:gap-10 gap-5 justify-end items-center w-11/12 max-w-screen-xl mx-auto py-10 border-t-2 border-[#0AE47C] mt-auto">
        <p className="md:text-sm text-xs whitespace-nowrap">powered by:</p>
        <Image
          src={BrainsterLogo}
          width={133}
          height={37}
          alt={"Brainster logo"}
          className=" md:w-28 md:h-auto"
        />
        <Image
          src={ScandivLogo}
          width={111}
          height={33}
          alt={"Scandiv logo"}
          className="md:w-28 md:h-auto"
        />
      </div>
    </footer>
  );
}
