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
import LoginImg from "@/assets/LoginPage.svg";

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

  const isValidEmail = (email:any) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e:any) => {
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
    console.log(res);
    if (res?.error) {
      setLoading(false);
      setError("Invalid email or password");
    } else {
      setError("");
      setLoading(false);
      if (res?.url) router.replace("/dashboard");
    }
    if (sessionStatus === "loading") {
      return <Loading loading={true} />;
    }
  };
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : sessionStatus !== "authenticated" && (
        <div className="flex flex-col md:flex-row h-screen justify-center items-center bg-[#252525] py-10">
          <div className="bg-[#181818] flex flex-col md:flex-row gap-36 rounded-xl max-w-[90vw] md:max-w-none md:h-[90vh] md:my-0 my-10 mx-auto">
            <div className="hidden md:flex">
              <Image src={LoginImg} alt="" width={500} />
            </div>
            <section className="flex flex-col items-center justify-evenly md:m-0 m-auto md:w-auto w-full z-0">
              <div className="rounded-lg p-12 lg:p-18 max-h-screen max-w-xl mx-auto lg:h-[94vh] md:h-full md:w-auto w-full md:p-12 p-6">
                <h3 className="mb-2 font-semibold text-5xl text-white tracking-tighter text-center md:text-5xl text-3xl">
                  Welcome Back
                </h3>
                <p className="text-white text-lg tracking-tighter text-center mb-3">
                  Login to Continue
                </p>
                <button
                  type="button"
                  className="w-full flex items-center justify-center border-2 border-[#00D93D] hover:bg-black transition-all duration-300 font-medium rounded-lg py-3 mb-4"
                  onClick={() => signIn("google")}
                >
                  <Image
                    src={GoogleIcon}
                    alt="Google Icon"
                    width={24}
                    height={24}
                  />
                  <span className="ml-2 text-white tracking-tighter">
                    Sign in with Google
                  </span>
                </button>
                <div className="flex items-center mb-6">
                  <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                  <span className="mx-4 text-sm text-white dark:text-gray-400">
                    or
                  </span>
                  <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                </div>
                <form
                  className="space-y-8 md:space-y-8 space-y-2"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
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
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* <input
                        id="remember"
                        aria-describedby="remember"
                        type="radio"
                        className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:text-primary-500 dark:focus:ring-blue-500"
                      /> */}
                      {/* <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-white dark:text-white"
                      >
                        Remember me
                      </label> */}
                    </div>
                    <Link
                      href="#"
                      className="text-sm text-white hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button className="w-full bg-black border-2 border-black hover:border-[#00D93D] hover:border-2 transition-all duration-300 text-white font-medium rounded-lg py-3">
                    Sign in
                  </button>
                  <p className="text-red-600 text-[16px]">
                    {error && error}
                  </p>
                </form>
                <div className="flex flex-col items-center justify-between mt-8 mb-4">
                  <p className="text-sm text-white dark:text-gray-400">
                    Don't have an account yet?
                    <Link
                      href="/signup"
											  className="text-[#00D93D] font-semibold tracking-tight underline"
											  >
											  Sign up
											</Link>
										  </p>
										</div>
									  </div>
									</section>
								  </div>
								</div>
							  )}
							  {/* Sign-in */}
							</>
						  );
						};
						
						export default SignInComponent;