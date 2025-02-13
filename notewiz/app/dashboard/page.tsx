"use client"
import React from "react";
import Sidebar from "@/components/FuncSidebar/S";
import Chat from "@/assets/icons/Message.svg";
import Image from "next/image";

import Rocket from "@/assets/icons/Rocket.svg";
import YChat from "@/assets/icons/YellowChat.svg";
import Star from "@/assets/icons/Star.svg";
import Info from "@/assets/icons/Info.svg";
import Heart from "@/assets/icons/Heart.svg"
import Book from "@/assets/icons/Book.svg"
import Thumbs from "@/assets/icons/ThumbsUp.svg"
import Smiley from "@/assets/icons/Smiley.svg"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Loading from "@/utils/Loading";


const page = () => {
  const router = useRouter();
  const [loading,setLoading]=useState(true)
    const { data: session, status: sessionStatus } = useSession();
    if (sessionStatus === "loading") {
      return (<Loading loading={loading}/>); // Show a loading state while session is being loaded
    }
    if (sessionStatus === "unauthenticated") {
      router.replace("login");
      return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
    }
    if (sessionStatus === "authenticated")
        {
  return (
    <div className="flex bg-[#252525]">
      <Sidebar />
      <div className=" w-[900px]   py-8 ">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white ml-[100px]">Statistics</h2>
          <div className="grid grid-cols-2 gap-4 ml-[100px] lg:w-[71%] max-sm:grid-cols-1 max-sm:w-[80%]">
            <div className="bg-[#00DB3D] text-black p-4 md:w-full h-24 rounded-lg flex items-center">
              <Image
                src={Thumbs}
                alt="Heart Icon"
                width={65}
                height={65}
                className=" mr-2"
              />
              <div className="flex flex-col">
                <p className=" text-lg font-bold">1</p>
                <span className="text-xl font-semibold" >Day Streak</span>
              </div>
            </div>
            <div className="bg-[#00DB3D] text-black p-4 h-24 rounded-md max-md:w-full max-sm:w-full flex items-center ">
              <Image
                src={Smiley}
                alt="Smiley Icon"
                width={65}
                height={65}
                className=" mr-4"
              />
              <div className="flex flex-col">
                <p className=" text-lg font-bold">1</p>
                <span className="text-xl font-semibold" >Day Streak</span>
              </div>
            </div>
            <div className="bg-[#00DB3D] text-black p-4 h-24 rounded-md max-md:w-full max-sm:w-full flex items-center ">
              <Image
                src={Book}
                alt="Book Icon"
                width={65}
                height={65}
                className=" mr-4"
              />
             <div className="flex flex-col">
                <p className=" text-lg font-bold">1</p>
                <span className="text-xl font-semibold" >Day Streak</span>
              </div>
            </div>
            <div className="bg-[#00DB3D] text-black p-4 h-24 rounded-md max-md:w-full max-sm:w-full flex items-center">
              <Image
                src={Heart}
                alt="Heart Icon"
                width={65}
                height={65}
                className=" mr-4"
              />
              <div className="flex flex-col">
                <p className=" text-lg font-bold">1</p>
                <span className="text-xl font-semibold" >Day Streak</span>
              </div>
            </div>
          </div>
        </div>







        <div>
          <h2 className="text-2xl font-bold mb-4 text-white ml-[100px]">Achievements</h2>
          <div className="space-y-4 ml-[100px]">
            <div className=" third lg:w-[80%]  sm:w-full  h-24 my-2  rounded-md bg-[#00DB3D] flex items-center">
              <Image src={Chat} alt="" width={65} height={65} className="m-4" />
              <div className="flex flex-col items-start w-full">
                <p className="text-xl font-semibold ml-5">WildFire</p>
                <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
                  <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
                </div>
                <p className="text-sm ml-4">Acheived a streak</p>
              </div>
              <div className="relative -top-8 -left-2">1/3</div>
            </div>




            <div className=" third w-full h-24 my-2  lg:w-[80%]  sm:w-full  rounded-md bg-[#00DB3D] flex items-center">
              <Image src={Rocket} alt="" width={65} height={65} className="m-4" />
              <div className="flex flex-col items-start w-full">
                <p className="text-xl font-semibold ml-5">WildFire</p>
                <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
                  <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
                </div>
                <p className="text-sm ml-4">Acheived a streak</p>
              </div>
              <div className="relative -top-8 -left-2">1/3</div>
            </div>





            <div className=" third  h-24 my-2 lg:w-[80%]  sm:w-full  rounded-md bg-[#00DB3D] flex items-center">
              <Image src={Star} alt="" width={65} height={65} className="m-4" />
              <div className="flex flex-col items-start w-full">
                <p className="text-xl font-semibold ml-5">WildFire</p>
                <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
                  <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
                </div>
                <p className="text-sm ml-4">Acheived a streak</p>
              </div>
              <div className="relative -top-8 -left-2">1/3</div>
            </div>






            <div className=" third  h-24 my-2 lg:w-[80%]  sm:w-full rounded-md bg-[#00DB3D] flex items-center">
              <Image src={YChat} alt="" width={65} height={65} className="m-4" />
              <div className="flex flex-col items-start w-full">
                <p className="text-xl font-semibold ml-5">WildFire</p>
                <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
                  <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
                </div>
                <p className="text-sm ml-4">Acheived a streak</p>
              </div>
              <div className="relative -top-8 -left-2">1/3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
};

export default page;
