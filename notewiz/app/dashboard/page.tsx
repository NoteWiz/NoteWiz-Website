"use client";
import ACard from "@/components/Dashboard/ACard";
import SCard from "@/components/Dashboard/SCard";
import UserCard from "@/components/Dashboard/UserCard";
import { Router } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/FuncSidebar/S";
export default function page() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  if (sessionStatus === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being loaded
  }
  if (sessionStatus === "unauthenticated") {
    router.replace("login");
    return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
  }
  if (sessionStatus === "authenticated") {
    return (
      <div className="flex bg-[#252525]">
        <Sidebar />
        <div className="ml-[90px] mt-16"> 
        <h1 className="text-3xl flex my-3 justify-start pl-[20px] font-semibold text-white">
          Statistics
        </h1>
        <SCard />
        <h1 className="text-3xl my-2  flex justify-start pl-[20px] font-bold  text-white ">
          {" "}
          Achievements
        </h1>
        <ACard />
        {/* <ACard /> */}
        {/* <ACard /> */}
      </div>
      </div>
    );
  }
}
