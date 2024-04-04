import { FooterInfo } from "./FooterInfo";

export const Footer = () => {
  return (
    <footer className="bg-[#0C3464] ">
      <div className="flex items-center justify-center px-1 py-16 gap-[38vw] border">
        <div className="flex flex-col gap-8">
          <div className="flex gap-2">
            <div className="h-[30px] w-[30px] bg-white rounded-full"></div>
            <p className="text-white text-2xl">NoteWiz</p>
          </div>
          <div>
            <div className="flex gap-4">
              <input
                type="text"
                className="rounded-lg text-md bg-white px-4 py-2 shadow-lg"
                placeholder="name@flowbite.com"
              />
              <div className="flex items-end">
                <button className="bg-[#FFE57D] px-4 py-1 rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-5 ">
          <div className="flex flex-col gap-3 max-w-[500px] overflow-hidden text-wrap">
            <p className="text-white text-xl font-medium">Quick Links</p>
            <p className="text-white">
              <a href="/" className="hover:text-black">
                Terms and Conditions
              </a>
            </p>
            <p className="text-white">
              <a href="/" className="hover:text-black">
                Terms and Conditions
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white text-xl font-medium">Quick Links</p>
            <p className="text-white">
              <a href="/" className="hover:text-black">
                Terms and Conditions
              </a>
            </p>
            <p className="text-white">
              <a href="/" className="hover:text-black">
                Terms and Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
