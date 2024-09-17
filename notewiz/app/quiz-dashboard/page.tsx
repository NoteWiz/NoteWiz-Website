import S from "@/components/FuncSidebar/S";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import First from "@/assets/icons/quiz-1.svg";
import SecondImage from "@/assets/icons/quiz-2.svg";

const page = () => {
	return (
		<div className="flex bg-[#252525]">
			<S />
			<div className="w-[80%] m-4 flex flex-row gap-10 justify-center max-sm:flex-col max-sm:m-auto">
					<div className=" mt-20 w-1/3 max-sm:h-[300px] max-sm:w-full h-[545px]  bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]">
						<Link href="/QuizForm">
							<div className="flex flex-col justify-between gap-16 items-center ">
								<p className="text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-3 text-center max-md:text-2xl max-sm:text-4xl max-sm:mt-24">
									Quiz Yourself
								</p>

								<Image
									src={First}
									width={300}
									height={200}
									alt=""
                                    className="max-sm:hidden"
								/>
							</div>
						</Link>
					</div>
                    <div className=" mt-20 w-1/3 max-sm:h-[300px] max-sm:w-full h-[545px]  bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340]">
						<Link href="/quizHistory">
							<div className="flex flex-col justify-between gap-16 items-center ">
								<p className="text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-3 text-center max-md:text-2xl max-sm:text-4xl max-sm:mt-24">
									Quiz History
								</p>

								<Image
									src={SecondImage}
									width={300}
									height={200}
									alt=""
                                    className="mb-5 max-sm:hidden"
								/>
							</div>
						</Link>
					</div>
			</div>
		</div>
	);
};

export default page;
