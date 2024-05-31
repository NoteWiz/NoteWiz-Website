"use client";
import Image from "next/image";
import Logo from "./notewiz logo.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import Image1 from "@/assets/SignUp Page.svg"
const SignUpComponent = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
    if (sessionStatus === "loading") {
      return <h1>Loading...</h1>;
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex  h-screen justify-center items-center bg-[#252525]">
        {/* Navbar */}
        {/* <nav className="bg-[#FFE57D] py-4 fixed w-full z-10 top-12 rounded-3xl mx-auto max-w-4xl">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center">
                  <Image src={Logo} alt="Logo" width={30} height={30} />
                  <span className="text-2xl font-semibold ml-2 hover:underline">
                    NoteWiz
                  </span>
                </div>
              </Link>
            </div>
            <Link href="#" className="text-lg hover:underline">
              Link 1
            </Link>
            <Link href="#" className="text-lg hover:underline">
              Link 2
            </Link>
            <Link href="#" className="text-lg hover:underline">
              Link 3
            </Link>
            <button className="bg-black hover:bg-white hover:text-black text-white rounded-full font-medium py-2 px-6">
              Call to Action
            </button>
          </div>
        </nav> */}

        {/* Sign-up */}
        <div className="flex flex-row bg-[#181818] rounded-xl">

        <section className="flex flex-col items-center justify-center ">
          <div className=" rounded-lg  p-10 md:p-14 lg:p-18 h-[87vh] w-[40vw]">
            <h3 className="mb-6 px-1 font-bold text-5xl text-white tracking-tighter w-[80%] text-left">
              Make your first mark in learning!
            </h3>
            <form className="space-y-6 " onSubmit={handleSubmit} >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="name"
                  className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
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
                  className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 form-control"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full shadow-md bg-black hover:border-2 hover:border-[#00D93D] border-2 border-black transition-all duration-300 text-white font-medium rounded-lg py-3"
              >
                Sign up
              </button>
            </form>
            <div className="mt-5 text-center ">
              <p className="text-sm text-white dark:text-gray-400 tracking-tight">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#00D93D] hover:underline font-semibold tracking-tight underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
        <div className="image flex m-10">
          <Image src={Image1} alt="" width={500} height={200}/>
        </div>
        </div>

      </div>
    )
  );
};

export default SignUpComponent;
