// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import landing_page from "./(images)/landing_page.png";
// import img2 from "./(images)/img2.png";
// import img3 from "./(images)/img3.png";
// import img4 from "./(images)/img4.png";
// import img5 from "./(images)/img5.png";
// import img6 from "./(images)/img6.png";
// import img7 from "./(images)/img7.png";
// import img8 from "./(images)/img8.png";
// import { CardSmall } from "./(components)/CardSmall";
// import { CardLarge } from "./(components)/CardLarge";
// import { FeedbackCard } from "./(components)/feedbackCard";
// import { FooterInfo } from "./(components)/FooterInfo";
// import { Header } from "./(components)/Header";
// import { Footer } from "./(components)/Footer";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   const handleClick = (route: string) => {
//     router.push(route);
//   };
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="bg-[#559cd9] w-screen h-full">
//         <Header />
//         <div className=" mt-[17vw] flex items-center px-10 gap-4 justify-center">
//           <div className="items-center flex flex-col justify-center space-y-[40px]">
//             <div>
//               <p className="text-6xl text-left flex">
//                 Experience Learning Like Never Before
//               </p>
//             </div>
//             <div className="w-full">
//               <p className="font-medium text-left text-2xl flex">
//                 Ace you courses without a sweat
//               </p>
//             </div>
//             <div className="w-full flex justify-start">
//               <button
//                 className="bg-[#FFE57D] rounded-3xl font-medium text-2xl text-black  px-[50px] py-3 mr-[30px] animate-pulse"
//                 onClick={() => handleClick("/signup")}
//               >
//                 Start
//               </button>
//             </div>
//           </div>
//           <div>
//             <Image src={landing_page} alt="image" height={780}></Image>
//           </div>
//         </div>
//       </div>
//       <div
//         className="bg-[#559cd9] w-screen h-full flex justify-center flex-col items-center"
//         id="features"
//       >
//         <div className="max-w-[62vw] mt-[17vw] flex justify-center mb-[2.2vw]">
//           <p className="font-medium text-7xl text-center">
//             All the Tools you Will Ever Need in One Place
//           </p>
//         </div>
//         <div className="flex gap-[1.302vw] justify-evenly  mt-[3vw] pb-[1vw]">
//           <div className="flex flex-col items-center justify-center bg-white rounded-2xl px-12 animate-pulse hover:animate-none">
//             <CardSmall
//               img={img2}
//               p1={"Deeper Insights"}
//               p2={
//                 "Get precise analysis of your progress so that you take steps in the right direction"
//               }
//             />
//           </div>
//           <div className="flex  items-center justify-center bg-white rounded-2xl animate-pulse hover:animate-none">
//             <CardLarge
//               img={img3}
//               p1={"Chat with all your pdfs"}
//               p2={
//                 "Just upload your notes and PDF’s and start asking questions right away. Unlike your teachers, you can ask it 1000 times."
//               }
//             />
//           </div>
//           <div className="flex flex-col flex-col-reverse items-center justify-center bg-white space-y-[5px] rounded-2xl px-10 animate-pulse hover:animate-none">
//             <CardSmall
//               img={img4}
//               p1={"Lots of practice"}
//               p2={
//                 "Select specific subjects you want to practice and start. Level up while you’re at it :)"
//               }
//             />
//           </div>
//         </div>
//       </div>
//       <div className="bg-[#FFE57D] w-screen h-full ">
//         <div className="pt-[1vw] flex gap-x-[1.302vw] items-center justify-evenly px-[2vw] animate-pulse hover:animate-none">
//           <CardLarge
//             img={img5}
//             p1={"Mindmaps to the rescue"}
//             p2={
//               "Generate mindmaps with a single prompt and understand concepts like never before. No wonder everyone’s jealous of you"
//             }
//           />
//           <CardLarge
//             img={img6}
//             p1={"Flashcards in a flash"}
//             p2={
//               "Now create flashcards based on a prompt and never worry about forgetting any concept. Yes, you can thank us later :D"
//             }
//           />
//         </div>

