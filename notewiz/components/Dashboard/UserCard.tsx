"use client";

import React from "react";
import Image from "next/image";
import Clock from "@/app/(images)/Clock.png";
import Followers from "@/app/(images)/Followers.png";
import UserProfile from "@/app/(images)/UserProfile.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Avatar from "@/assets/icons/big.png"

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
      <div className="pl-custom-padding mb-10 mt-10 ">
        <div className="flex flex-row justify-between w-[60%] ">
          <div>
            <h1 className="text-2xl font-bold "> Account Name</h1>
            <p className="mb-5">Username</p>
            <p> Joining Date </p>
            <p> Followers </p>
          </div>
          <div>
            <button onClick={() => signOut({ callbackUrl: "/login" })}>
              <Image src={Avatar} alt="" width={150} height={90}></Image>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserCard;
