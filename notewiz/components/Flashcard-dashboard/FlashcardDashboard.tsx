"use client"
// import React from 'react'
// import Sidebar from "@/components/FuncSidebar/S"
// import Image from 'next/image'
// import FirstImage from "@/assets/icons/Notebook.svg"
// import SecondImage from "@/assets/icons/cuate.svg"
// import ThirdImage from "@/assets/icons/Social Strategy.svg"
// import { useRouter } from "next/navigation";

// const FlashcardDashboard = () => {
//     const router = useRouter();
//     const handleClick = (route:string) => {
//         router.push(route)
//     }
//   return (
//     <div className='flex bg-[#252525]'>
//         <Sidebar/>
//         <div className='ml-[90px] w-[500px] mt-[72px] h-screen'>
//             <div className=' first-card flex flex-col   '>
//                 <div className=' h-[300px]'>
//                     <div className='w-full h-full bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]'>
//                         <div className='flex flex-row justify-between'>
//                             <p className='text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24'>Share Flashcards</p>
//                             <Image src={FirstImage} alt='' width={210} height={210} className='mt-10 object-cover'/>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='second-card h-[300px] mt-8 w-full bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]'>
//                     <div className='flex flex-row justify-between' onClick={()=>handleClick('/FlashCardHistory')}>
//                         <p className='text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24'>View Previous Flashcards</p>
//                         <Image src={SecondImage} alt='' width={210} height={210} className='mt-10 m-auto'/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//             <div className='third-card h-[630px] w-[500px] mt-[72px] ml-8 rounded-2xl bg-[#1e1e1e] hover:-translate-y-[15px] cursor-pointer border-2 border-b-4 border-r-4 border-black transition-all duration-300 hover:border-[#00E340]'>
//                 <div className='flex flex-col justify-between' onClick={()=>{handleClick('/flashcard')}}>
//                     <p className='text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-3 text-center'> Generate Flashcards</p>
//                     <Image src={ThirdImage} alt='' height={600} width={600} className='mt-8'/>
//                 </div>
//             </div>
//     </div>
//   )
// }
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/FuncSidebar/S";
import FirstImage from "@/assets/icons/Notebook.svg";
import SecondImage from "@/assets/icons/cuate.svg";
import ThirdImage from "@/assets/icons/Social Strategy.svg";
import Link from "next/link";
import History from "../Flashcard-history/History";
import { useRouter } from "next/navigation";

const FlashcardDashboard = () => {
	const router = useRouter();
    const handleClick = (route:string) => {
        router.push(route)
    }
	return (
		<div className="bg-[#252525] min-h-screen">
			<div className="flex max-sm:flex-col max-sm:items-center">
				<Sidebar />
				<div className="w-1/3 m-5 max-sm:w-[300px]  ">
					<div
						id="thirdCard"
						className=" mt-20 w-full max-sm:h-[300px] h-[545px]  bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]"
					>
						<Link href="/flashcard">
							<div className="flex flex-col justify-between items-center " onClick={()=>{handleClick('/flashcard')}}>
								<p className="text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-3 text-center max-md:text-2xl max-sm:text-4xl max-sm:mt-24">
									Generate Flashcards
								</p>

								<Image
									src={ThirdImage}
									alt=""
									height={400}
									width={400}
									className="mt-8 max-md:mt-20 max-sm:hidden"
								/>
							</div>
						</Link>
					</div>
				</div>

				<div
					id="Container"
					className="flex flex-col w-1/3 m-5 max-sm:w-full max-sm:items-center"
				>
					<div
						id="FirstCard"
						className=" mt-20 max-sm:mt-0 w-full h-64 max-sm:h-[300px] max-sm:w-[300px] bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]"
					>
						<div className="flex flex-row justify-between max-md:flex-col mt-4">
							<p className="text-white text-4xl font-DM_Sans tracking-tighter p-1 ml-4 mt-24 max-md:text-2xl : max-md:m-auto max-sm:text-4xl max-sm:mt-28">
								Share Flashcards
							</p>

							<div className="relative m-auto w-1/3 h-1/2 max-md:w-4/5 max-sm:hidden ">
								<Image
									src={FirstImage}
									alt=""
									// width={200}
									// height={200}
									className="mt-7 max-sm:opacity-0"
								/>
							</div>
						</div>
					</div>
					<div
						id="secondCard"
						className="  max-sm:h-[300px] max-sm:w-[300px] mt-8 w-full h-64 bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]"
						onClick={()=>handleClick('/FlashCardHistory')}
					>
							{/* <Link href="/flashcard-history"> */}
						<div className="flex flex-row justify-between max-md:flex-col max-md:items-center mt-4 max-sm:mt-28">
								<p className="text-white text-4xl font-DM_Sans tracking-tighter p-1 ml-4 mt-24 max-md:m-auto max-md:text-2xl max-sm:text-4xl  ">
									Flashcards History
								</p>

								<div className="relative m-auto w-1/3 h-1/2 max-md:w-[70%] max-sm:hidden  ">
									<Image
										src={SecondImage}
										alt=""
										// width={300}
										// height={300}
										className=" mt-7 max-sm:opacity-0"
									/>
								</div>
						</div>
							{/* </Link> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlashcardDashboard;
