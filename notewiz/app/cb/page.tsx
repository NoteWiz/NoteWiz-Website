"use client";
import React from "react";
import Cb from "@/app/cb/cb";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  
  if (sessionStatus === "loading") {
    return <div>Loading...</div>; // Show a loading state while session is being loaded
  }
  
  else if (sessionStatus === "unauthenticated") {
    // router.replace("login");
    return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
  }
  
  if (session && sessionStatus === "authenticated") {
    return (
      <>
        <Cb />
      </>
    );
  }
}
