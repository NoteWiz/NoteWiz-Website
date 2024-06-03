"use client";
import React, { useState } from "react";
import Cb from "../chat/cb";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/utils/Loading";
export default function page() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(true);
  
  if (sessionStatus === "loading") {
    return( <Loading loading={loading}/>)  // Show a loading state while session is being loaded
  }
  
  else if (sessionStatus === "unauthenticated") {
    router.push("login");
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
