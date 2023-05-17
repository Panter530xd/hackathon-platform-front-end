import Image from "next/image";
import Logo from "../../public/svg/Frame.svg";
export default function Heder() {
  return (
    <div className="w-10/12 mx-auto pt-10 ">
      <Image
        src={Logo.src}
        alt={"Logo"}
        width={80}
        height={80}
        className="ml-auto w-20 h-auto"
      />
    </div>
  );
}
