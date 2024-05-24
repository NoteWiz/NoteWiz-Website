"use client"
import React from "react";
import Sidebar from "../../components/FuncSidebar/S";
import Image from "next/image";
import First from "@/assets/icons/first-cont.png";
import Second from "@/assets/icons/second-cont.png";
import Third from "@/assets/icons/third-cont.png";
import Fourth from "@/assets/icons/fourth-cont.png";
import { useRouter } from "next/router";
import { CircleArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import prisma from "@/prisma";
import  { useState, useEffect ,useMemo} from "react";
import { useSession } from "next-auth/react";
import UserCard from "../Dashboard/UserCard";
type User = {
  id: string;
  username: string | null;
  password: string;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
};

const Homepage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  // const memoizedUserData = useMemo(() => userData, [userData]);
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (session?.user) {
  //       const { email } = session.user;
  //       const response = await fetch(`/api/user?email=${email}`)
  //       if (response.ok) {
  //         try {
  //           const data = await response.json();
  //           setUserData(data);
  //         } catch (error) {
  //           console.error('Error parsing JSON response:', error);
  //         }
  //       } else {
  //         try {
  //           const errorData = await response.json();
  //           console.error('Error fetching user data:', errorData?.message);
  //         } catch (error) {
  //           console.error('Error parsing error response:', error);
  //         }
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [session]);
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[0px]">

      
      <div className="container flex flex-col  pl-[100px]">
        <div className="first-container w-[90%] rounded-lg h-60 mt-11 border-green-500 border- ">
          <div className="first-container-fill w-full h-full rounded-2xl bg-[#6DB9FB] hover:bg-[#37A2FF] transition-all flex flex-row justify-between">
            <div className="text-heading mt-6 ml-3 ">
              <p className="text-1xl p-4">Welcome Back</p>
              <p className="text-3xl font-medium ml-4 border-green-500 border-">
               {session?.user?.name }
              </p>
                <Link href="/cb">
              <p className=" text-sm font-light ml-4 border-green-500 border- mt-5 flex align-bottom hover:underline  transition-all cursor-pointer">
                Browse through previous chats{" "}
                <CircleArrowRight
                  size={17}
                  strokeWidth={1}
                  className="ml-3 align-bottom"
                />
              </p>
              </Link>
            </div>
            <div className="relative border-green-500 -top-16 -left-12">
              <Image
                src={First}
                alt=""
                width={340}
                height={500}
                className=" overflow-visible z-10"
              />
            </div>
          </div>
        </div>

        <div className="second-parent-container flex flex-row">
          <div className="second-container w-[50%] h-60 rounded-xl mt-4 mr-2 ">
            <Link href="/cb">
              <div className="second-container-fill w-full h-full rounded-xl bg-[#6DB9FB] flex flex-row justify-between hover:border-[#6DB9FB] border-2 before:border-none` hover:bg-white transition-all cursor-pointer">
                <div className="text-heading pl-4 pt-11  border-green-500">
                  <p className="text-3xl font-medium  mt-7  flex  border-green-500 border- flex-row">
                    Chat with Document
                  </p>
                </div>
                <div className="relative border-green-500 top-3 left-1 right-10">
                  <Image
                    src={Second}
                    alt=""
                    width={230}
                    height={220}
                    className=" overflow-visible z-10"
                  />
                  <div>
                    {/* <ArrowUpRight
                      size={50}
                      className="absolute top-16 right-60"
                    /> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="third-container w-[40%] h-60 rounded-xl mt-4 ">
            <Link href="/quiz-dashboard">
            <div className="third-container-fill w-full h-full rounded-xl bg-[#6DB9FB] flex flex-row justify-evenly hover:border-[#6DB9FB] border-2 before:border-none hover:bg-white transition-all cursor-pointer">
              <div className="text-heading  pt-11  border-green-500 border-">
                <div className="pr-20">

                <p className="text-3xl font-medium  mt-7  pr-5 border-green-500 border- text-balance">
                  Quiz
                </p>
                <span className=" block text-3xl font-medium">Section</span>
                </div>
              </div>
              <div className="relative border-green-500 top-3 left-1 right-10">
                <Image
                  src={Third}
                  alt=""
                  width={200}
                  height={200}
                  className=" overflow-visible z-10"
                />
                <div>
                  {/* <ArrowUpRight
                    size={50}
                    className="absolute top-16 right-60"
                  /> */}
                </div>
              </div>
            </div>
            </Link>
          </div>
        </div>
        <Link href="/flashcard">
        <div className="fourth-container-fill w-[90%] h-60 rounded-2xl bg-[#FEAFFF] flex flex-row justify-between mt-3 mb-3 cursor-pointer hover:bg-[#FC64FF] transition-all">
          <div className="text-heading mt-6 ml-3 ">
            <p className="text-3xl font-medium ml-4 mt-[77px] border-green-500 transition-all">
              Generate Flashcards
            </p>
            <div className="">
              {/* <ArrowUpRight
                size={50}
                className="absolute right-[52rem] bottom-[45px]"
              /> */}
            </div>
          </div>
          <div className="relative border-green-500 -top- -left-12">
            <Image
              src={Fourth}
              alt=""
              width={240}
              height={240}
              className=" overflow-visible z-10"
            />
          </div>
        </div>
        </Link>
      </div>
    </div>
    {/* <UserCard /> */}
    </div>
  );
};
export default Homepage;
