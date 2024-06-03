"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Clock from "@/app/(images)/Clock.png";
import Followers from "@/app/(images)/Followers.png";
import UserProfile from "@/app/(images)/UserProfile.png";
import { useSession, signIn, signOut, } from "next-auth/react";
import { useRouter } from "next/navigation";
import Avatar from "@/assets/icons/big.png"
import { useState, useMemo } from "react";
import type { User } from "next-auth"
import { Account, User as AuthUser } from "next-auth";
// type User = {
//   id: string;
//   username: string | null;
//   password: string;
//   email: string | null;
//   emailVerified: Date | null;
//   image: string | null;
// };
// type Props = {
//   user: Pick<User, "name" | "image" | "email">;
// };

const UserCard = ({ user }: { user: AuthUser }) => {
  console.log(user?.email)
  const { data: session, status: sessionStatus } = useSession();
  console.log(session)
  // const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const memoizedUserData = useMemo(() => userData, [userData]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const cachedUserData = localStorage.getItem("userData");
  //     if (cachedUserData) {
  //       setUserData(JSON.parse(cachedUserData));
  //     }
  //     else if(session?.user) {
  //       const { email } = session.user;
  //       const response = await fetch(`/api/user?email=${email}`)
  //       if (response.ok) {
  //         try {
  //           const data = await response.json();

            const cleanImageUrl = session?.user?.image?.split('=')[0];
  //           setUserData({ ...data, image: cleanImageUrl });
  //           localStorage.setItem("userData", JSON.stringify(data));
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
  const router = useRouter();
  
  
  if (sessionStatus === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being loaded
  }
  if (sessionStatus === "unauthenticated") {
    return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
  }

  if (sessionStatus === "authenticated") {
    return (
      <div className="pl-[250px] mb-10 mt-10 ">
        <div className="flex flex-row justify-between w-[60%] ">
          <div>
            <h1 className="text-2xl font-bold "> Account Name</h1>
            <p className="mb-5">{ session?.user?.name}</p>
            <p> Joining Date </p>
            <p> Followers </p>
          </div>
          <div>
            <button onClick={() => signOut({ callbackUrl: "/login" })}>
              <img src={session?.user?.image?.split('=')[0] ?? ''} alt="" width={100} height={100} className="rounded-full" ></img>
              
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserCard;
