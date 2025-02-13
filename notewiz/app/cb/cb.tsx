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
import { StepForward } from 'lucide-react';
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import {Chatbot} from "@prisma/client"
import CB_S from "./cbSidebar";

// Define ChatMessage interface
interface ChatMessage {
  title: string;
  role: string;
  content: string;
}
const cb = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const chatbots: Chatbot[] = session && Array.isArray(session.user?.chatbots) ? session.user.chatbots : [];
  const [error, setError] = useState("");
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(false);
  // State variables
  const [value, setValue] = useState("");
  const [isNewChat, setIsNewChat] = useState(true); // New state to track if it's a new chat
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string|null>(null);
  // const [previousChats, setPreviousChats] = useState < {[title:string]}:ChatMessage[]>({});
  const [previousChats, setPreviousChats] = useState<{ [title: string]: ChatMessage[] }>({});
  const [currentTitle, setCurrentTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [render, setRender] = useState(false);
  // Ref for the chat feed container
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  //Toast function
  const notify = () => toast.success("File uploaded successfully!");
  // Function to reset chat state
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle("");
    setPdfFile(null);
    setIsNewChat(true);
    setCurrentChatId(null) ; 
  };

  // Function to define new chat
  const handleClickTitle = (uniqueTitle: any) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
    // setCurrentChatId(uniqueTitle);
    const chatMessages = previousChats[uniqueTitle];
    if (chatMessages && chatMessages.length > 0) {
      setCurrentChatId(chatMessages[0].title); // Assuming the title is used as chatId
    }
    setIsNewChat(false); // Ensure this chat is marked as not new
  }
  var Newfile:File
  // Function to fetch messages
  const getMessages = async () => {
    const formData = new FormData(); 
    setIsTyping(true);
    formData.append("session",JSON.stringify(session))
    formData.append("message", value);
    if (isNewChat) {
      formData.append("title", value);
    } else {
      formData.append("title", currentTitle);
      formData.append("threadId", currentChatId || ""); 
    }
    if (file) {
      formData.append("file", file as Blob);
      setFile(null);
    }
    

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch("/api/chatbot", options);
      const data = await response.json();
      if (!response.ok) {
        setMessage({title:currentTitle, role: "Assistant", content: "Sorry, something went wrong!"});
      } else {
        
        console.log(data.messages);
        let AssistantResponse = data.messages;
        setMessage({title:currentTitle, role: "Assistant", content:AssistantResponse });
        if (isNewChat) {
          setCurrentTitle(value);
          setIsNewChat(false); // Mark that the chat is no longer new after the first message
          setCurrentChatId(data.threadId);
        }
      }
      setIsTyping(false);
    } catch (error) {
      console.log(error);
      setIsTyping(false);
    }
  };
  useEffect(() => {
    const fetchChats = async () => {
      if (session && Array.isArray(session.user.chatbots) && session.user.chatbots.length > 0) {
        try {
          const chats = await Promise.all(
            session.user.chatbots.map(async (chat) => {
              const response = await fetch(`/api/chatbot?id=${chat.id}&title=${value}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              return data;
              
            })
          );
          const allChats = Object.assign({}, ...chats); 
          setPreviousChats(allChats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
      else {
        // If there are no chatbots for the user, reset the previousChats state
        setPreviousChats({});
      }
    };

    fetchChats();
    return () => {
      setPreviousChats({});
    };
  }, [session, currentChatId]);
    if (message) {
      setPreviousChats((prevChats) => {
        const updatedChats = { ...prevChats };
        if (!updatedChats[currentTitle]) {
          updatedChats[currentTitle] = [];
        }
        const existingMessage = updatedChats[currentTitle].find(
          (msg) =>
            msg.role === message.role &&
            msg.content === message.content
        );
        
        if (!existingMessage) {
          updatedChats[currentTitle].push({
            title: currentTitle,
            role: "user",
            content: value,
          }, message);
        }
        
        return updatedChats;
       
      });
      setMessage(null);
      setValue("");
    }
    useEffect(() => {

    if (feedContainerRef.current) {

      feedContainerRef.current.scrollTop = feedContainerRef.current.scrollHeight;

    }

  }, [previousChats]);

  // Filter previous chats by title
  const currentChat = previousChats[currentTitle] || [];



  const uniqueTitles = Object.keys(previousChats);

  // Function to handle file upload

  const onDrop = async (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      const isPDF = true;

      if (isPDF) {
       
        // formData.append("userInput", value);
        // console.log(formData);
        if(selectedFile){

          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = (e) => {
            setPdfFile((e.target?.result as string) || null);
            console.log("PDF rendered successfully");
            notify(); // Call notify function after successful PDF rendering
            console.log(selectedFile);
          };
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
    <div className="flex h-screen font-roboto bg-[#252525]">
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      
      <CB_S
        createNewChat={createNewChat}
        handleClickTitle={handleClickTitle}
        uniqueTitles={uniqueTitles}
      />

      <div className="flex-1 p-8 flex justify-between overflow-auto bg-[#252525]">
        <div className="bg-[#252525] rounded-lg shadow-lg p-4 w-1/2 mr-4 overflow-y-auto">
          {pdfFile ? (
             <>
             <button
               {...getRootProps()}
               className="bg-[#181818] border-[#00E340] border-2 hover:bg-[#00E340] hover:text-white text-white transition-all duration-300 font-bold py-3 px-6 rounded-lg mb-4"
             >
               <input {...getInputProps()} />
               <i className="fas fa-upload mr-2"></i>
               Upload Files
             </button>
             <div>
               <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                 <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
               </Worker>
             </div>
           </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Chat with Document
              </h2>

              <div
                className="border-4 border-dashed border-[#00E340] rounded-lg p-8 text-center cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#00E340]"
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
                <p className="text-white mb-4">
                  Click to Upload or Drop PDF here
                </p>

                <div className="flex justify-center space-x-4 ">
                  <button className="bg-[#181818] border-[#00E340] border-2 hover:bg-[#00E340] hover:text-white text-white transition-all duration-300 font-bold py-3 px-6 rounded-lg">
                    <i className="fas fa-upload mr-2"></i>
                    Upload Files
                  </button>
                </div>
              </div>
            </>
          )}

          {uploadedFiles.some((file) => file.type === "application/pdf") && (
            <div className="mt-4">
              <h4 className="text-lg font-bold text-[#00E340]">Uploaded Files</h4>
              <ul className="list-disc list-inside text-white">
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-[#252525] rounded-lg shadow-lg p-4 w-1/2 overflow-y-auto flex flex-col justify-between border-2 border-black">
          <div
            ref={feedContainerRef}
            className="feed h-[80vh] overflow-y-auto rounded-lg bg-[#181818] p-4"
          >
            <ul className="feed p-0 w-full">
              {isTyping && (
                <li className="flex w-full my-2 justify-start">
                  <Loading background={"#00E340"} />
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
                        ? "bg-[#252525] text-white"
                        : "bg-[#252525] text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`font-bold ${
                          chatMessage.role === "user"
                            ? "text-[#00E340]"
                            : "text-[#00E340]"
                        }`}
                      >
                        {chatMessage.role === "user" ? "You" : "Assistant"}
                      </span>
                    </div>
                    <p className="leading-loose white-space-pre-wrap">
                      {chatMessage.content}
                      </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full items-center space-x-2 justify-between p-2 mt-4 bg-gray-100 rounded-lg">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-grow"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getMessages();
                }
              }}
            />
            <Button
              type="submit"
              onClick={getMessages}
              className="bg-[#181818]"
            >
              <StepForward className="transform -rotate-90" color="#00E340" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cb;