import Image from "next/image";
import Link from "next/link";
import landing_page from "./(images)/landing_page.png";

export default function Home() {
  return (
    <div>
      <div className="bg-[#559cd9] w-screen h-screen">
        <nav className="bg-[#FFE57D] w-[1000px] h-[90px] rounded-3xl  ml-[230px] mt-[50px] fixed top-0 z-10">
          <div className="flex flex-wrap justify-between items-center mx-auto py-[25px]">
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
        </nav>
        <div className="absolute mt-[300px] ml-[80px]  flex space-x-[300px]">
          <div className="items-center flex flex-col justify-center space-y-[40px]">
            <div>
              <p className="text-6xl text-left">
                Experience Learning Like Never Before
              </p>
            </div>
            <div className="w-full">
              <p className="font-medium text-left text-2xl ">
                Ace you courses without a sweat
              </p>
            </div>
            <div className="w-full flex justify-start">
              <button className="bg-[#FFE57D] rounded-3xl font-medium text-2xl text-black  px-[50px] py-3 mr-[30px] ">
                Start
              </button>
            </div>
          </div>
          <div>
            <Image src={landing_page} alt="image" height={780}></Image>
          </div>
        </div>
      </div>
      <div className="bg-[#559cd9] w-screen h-screen flex justify-center ">
        <div className="w-[1000px] h-[200px] mt-[160px]" id="features">
          <p className="font-medium text-7xl text-center">
            All the Tools you Will Ever Need in One Place
          </p>
        </div>
      </div>
    </div>
  );
}
