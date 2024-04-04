import { FooterInfo } from "./FooterInfo";

export const Footer = () => {
  return (
    <footer className="flex flex gap-[18.5vw]">
      <div className="flex flex-col max-w-[30vw] ">
        <a href="/" className="flex items-center ml-[5vw] mt-[8vw] gap-3">
          <div className="h-[30px] w-[30px] rounded-full bg-white flex"></div>
          <span className="self-center text-2xl text-white font-semibold flex">
            NoteWiz
          </span>
        </a>
        <div className="flex gap-4">
          <div className="flex items-center flex-wrap">
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ml-[60px] mt-[20px]"
              placeholder="enter your email"
              type="email"
              name="search"
            />
          </div>

          <div className="flex items-center">
            <button className="bg-[#FFE57D] rounded-xl px-10 py-2 mt-4">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-[180px] items-center mt-[10vw] max-w-[40vw]">
        <FooterInfo info="Terms and conditions" info2="Terms and conditions" />
        <FooterInfo info="Terms and conditions" info2="Terms and conditions" />
      </div>
    </footer>
  );
};