//         <div className="flex flex-col mt-[17vw] items-center">
//           <div className="flex flex-col items-center justify-center max-w-[1000px]">
//             <p className="text-7xl text-center text-wrap">
//               Our Own Gamified Community
//             </p>
//             <p className="py-4 text-2xl text-center text-wrap">
//               Daily challenges that spark curiosity, streaks that turn study
//               routines into epic adventures, and leaderboards that showcase your
//               skills.
//             </p>
//           </div>
//           <div>
//             <Image src={img7} alt="img" height={600}></Image>
//           </div>
//         </div>
//       </div>
//       <div className="bg-[#559cd9] w-screen h-full ">
//         <div className="flex flex-col items-center">
//           <div className="flex flex-col items-center justify-center max-w-[900px] mt-[200px]">
//             <p className="text-7xl text-center text-wrap">
//               Achieve Your Goals Precisely
//             </p>
//             <p className="py-4 text-2xl text-center text-wrap">
//               With a personalized dashboard, monitor your progress and know
//               which steps to take. And which not to. Compete for the top spot on
//               the leaderboard and show off your ranks.
//             </p>
//           </div>
//           <div>
//             <Image src={img8} alt="img" height={600}></Image>
//           </div>
//         </div>
//         <div className="flex flex-col items-center mt-[200px]">
//           <div className="flex flex-col items-center justify-center max-w-[1000px]">
//             <p className="text-7xl  text-center text-wrap">What Students Say</p>
//             <p className="py-6 text-4xl text-center text-wrap">
//               a glimpse of success
//             </p>
//           </div>
//           <div className="grid grid-cols-3 justify-items-center gap-6 pb-16">
//             <FeedbackCard />
//             <FeedbackCard />
//             <FeedbackCard />
//             <FeedbackCard />
//             <FeedbackCard />
//             <FeedbackCard />
//           </div>
//         </div>
//         {/* <div className="pt-[250px]"></div> */}
//       </div>

//       <Footer />
//     </div>
//   );
// }

"use client";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import facebook from "@/assets/facebook.svg";
import instagram from "@/assets/insta.svg";
import discord from "@/assets/discord.svg";
import linkedin from "@/assets/linkedin.svg";
import first from "@/assets/Highlight_04.svg";
import second from "@/assets/Highlight_10.svg";
import third from "@/assets/Figma Cursor.svg";
import highFive from "@/assets/high-five.svg";
import analyse from "@/assets/analyse.svg";
import star from "@/assets/star.svg";
import c1 from "@/assets/card-1.svg";
import c2 from "@/assets/card-2.svg";
import c3 from "@/assets/card-3.svg";
import c4 from "@/assets/card-4.svg";
import t1 from "@/assets/T1.svg";
import t2 from "@/assets/T2.svg";
import t3 from "@/assets/T3.svg";
import t4 from "@/assets/T4.svg";
import Link from "next/link";


