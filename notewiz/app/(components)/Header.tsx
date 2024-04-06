import Link from "next/link";
import Logo from "../login/notewiz logo.png";
import Image from "next/image";
export const Header = () => {
  return (
    <div className="flex items-center justify-center pt-8 mx-auto">
      <div className="flex justify-between mx-auto items-center py-[1vw]  bg-[#FFE57D] rounded-3xl fixed mt-16 z-10 md:gap-x-4 gap-x-2 px-3 md:px-4">
        <a href="/" className="flex items-center md:gap-x-1 gap-x-2">
          <div className="h-[30px] w-[30px] rounded-full bg-black"></div>
          <span className=" text-2xl font-semibold ">NoteWiz</span>
        </a>

        <Link href="#features">
          <button className="text-xl">Features</button>
        </Link>
        <Link href="/">
          <button className="text-xl">Resources</button>
        </Link>
        <Link href="/">
          <button className="text-xl">Pricing</button>
        </Link>

        <button className=" bg-black rounded-3xl font-medium text-large text-white  px-[20px] py-3 ">
          Get started
        </button>
      </div>
    </div>
  );
};
