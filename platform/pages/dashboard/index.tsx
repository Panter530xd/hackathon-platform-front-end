import Image from "next/image";
import Heder from "@/components/heder/Heder";
import FirstImage from "../../public/img/1.png";
import SecondImage from "../../public/img/2.png";
import ThirtImage from "../../public/img/3.png";
import FourImage from "../../public/img/4.png";
import FiveImage from "../../public/img/5.png";
import SixImage from "../../public/img/6.png";
import SevenImage from "../../public/img/7.png";

import Link from "next/link";
export default function Dashboard() {
  return (
    <div>
      <Heder />
      <div className="md:flex md:flex-row flex flex-col-reverse pb-10">
        <div className=" md:w-4/12 w-11/12 flex flex-col mx-auto md:gap-8 justify-center items-center font-exoFont md:border-r-2 md:border-black">
          <div>
            <h3 className=" text-xl text-black pb-8">Your events</h3>
          </div>
          <div className="md:flex md:flex-col grid grid-cols-2 gap-5">
            <div className="relative">
              <Image
                src={FirstImage}
                alt={"events 1"}
                width={267}
                height={29}
              />
              <div className=" flex space-x-3 inset-center text-white whitespace-nowrap">
                <h4 className=" md:text-lg text-xs">Event name</h4>
                <h4 className="md:text-lg text-xs">Time and date</h4>
              </div>
              <div className="inset-center-sec text-white">
                <h3 className="md:text-lg text-xs">
                  <Link href={"/events"}>View more</Link>
                </h3>
              </div>
            </div>

            <div className="relative">
              <Image
                src={SecondImage}
                alt={"events 2"}
                width={267}
                height={29}
              />
              <div className=" flex space-x-3 inset-center text-white whitespace-nowrap">
                <h4 className="md:text-lg text-xs">Event name</h4>
                <h4 className="md:text-lg text-xs">Time and date</h4>
              </div>
              <div className="inset-center-sec text-white">
                <h3 className="md:text-lg text-xs">
                  <Link href={"/events"}>View more</Link>
                </h3>
              </div>
            </div>
            <div className="relative">
              <Image
                src={ThirtImage}
                alt={"events 3"}
                width={267}
                height={29}
              />
              <div className=" flex space-x-3 inset-center text-white whitespace-nowrap">
                <h4 className="md:text-lg text-xs">Event name</h4>
                <h4 className="md:text-lg text-xs">Time and date</h4>
              </div>
              <div className="inset-center-sec text-white">
                <h3 className="md:text-lg text-xs">
                  <Link href={"/events"}>View more</Link>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-8/12 font-exoFont w-11/12 mx-auto">
          <div className="md:flex md:justify-between md:flex-row flex flex-col items-center md:w-9/12 w-11/12 mx-auto space-x-5 md:border-b-2 md:border-black">
            <div className="md:pt-0 pt-5">
              <h2 className=" md:text-5xl text-2xl font-bold pb-10 leading-tight">
                Good afternoon Jana,<br></br> what are we doing today?
              </h2>
            </div>
            <div>
              <Link
                className=" bg-greenis text-white font-semibold py-2 px-7 rounded-lg"
                href={"/dashboard/description"}
              >
                Create
              </Link>
            </div>
          </div>
          <div className=" md:w-9/12 w-11/12 mx-auto  items-start pt-10 md:pb-20 pb-0 md:border-b-2 md:border-black">
            <h3 className=" text-xl text-black pb-8">Ongoing events</h3>
            <div className="md:flex md:flex-row flex flex-col justify-center md:space-x-7 space-y-7 md:space-y-0 ">
              <div className="relative">
                <Image
                  src={FourImage}
                  alt={"events 4"}
                  width={436}
                  height={272}
                />
                <div>
                  <div className=" flex flex-col space-x-3 bottom-4 left-4 absolute text-white whitespace-nowrap">
                    <h4 className="text-left">Brainster Hackaton</h4>
                    <h4 className="text-center">14-05-23</h4>
                  </div>
                  <div className=" absolute bottom-7 right-4 text-white">
                    <h3 className="">
                      <Link href={"/events"}>View more</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={FiveImage}
                  alt={"events 5"}
                  width={436}
                  height={272}
                />
                <div>
                  <div className=" flex flex-col space-x-3 bottom-4 left-4 absolute text-white whitespace-nowrap">
                    <h4 className="text-left">Brainster Hackaton</h4>
                    <h4 className="text-center">14-05-23</h4>
                  </div>
                  <div className=" absolute bottom-7 right-4 text-white">
                    <h3 className="">
                      <Link href={"/events"}>View more</Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" md:w-9/12 w-11/12 mx-auto  items-start md:pt-10 md:pb-20 pt-5 pb-10 ">
            <h3 className=" text-xl text-black pb-8">Upcoming events</h3>
            <div className="md:flex md:flex-row flex flex-col justify-center md:space-x-7 space-y-7 md:space-y-0 ">
              <div className="relative">
                <Image
                  src={SixImage}
                  alt={"events 6"}
                  width={436}
                  height={272}
                />
                <div>
                  <div className=" flex flex-col space-x-3 bottom-4 left-4 absolute text-white whitespace-nowrap">
                    <h4 className="text-center">Event name</h4>
                    <h4 className="text-center">Time and date</h4>
                  </div>
                  <div className=" absolute bottom-7 right-4 text-white">
                    <h3 className="">
                      <Link href={"/events"}>View more</Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={SevenImage}
                  alt={"events 7"}
                  width={436}
                  height={272}
                />
                <div>
                  <div className=" flex flex-col space-x-3 bottom-4 left-4 absolute text-white whitespace-nowrap">
                    <h4 className="text-center">Event name</h4>
                    <h4 className="text-center">Time and date</h4>
                  </div>
                  <div className=" absolute bottom-7 right-4 text-white">
                    <h3 className="">
                      <Link href={"/events"}>View more</Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
