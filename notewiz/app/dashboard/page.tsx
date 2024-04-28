"use client";
import ACard from "@/components/Dashboard/ACard";
import SCard from "@/components/Dashboard/SCard";
import UserCard from "@/components/Dashboard/UserCard";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Router } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
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
      <div>
        <Sidebar />
        <UserCard />
        <h1 className="text-xl my-5  flex justify-start pl-custom-padding">
          {" "}
          Achievements
        </h1>
        <ACard />
        <ACard />
        <ACard />
        <ACard />
        <h1 className="text-xl flex my-5 justify-start pl-custom-padding">
          {" "}
          Statistics
        </h1>
        <SCard />
      </div>
    );
  }
}
