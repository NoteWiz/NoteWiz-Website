import Link from "next/link";
export const Header = () => {
  return (
    <div className="flex items-center justify-center pt-8 ">
      <div className="flex justify-evenly items-center py-[1vw] md:gap-[1vw] lg:gap-[3vw] bg-[#FFE57D] rounded-3xl fixed mt-16 z-10 px-4">
        <a href="/" className="flex items-center gap-4 ">
          <div className="h-[30px] w-[30px] rounded-full bg-black"></div>
          <span className=" text-2xl font-semibold ">NoteWiz</span>
        </a>
        <div className=" flex justify-between gap-16 ">
          <Link href="#features">
            <button className="text-xl">Features</button>
          </Link>
          <Link href="/">
            <button className="text-xl">Resources</button>
          </Link>
          <Link href="/">
            <button className="text-xl">Pricing</button>
          </Link>
        </div>

        <button className="flex items-center justify-center bg-black rounded-3xl font-medium text-large text-white  px-[20px] py-3 ">
          Get started
        </button>
      </div>
    </div>
  );
};
