"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiCards } from "react-icons/pi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdHomeMax } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Loading } from "react-loading-dot";
import { FaArrowUp } from "react-icons/fa6";

// Define ChatMessage interface
interface ChatMessage {
  title: string;
  role: string;
  content: string;
}

const cb = () => {
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(false);

  const handleClickSidebar = (route: string) => {
    router.push(route);
  };
  let clicked = false;
  const [fileId, setFileId] = useState<string | null>(null);
  // State variables
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<{
    role: string;
    content: string;
  } | null>(null);
  const [previousChats, setPreviousChats] = useState<ChatMessage[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [render, setRender] = useState(false);
  // Ref for the chat feed container
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  //Toast function
  const notify = () => toast.success("File successfully uploaded!");
  // Function to reset chat state
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle("");
    setPdfFile(null);
  };

  // Function to define new chat
  const handleClick = (uniqueTitle: any) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  // Function to fetch messages
  const getMessages = async () => {
    setIsTyping(true);
    const formData = new FormData();
    formData.append("message", value);

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch("http://localhost:4000/upload", options);
      const data = await response.json();
      console.log(data.messages);

      setMessage({ role: "Assistant", content: data.messages });
      setIsTyping(false);
    } catch (error) {
      console.log(error);
      setIsTyping(false);
    }
  };

  // Effect hook to handle new messages and assign titles
  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...previousChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
      // Update the message state to null after processing
      setMessage(null); //very imp
    }
  }, [message, currentTitle, value]);

  // Filter previous chats by title
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  // Function to handle file upload

  const onDrop = async (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
    const formData = new FormData();

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const isPDF = true;

      if (isPDF) {
        formData.append("file", file);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setPdfFile((e.target?.result as string) || null);
          console.log("PDF rendered successfully");
          notify(); // Call notify function after successful PDF rendering
          console.log(acceptedFiles[0]);
        };

        try {
          const response = await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log("File uploaded");
          // Handle response as needed
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        console.log("Please select a PDF file");
        toast.error("Error uploading file: Only PDF files are allowed");
      }
    } else {
      console.log("Please select a file");
      toast.error("Error uploading file");
    }
  };

  // UseDropzone hook configuration
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Scroll the chat feed container to the bottom
  useEffect(() => {
    if (feedContainerRef.current) {
      feedContainerRef.current.scrollTop =
        feedContainerRef.current.scrollHeight;
    }
  }, [previousChats]);

  return (
    <div className="flex h-screen font-roboto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="bg-[#0074D9] text-white p-6 w-1/6 transition-transform -translate-x-full sm:translate-x-0 flex flex-col justify-between">
        <div>
          <button
            onClick={createNewChat}
            className="bg-[#FFF67A] hover:bg-[#ffea00] text-black font-bold py-2 px-4 rounded mb-6 w-full"
          >
            <i className="fas fa-comment-dots mr-2"></i>
            New Chat
          </button>
          <nav>
            <ul className="history">
              {uniqueTitles?.map((uniqueTitle, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(uniqueTitle)}
                  className="py-2 px-4 rounded hover:bg-[#FFF67A] hover:text-black cursor-pointer transition-colors duration-200"
                >
                  {uniqueTitle}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-inherit hover:bg-[#ffea00] text-white hover:text-black font-bold py-2 px-4 rounded mb-2 w-full flex items-center gap-4"
            onClick={() => handleClickSidebar("/practice")}
          >
            <div className="flex flex-col items-center">
              <MdOutlineQuiz className="h-6 w-6" />
            </div>
            <div className="flex flex-col ">Quiz</div>
          </button>
          <button
            className="bg-inherit hover:bg-[#ffea00] text-white hover:text-black font-bold py-2 px-4 rounded mb-2 w-full flex items-center gap-4"
            onClick={() => handleClickSidebar("/flashcard")}
          >
            <div className="flex flex-col items-center">
              <PiCards className="h-6 w-6" />
            </div>
            <div className="flex flex-col">Flashcards</div>
          </button>
          <button
            className="bg-inherit hover:bg-[#ffea00] text-white hover:text-black font-bold py-2 px-4 rounded mb-2 w-full flex items-center gap-4"
            onClick={() => handleClickSidebar("/dashboard")}
          >
            <div className="flex flex-col items-center">
              <MdOutlineSpaceDashboard className="h-6 w-6" />
            </div>
            <div className="flex flex-col">Dashboard</div>
          </button>
          <button
            className="bg-inherit hover:bg-[#ffea00] text-white hover:text-black font-bold py-2 px-4 rounded mb-2 w-full flex items-center gap-4"
            onClick={() => handleClickSidebar("/home")}
          >
            <div className="flex flex-col items-center">
              <MdHomeMax className="h-6 w-6" />
            </div>
            <div className="flex flex-col">Home</div>
          </button>
          <button
            className="bg-inherit hover:bg-[#ffea00] text-white hover:text-black font-bold py-2 px-4 rounded mb-2 w-full flex items-center gap-4"
            onClick={() => handleClickSidebar("/dashboard")}
          >
            <div className="flex flex-col items-center">
              <MdOutlineAccountCircle className="h-6 w-6" />
            </div>
            <div className="flex flex-col">Account</div>
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 flex justify-between overflow-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 mr-4 overflow-y-auto">
          {pdfFile ? (
            <div {...getRootProps()}>
              <input {...getInputProps()} onClick={notify} />
              <button className="bg-[#FFF67A] hover:bg-[#ffea00] text-black font-bold py-3 px-6 rounded-lg">
                <i className="fas fa-upload mr-2"></i>
                Upload Files
              </button>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfFile}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Chat with Document
              </h2>

              <div
                className="border-4 border-dashed border-[#ffea00] rounded-lg p-8 text-center cursor-pointer"
                // onClick={notify}
                {...getRootProps()}
              >
                <input {...getInputProps()} onClick={notify} />

                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#ffea00]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      className=" cursor-pointer"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  Click to Upload or Drop PDF here
                </p>

                <div className="flex justify-center space-x-4 ">
                  <button className="bg-[#FFF67A] hover:bg-[#ffea00] text-black font-bold py-3 px-6 rounded-lg">
                    <i className="fas fa-upload mr-2"></i>
                    Upload Files
                  </button>
                </div>
              </div>
            </>
          )}

          {uploadedFiles.some((file) => file.type === "application/pdf") && (
            <div className="mt-4">
              <h4 className="text-lg font-bold">Uploaded Files</h4>
              <ul className="list-disc list-inside">
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-[#80C4FF] rounded-lg shadow-lg p-4 w-1/2 overflow-y-auto flex flex-col justify-between">
          <div
            ref={feedContainerRef}
            className="feed h-[80vh] overflow-y-auto rounded-lg bg-white p-4"
          >
            <ul className="feed p-0 w-full">
              {isTyping && (
                <li className="flex w-full my-2 justify-start">
                  <Loading background={"#0074D9"} />
                  {/* or your custom typing indicator component */}
                </li>
              )}
              {currentChat?.map((chatMessage, index) => (
                <li
                  className={`flex w-full my-2 ${
                    chatMessage.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  key={index}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[70%] ${
                      chatMessage.role === "user"
                        ? "bg-[#e6f3ff] text-[#0074D9]"
                        : "bg-[#fffccc] text-black"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`font-bold ${
                          chatMessage.role === "user"
                            ? "text-[#0074D9]"
                            : "text-black"
                        }`}
                      >
                        {chatMessage.role === "user" ? "You" : "Assistant"}
                      </span>
                    </div>
                    <p>{chatMessage.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full items-center space-x-2 justify-between p-2 mt-4 bg-gray-100 rounded-lg">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter prompt"
              className="flex-grow"
            />
            <Button
              type="submit"
              onClick={getMessages}
              className="bg-[#FFF67A] text-black hover:bg-[#ffea00]"
            >
              <FaArrowUp />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cb;
