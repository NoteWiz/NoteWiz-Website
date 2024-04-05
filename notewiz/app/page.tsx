import Image from "next/image";
import Link from "next/link";
import landing_page from "./(images)/landing_page.png";
import img2 from "./(images)/img2.png";
import img3 from "./(images)/img3.png";
import img4 from "./(images)/img4.png";
import img5 from "./(images)/img5.png";
import img6 from "./(images)/img6.png";
import img7 from "./(images)/img7.png";
import img8 from "./(images)/img8.png";
import { CardSmall } from "./(components)/CardSmall";
import { CardLarge } from "./(components)/CardLarge";
import { FeedbackCard } from "./(components)/feedbackCard";

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
      <div
        className="bg-[#559cd9] w-screen h-screen flex justify-center flex-col items-center"
        id="features"
      >
        <div className="w-[1000px] h-[200px] mt-[300px] flex justify-center mb-[40px]">
          <p className="font-medium text-7xl text-center">
            All the Tools you Will Ever Need in One Place
          </p>
        </div>
        <div className="flex gap-[1.302vw] justify-evenly mx-4 mt-[40px]">
          <div className="flex flex-col items-center justify-center bg-white space-y-[5px] rounded-2xl px-10">
            <CardSmall
              img={img2}
              p1={"Deeper Insights"}
              p2={
                "Get precise analysis of your progress so that you take steps in the right direction"
              }
            />
          </div>
          <div className="flex  items-center justify-center bg-white space-y-[20px] rounded-2xl">
            <CardLarge
              img={img3}
              p1={"Chat with all your pdfs"}
              p2={
                "Just upload your notes and PDF’s and start asking questions right away. Unlike your teachers, you can ask it 1000 times."
              }
            />
          </div>
          <div className="flex flex-col flex-col-reverse items-center justify-center bg-white space-y-[5px] rounded-2xl px-10">
            <CardSmall
              img={img4}
              p1={"Lots of practice"}
              p2={
                "Select specific subjects you want to practice and start. Level up while you’re at it :)"
              }
            />
          </div>
        </div>
      </div>
      <div className="bg-[#FFE57D] w-screen h-full">
        <div className="pt-[12vw] flex gap-x-[1.302vw] items-center justify-center">
          <CardLarge
            img={img5}
            p1={"Mindmaps to the rescue"}
            p2={
              "Generate mindmaps with a single prompt and understand concepts like never before. No wonder everyone’s jealous of you"
            }
          />
          <CardLarge
            img={img6}
            p1={"Flashcards in a flash"}
            p2={
              "Now create flashcards based on a prompt and never worry about forgetting any concept. Yes, you can thank us later :D"
            }
          />
        </div>

        <div className="flex flex-col mt-[16vw] items-center">
          <div className="flex flex-col items-center justify-center max-w-[1000px]">
            <p className="text-7xl text-center text-wrap">
              Our Own Gamified Community
            </p>
            <p className="py-4 text-2xl text-center text-wrap">
              {" "}
              Daily challenges that spark curiosity, streaks that turn study
              routines into epic adventures, and leaderboards that showcase your
              skills.
            </p>
          </div>
          <div>
            <Image src={img7} alt="img" height={600}></Image>
          </div>
        </div>
      </div>
      <div className="bg-[#559cd9] w-screen h-full ">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center max-w-[900px] mt-[200px]">
            <p className="text-7xl text-center text-wrap">
              Achieve Your Goals Precisely
            </p>
            <p className="py-4 text-2xl text-center text-wrap">
              With a personalized dashboard, monitor your progress and know
              which steps to take. And which not to. Compete for the top spot on
              the leaderboard and show off your ranks.
            </p>
          </div>
          <div>
            <Image src={img8} alt="img" height={600}></Image>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[200px]">
          <div className="flex flex-col items-center justify-center max-w-[1000px]">
            <p className="text-7xl  text-center text-wrap">What Students Say</p>
            <p className="py-6 text-4xl text-center text-wrap">
              a glimpse of success
            </p>
          </div>
          <div className="grid grid-cols-3 justify-items-center gap-6">
            <FeedbackCard />
            <FeedbackCard />
            <FeedbackCard />
            <FeedbackCard />
            <FeedbackCard />
            <FeedbackCard />
          </div>
        </div>
        <div className="pt-[250px]"></div>
      </div>
      <div className="bg-[#FFE57D] w-full h-screen ">
        <div className="bg-[#FFE57D] w-full h-[50%]"></div>
        <div className="bg-[#0C3464] w-full h-[50%]">
          <footer className="">
            <div className="flex gap-[350px]">
              <div className="flex flex-col">
                <a
                  href="/"
                  className="flex items-center space-x-1 ml-[70px] mt-[200px]"
                >
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
              <div className="flex gap-[180px] mt-[220px]">
                <div className="flex flex-col ">
                  <p className="text-3xl text-white font-semibold">
                    Quick Links
                  </p>
                  <div className="pt-4 flex flex-col gap-2">
                    <a
                      href="/"
                      className="text-white underline decoration-solid hover:text-black"
                    >
                      Terms and conditions
                    </a>
                    <a
                      href="/"
                      className="text-white underline decoration-solid hover:text-black"
                    >
                      Terms and conditions
                    </a>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <p className="text-3xl text-white font-semibold">Contacts</p>
                  <div className="pt-4 flex flex-col gap-2">
                    <a
                      href="/"
                      className="text-white underline decoration-solid hover:text-black"
                    >
                      info@noteWiz.com
                    </a>
                    <a
                      href="/"
                      className="text-white underline decoration-solid hover:text-black"
                    >
                      If you made it this far drop a follow :)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
