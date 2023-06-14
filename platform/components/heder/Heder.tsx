import Image from "next/image";
import Logo from "../../public/svg/logo.svg";
export default function Heder() {
  return (
    <div className="w-11/12 max-w-screen-xl mx-auto pt-10 ">
      <Image
        src={Logo.src}
        alt={"Logo"}
        width={80}
        height={80}
        priority
        className="ml-auto lg:w-20 w-16 h-auto"
      />
    </div>
  );
}
