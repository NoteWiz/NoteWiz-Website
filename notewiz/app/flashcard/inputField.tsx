"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const InputField = ({ setFlashCards }: any) => {
  const formData = new FormData();
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const handleSubmit = async () => {
    console.log(value);
    // formData.append("message", value);
    const data = { message: value };
    if (value.trim().length > 0) {
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch(
          "http://localhost:4000/flashcard",
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
        toast.warn("Please enter text!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      notify();
    }
  };
  return (
    <div className="grid w-screen gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message here."
        required
      />
      <Button onClick={handleSubmit}>Send message</Button>
      {empty ? <ToastContainer /> : null}
      {loading ? (
        <div className="flex justify-center pt-4">
          <CircularProgress color="success" />
        </div>
      ) : null}
    </div>
  );
};
