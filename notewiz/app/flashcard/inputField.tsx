"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "@radix-ui/react-label";
import { ChevronsRight } from 'lucide-react';

export const InputField = ({ setFlashCards }: any) => {
  const formData = new FormData();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const handleSubmit = async () => {
    console.log(value);
    formData.append("message", value);
    if (value.trim().length > 0) {
      setLoading(true);
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
          // transition: Bounce,
        });
      notify();
    }
  };
  return (
    <div className="flex flex-col items-center w-[50vw] h-[50vh] gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message here ..."
        required
        className="h-96 focus:border-[#00D93D] border-4 rounded-xl"
      />
      <Button
        onClick={handleSubmit}
        className="hover: bg-[#151515] mt-6 lg:w-1/3 sm:w-1/2 md:w-1/2 rounded-xl items-center text-white border-[#00D93D] border-4 hover:bg-[#00D93D] hover:text-black py-8 text-xl"
      >
        Generate <ChevronsRight /> 
      </Button>
      {empty ? <ToastContainer /> : null}
      {loading ? (
        <div className="flex justify-center pt-4">
          <CircularProgress color="success" />
        </div>
      ) : null}
    </div>
  );
};
