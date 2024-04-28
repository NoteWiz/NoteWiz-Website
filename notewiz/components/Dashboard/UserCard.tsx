"use client";

import React from "react";
import Image from "next/image";
import Clock from "@/app/(images)/Clock.png";
import Followers from "@/app/(images)/Followers.png";
import UserProfile from "@/app/(images)/UserProfile.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserCard = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  if (sessionStatus === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being loaded
  }
  if (sessionStatus === "unauthenticated") {
    return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
  }

  if (sessionStatus === "authenticated") {
    return (
      <div className="pl-custom-padding mb-10 mt-10">
        <div className="grid grid-cols-2">
          <div className=" items-center">
            <h1 className="text-xl font-bold"> Account Name</h1>
            <p className="mb-5">Username</p>
            <p> Joining Date </p>
            <p> Followers </p>
          </div>
          <div>
            <button onClick={() => signOut({ callbackUrl: "/login" })}>
              <Image src={UserProfile} alt="" width={90}></Image>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserCard;
