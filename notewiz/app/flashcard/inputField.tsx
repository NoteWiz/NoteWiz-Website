"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { Account, User as AuthUser } from "next-auth";

import { Label } from "@radix-ui/react-label";
import LoadingQuestions from "@/components/LoadingQuestions";

export const InputField = ({ setFlashCards}: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const formData = new FormData();
  const { data: session, status: sessionStatus } = useSession();
  const [value, setValue] = useState<string>("");
  const [empty, setEmpty] = useState(false);


  const handleSubmit = async () => {
    console.log(value);
    console.log(session)
    formData.append("message", value);
    formData.append("session",JSON.stringify(session))
    if (value.trim().length > 0) {
      setIsFetching(true); // Set isFetching to true before fetching
      const options = {
        method: "POST",
        body:formData,
      };
      try {
        const response = await fetch(
          "/api/flashcard",
          options
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data[0]);
        if (!Array.isArray(data)) {
          throw new Error("Response data is not an array");
        }
        setFlashCards(data[0]);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false); // Set isFetching to false after receiving the response or catching an error
      }
    } else {
      setEmpty(true);
      const notify = () =>
        toast.error("Please enter text!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      notify();
    }
  };
  return (
    <>
      {isFetching ? (
        <LoadingQuestions finished={false} />
      ) : (
        <div className="flex flex-col items-center w-[60vw] h-[60vh] gap-6">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here ..."
            required
            className="h-96 focus:border-[#00D93D] border-4 rounded-xl text-xl"
          />
          <Button
            onClick={handleSubmit}
            // className="hover: bg-[#151515] mt-6 lg:w-1/3 sm:w-1/2 md:w-1/2 rounded-xl items-center text-white border-[#00D93D] border-4 hover:bg-[#00D93D] hover:text-black py-8 text-xl"
            className="mt-6 lg:w-1/3 sm:w-1/2 md:w-1/2 bg-[#181818] border-[#00E340] border-2 hover:bg-[#00E340] hover:text-white text-white transition-all duration-300 font-bold text-xl py-8 px-6 rounded-lg"
          >
            Generate
          </Button>
          {empty ? <ToastContainer /> : null}
          </div>
      )}
      </>
  
  );
};
