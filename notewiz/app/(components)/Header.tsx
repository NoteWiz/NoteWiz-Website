import Link from "next/link";
export const Header = () => {
  return (
    <div className="flex items-center justify-center pt-8 ">
      <div className="flex flex-wrap justify-between items-center mx-auto py-[1vw] gap-8 bg-[#FFE57D] rounded-3xl fixed mt-16 z-10">
        <a href="/" className="flex items-center space-x-1 ml-[70px]">
          <div className="h-[30px] w-[30px] rounded-full bg-black"></div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            NoteWiz
          </span>
        </a>
        <div className="mx-auto flex justify-between space-x-[80px] ">
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

        <button className="bg-black rounded-3xl font-medium text-large text-white  px-[50px] py-3 mr-[30px]">
          Get started
        </button>
      </div>
    </div>
  );
};
