"use client";

import React from "react";
import Image from "next/image";
import GoogleIcon from "./google.png";
import Logo from "./notewiz logo.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "@/utils/Loading";

const SignInComponent = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/home");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(res)
    if (res?.error) {
      setLoading(false)
      setError("Invalid email or password");
    } else {
      setError("");
      setLoading(false)
      if (res?.url) router.replace("/dashboard");
    }
    if (sessionStatus === "loading") {
      return (<Loading loading={true}/>);
    }
  };
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col h-screen justify-center items-center bg-blue-400 max-h-screen" >
        {loading? (<Loading loading={loading}/>):(<section className="flex flex-col items-center justify-evenly ">
          <div className="bg-white rounded-lg shadow-lg p-12 md:p-16 lg:p-18 max-h-screen max-w-xl  mx-auto w-[50vw] h-[70vh] lg:h-[94vh]">
            <h3 className="mb-4 px-3 font-semibold text-3xl text-black">
              Login to your account:
            </h3>
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 bg-white text-blue-600 font-medium rounded-lg py-3 shadow-md hover:bg-gray-100 mb-4"
              onClick={() => signIn("google")}
            >
              <Image
                src={GoogleIcon}
                alt="Google Icon"
                width={24}
                height={24}
              />
              <span className="ml-2">Sign in with Google</span>
            </button>
            <div className="flex items-center mb-6">
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              <span className="mx-4 text-sm text-gray-700 dark:text-gray-400">
                or
              </span>
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            </div>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:text-primary-500 dark:focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-900 dark:text-white"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg py-3 ">
                Sign in
              </button>
              <p className="text-red-600 text-[16px] ">{error && error}</p>
            </form>
            <div className="flex flex-col items-center justify-between mt-8 mb-4 ">
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  href="/signup"
                  className="text-pink-400 hover:underline font-bold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </section>)}
        {/* Sign-in */}
        
      </div>
    )
  );
};

export default SignInComponent;
