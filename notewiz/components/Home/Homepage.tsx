import React from "react";
import Sidebar from "../../components/FuncSidebar/S";
import Image from "next/image";
import First from "@/assets/icons/program.svg";
import Second from "@/assets/icons/ai.svg";
import Third from "@/assets/icons/communicate.svg";
import Fourth from "@/assets/icons/share.svg";
import { useRouter } from "next/router";
import { CircleArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Homepage = () => {
	return (
		<div className="flex bg-[#252525]">
			<Sidebar />
			<div className=" w-[80%]">
				<div className="container   pl-[100px] mt-5">
					<div className="first-container-fill  w-[90%] max-sm:w-full h-60 text-white  rounded-2xl bg-[#1e1e1e] max-md:flex-col cursor-pointer border-2 border-black transition-all duration-300 hover:border-[#00E340] flex flex-row justify-between">
						<div className="text-heading my-4 ml-3 max-md:m-auto">
							<p className="text-1xl p-4 max-sm:text-3xl max-sm:text-center max-md:hidden">Welcome Back</p>
							<p className="text-3xl font-medium ml-4 max-sm:text-center max-sm:m-auto ">
								Waqas Faraz
							</p>
							<Link href="/cb">
								<p className=" text-sm max-sm:hidden font-light ml-4  mt-5 flex align-bottom hover:underline max-md:hidden transition-all cursor-pointer">
									Browse through previous chats{" "}
									<CircleArrowRight
										size={17}
										strokeWidth={1}
										className="ml-3 align-bottom max-md:hidden"
									/>
								</p>
							</Link>
						</div>
						<div className="relative top-2 right-10 mb-2 max-md:m-auto  max-sm:hidden max-md:ml-32  ">
							<Image
								src={First}
								alt=""
								width={250}
								height={250}
								className="max-md:w-[150px]"
							/>
						</div>
					</div>

					<div className="second-parent-container flex flex-row w-[90%] mt-2 max-sm:flex max-sm:flex-col max-sm:w-full">
						<div className="second-container w-[50%] h-60 rounded-xl mt-4 mr-4 max-sm:w-full">
							<Link href="/cb">
								<div className="second-container-fill w-full h-full  flex flex-row max-md:text-lg max-md:flex-col justify-between  rounded-2xl bg-[#1e1e1e] text-white cursor-pointer border-2  border-black duration-300 hover:border-[#00E340] transition-all ">
									<div className="text-heading ml-3 my-5 max-sm:m-auto max-md:text-lg max-md:m-auto">
										<p className="text-3xl font-medium  mt-7  flex  flex-row  max-sm:m-auto max-md:text-lg max-md:m-auto">
											Chat Now
										</p>
									</div>
									<div className="relative mt-2 mb-2 mr-4 max-sm:hidden ">
										<Image
											src={Second}
											alt=""
											width={200}
											height={140}
											className=" "
										/>
									</div>
								</div>
							</Link>
						</div>
						<div className="third-container w-[50%] h-60 rounded-xl mt-4 max-sm:w-full  ">
							<div className="third-container-fill w-full h-full flex flex-row justify-between max-md:flex-col rounded-2xl bg-[#1e1e1e] text-white cursor-pointer border-2  border-black duration-300 hover:border-[#00E340] transition-all ">
								<div className="text-heading ml-3 my-5   max-sm:m-auto max-md:m-auto">
									<p className="text-3xl font-medium  mt-7  flex  flex-row max-sm:m-auto max-md:text-lg max-md:m-auto ">
										Quiz Yourself
									</p>
								</div>
								<div className="relative mt-2 mb-2 mr-4 bottom-2 max-sm:hidden">
									<Image
										src={Third}
										alt=""
										width={200}
										height={220}
										className=" overflow-visible z-10"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="w-[90%] mb-5 max-sm:w-full">
						<Link href="/flashcard">
							<div className="fourth-container-fill w-full h-60 rounded-2xl  flex flex-row max-md:flex-col justify-between mt-3 mb-3  bg-[#1e1e1e] text-white cursor-pointer border-2  border-black duration-300 hover:border-[#00E340] transition-all">
								<div className="text-heading mt-6 ml-3 max-sm:m-auto max-md:m-auto ">
									<p className="text-3xl font-medium ml-4 p-auto max-sm:m-auto max-sm:text-center mt-16 max-md:text-lg max-md:m-auto">
										Generate Flashcards
									</p>
									
								</div>
								<div className="relative mt-3 mr-10 bottom-2 max-sm:hidden max-md:m-auto ">
									<Image
										src={Fourth}
										alt=""
										width={240}
										height={240}
										className=" overflow-visible z-10 max-md:w-[200px]"
										/>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Homepage;