export default function Home() {
	useGSAP(() => {
		gsap.to("#Hero-title", {
			y: -40,
			duration: 1,
			ease: "power4",
			opacity: 1
		});
		gsap.to("#decoration", {
			y: -40,
			duration: 0.5,
			ease: "power4",
			opacity: 1,
			stagger: 2
		});
		gsap.from("#arrow", {
			x: -800,
			ease: "back",
			duration: 1.5,
			opacity: 1
		});
    gsap.to(".cta",{
      duration:1,
      ease:"power4.inOut",
      opacity: 1,
    })
    gsap.to(".ctp",{
      duration:1,
      ease:"power4.inOut",
      opacity: 1,
    })
    gsap.to('.cta-text',{
      ease:"power4",
      duration:2,
      opacity:1,
      y:5
    })
    gsap.to('.star',{
    scrollTrigger:{
      trigger:'.star',
      toggleActions:"restart pause resume none",
    },
      y:-40,
      duration:2.5,
      ease:"back",
      opacity: 1,
      
    })
	});
	return (
		<div className="bg-[#131313] min-h-screen text-white pt-5">
			<div className="flex flex-row justify-center">
				<div
					id="navbar"
					className="w-1/2 bg-[#121212] rounded-full text-white py-3 z-30  fixed "
				>
					<div className="flex flex-row justify-between px-6">
						<p>Features</p>
						<p>Resources</p>
						<p>Pricing</p>
						<p>Start Now</p>
					</div>
				</div>
			</div>
			<div
				id="hero-section"
				className="w-full h-[80vh] flex flex-col justify-center items-center pt-40"
			>
				<div
					id="container"
					className="relative align-middle items-center flex justify-center"
				>
					<div
						id="gradient"
						className="bg-[#01AB31] w-[400px] h-[500px] rounded-full blur-[250px] absolute bottom-0"
					></div>
				</div>

				<div
					id="decoration"
					className="flex flex-row justify-between w-[80%] translate-y-0 opacity-0"
				>
					<Image
						src={first}
						alt=""
						className="relative top-16"
						id="first-tag"
					/>
					<Image
						src={second}
						alt=""
						className="relative top-20 left-10"
						id="second-tag"
					/>
				</div>
				<p
					id="Hero-title"
					className="text-[100px] tracking-tighter font-medium translate-y-[200px] opacity-0"
				>
					Let's Reimagine Learning
				</p>
				<div className="flex flex-row justify-end w-[80%]">
					<Image
						src={third}
						alt=""
						className="relative right-16 bottom-10 opacity-1"
						id="arrow"
					/>
				</div>
				<p className=" ctp text-[#CCCCCC] text-sm w-1/4 text-center opacity-0">
					Charge up your learning with AI based tools and kickstart
					your journey
				</p>
				<Link href="/signup">
					<button className=" cta opacity-0 bg-[#00E340] mt-5 text-black px-8 py-4 rounded-xl font-bold tracking-tighter drop-shadow-md">
						{" "}
						Start Learning Now
					</button>
				</Link>
			</div>

			<div id="cards-container" className="mt-36 flex">
				<div id="headings" className="flex flex-col ml-60 w-[68%] mt-5">
					<p className="text-[#00E340] text-sm">AI Powered Tools</p>
					<p className="text-white text-4xl tracking-tighter">
						Learning Tools You'll Enjoy Using
					</p>
					<div
						id="cards-row-2"
						className="py-6 flex flex-row gap-x-5"
					>
						<div className="bg-[#1e1e1e] w-[60%] h-[50vh] rounded-xl">
							<div className="flex flex-row">
								<div className="flex flex-col gap-y-4 tracking-tighter pl-4 pt-20 justify-center">
									<p className="text-3xl font-medium">
										Chat with all your PDFs
									</p>
									<p className=" text-lg">
										Chat will all your documents. Just
										upload them in a single click and ask
										questions right away.
									</p>
								</div>
								<div className="pr-4 flex justify-center">
									<Image src={c1} width={600} alt="" />
								</div>
							</div>
						</div>
						<div className="bg-[#1e1e1e] w-[40%] h-[50vh] rounded-xl">
							<div className="flex flex-col tracking-tighter justify-center items-center gap-y-2 h-full">
								<div className="pr-4 flex justify-center ">
									<Image src={c3} width={250} alt="" />
								</div>
								<p className="text-3xl font-medium">
									Lots of practice
								</p>
								<p className="w-2/3 font-medium text-center">
									Generate custom questions suited to your
									needs and start practicing.
								</p>
							</div>
						</div>
					</div>
					<div
						id="cards-row-2"
						className="py- flex flex-row-reverse gap-x-5"
					>
						<div className="bg-[#1e1e1e] w-[60%] h-[50vh] rounded-xl">
							<div className="flex flex-row">
								<div className="flex flex-col gap-y-4 tracking-tighter pl-4 pt-20 justify-center">
									<p className="text-3xl font-medium">
										Chat with all your PDFs
									</p>
									<p className=" text-lg">
										Chat will all your documents. Just
										upload them in a single click and ask
										questions right away.
									</p>
								</div>
								<div className="pr-4 flex justify-center pt-8">
									<Image
										src={c2}
										width={600}
										alt=""
										className=""
									/>
								</div>
							</div>
						</div>
						<div className="bg-[#1e1e1e] w-[40%] h-[50vh] rounded-xl">
							<div className="flex flex-col tracking-tighter justify-center items-center gap-y-3 h-full">
								<div className="pr-4 flex justify-center ">
									<Image
										src={c4}
										width={290}
										alt=""
										className=""
									/>
								</div>
								<p className="text-3xl font-medium">
									Flashcards in a flash
								</p>
								<p className="w-2/3 font-medium text-center">
									Generate flashcards based on a single prompt
									and never forget any concept.{" "}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				id="features"
				className="ml-60  flex flex-row w-[68%] py-20 mt-10 gap-x-10"
			>
				<div className="flex flex-col justify-center">
					<p className="text-[#00E340] text-sm">
						Features to look forward to
					</p>
					<p className="text-white text-4xl tracking-tighter">
						Your personal community
					</p>
					<p className=" py-10 ml-1">
						A collaborative learning environment that allows you to
						share your progress and connect with friends.
					</p>
				</div>

				<div className="bg-[#1e1e1e] w-[60%] h-[50vh] rounded-xl flex justify-center pb-6">
					<Image src={highFive} alt="" width={400} />
				</div>
			</div>

			<div
				id="features"
				className="ml-60 flex flex-row-reverse w-[68%] py-10 mt-10 gap-x-10"
			>
				<div className="flex flex-col justify-center">
					<p className="text-[#00E340] text-sm">
						Personalized Feedback
					</p>
					<p className="text-white text-4xl tracking-tighter ">
						Achieve your goals like never before{" "}
					</p>
					<p className=" py-10 ml-1">
						Monitor your progress and know exactly what steps to
						take to achieve your target. Utilize personalized
						dashboards, track using our fun and easy-to-follow
						metrics.
					</p>
				</div>

				<div className="bg-[#1e1e1e] w-full h-[50vh] rounded-xl flex justify-center ">
					<Image src={analyse} alt="" width={400} />
				</div>
			</div>

			<div className="flex flex-col justify-center items-center pt-20 relative">
				<div
					id="container"
					className="relative align-middle items-center flex justify-center"
				>
					<div
						id="gradient"
						className="bg-[#01AB31] w-[200px] h-[500px] rounded-full blur-[250px] absolute top-40 z-0"
					></div>
				</div>
				{/* <p className="text-[#00E340] text-7xl">“</p> */}
				<p className="text-[#00E340] text-sm z-10">
					Glimpses of Success
				</p>
				<p className="text-white text-4xl tracking-tighter">
					What Students Have To Say
				</p>
				<div
					id="cards-row-2"
					className="py-8 flex flex-row gap-x-5 w-[68%] z-10"
				>
					<div className="bg-[#1e1e1e] w-[60%] h-[40vh] rounded-xl">
						<div className="flex flex-col">
							<div className="flex flex-row gap-4 items-center pl-4 pt-4">
								<Image src={t1} alt="" width={90} />
								<p className=" text-lg ">Eric Dier</p>
							</div>
							<p className="p-4">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Vivamus condimentum justo ac
								gravida lobortis. Sed consequat magna nec ex
								scelerisque.
							</p>
						</div>
					</div>
					<div className="bg-[#1e1e1e] w-[40%] h-[40vh] rounded-xl">
						<div className="flex flex-col">
							<div className="flex flex-row gap-4 items-center pl-4 pt-4">
								<Image src={t2} alt="" width={90} />
								<p className=" text-lg ">Joshua</p>
							</div>
							<p className="p-4">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Vivamus condimentum justo ac
								gravida lobortis. Sed consequat magna nec ex
								scelerisque.
							</p>
						</div>
					</div>
				</div>
				<div
					id="cards-row-2"
					className="py- flex flex-row-reverse gap-x-5 w-[68%] z-10"
				>
					<div className="bg-[#1e1e1e] w-[60%] h-[40vh] rounded-xl">
						{" "}
						<div className="flex flex-col">
							<div className="flex flex-row gap-4 items-center pl-4 pt-4">
								<Image src={t3} alt="" width={90} />
								<p className=" text-lg ">Sarah Hudson</p>
							</div>
							<p className="p-4">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Vivamus condimentum justo ac
								gravida lobortis. Sed consequat magna nec ex
								scelerisque.
							</p>
						</div>
					</div>
					<div className="bg-[#1e1e1e] w-[40%] h-[40vh] rounded-xl">
						{" "}
						<div className="flex flex-col">
							<div className="flex flex-row gap-4 items-center pl-4 pt-4">
								<Image src={t4} alt="" width={90} />
								<p className=" text-lg ">Rohan</p>
							</div>
							<p className="p-4">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Vivamus condimentum justo ac
								gravida lobortis. Sed consequat magna nec ex
								scelerisque.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div id="container-cta" className="flex justify-center items-center h-screen ">
				<div className="flex flex-col justify-center items-center pb-5">
					<div
						
						className="relative align-middle items-center flex justify-center"
					>
						<div
							id="gradient"
							className="bg-[#01AB31] w-[200px] h-[200px] rounded-full blur-[125px] absolute z-0"
						></div>
					</div>
					<div className="star">
						<Image src={star} alt="" className="relative" />
					</div>
					<p className="text-5xl text-white w-2/3 text-center tracking-tighter z-10 cta-text opacity-0">
						Say Goodbye to Notes and Hello to NoteWiz
					</p>
					<Link href="/signup">
						<button className="bg-[#00E340] mt-8 text-black px-10 py-4 rounded-xl font-bold tracking-tighter drop-shadow-md">
							Start Now
						</button>
					</Link>
				</div>
			</div>
			<div className="h-[80vh] bg-black w-full rounded-t-[60px]">
				<div className="flex flex-col justify-center items-center">
					<p className="text-white tracking-tighter text-2xl mt-10 font-medium">
						Our Socials
					</p>
					<div
						id="social-icons"
						className="flex flex-row gap-x-8 mt-4"
					>
						<Image src={facebook} alt="" width={36} />
						<Image src={instagram} alt="" width={36} />
						<Image src={discord} alt="" width={36} />
						<Image src={linkedin} alt="" width={36} />
					</div>
					<div
						id="container"
						className="relative align-middle items-center flex justify-center"
					>
						<div
							id="gradient"
							className="bg-[#01AB31] w-[800px] h-[200px] rounded-full blur-[255px] absolute top-52 z-0"
						></div>
					</div>
					<p className="text-[300px] font-bold tracking-[-0.08em] z-10">
						NoteWiz
					</p>
				</div>
			</div>
		</div>
	);
}


