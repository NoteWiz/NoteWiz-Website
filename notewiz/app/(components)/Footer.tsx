import { FooterInfo } from "./FooterInfo";

export const Footer = () => {
  return (
    <footer className="">
      <div className="flex gap-[18.5vw]">
        <div className="flex flex-col">
          <a href="/" className="flex items-center space-x-1 ml-[5vw] mt-[8vw]">
            <div className="h-[30px] w-[30px] rounded-full bg-white"></div>
            <span className="self-center text-2xl text-white font-semibold whitespace-nowrap">
              NoteWiz
            </span>
          </a>
          <div className="flex gap-4">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ml-[60px] mt-[20px]"
                placeholder="enter your email"
                type="email"
                name="search"
              />
            </label>
            <div className="flex items-center">
              <button className="bg-[#FFE57D] rounded-xl px-10 py-2 mt-4">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-[180px] items-center mt-[10vw]">
          <FooterInfo
            info1="Terms and conditions"
            info2="Terms and conditions"
          />
          <FooterInfo
            info1="info@noteWiz.com"
            info2="If you made it this far drop a follow :)"
          />
        </div>
      </div>
    </footer>
  );
};
