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
import CB_S from "./chatbotSidebar";

// Define ChatMessage interface
interface ChatMessage {
  title: string;
  role: string;
  content: string;
}
const ChatBot = () => {
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
//   const notify = () => toast.success("File successfully uploaded!");
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
      const response = await fetch("/api/chatOnly", options);
      const data = await response.json();
      if (!response.ok) {
        setMessage({title:currentTitle, role: "Assistant", content: "Sorry, something went wrong!"});
      } else {
        
        console.log(data.content);
        let AssistantResponse = data.content;
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
      if (
        session &&
        Array.isArray(session.user.chatOnlyBots) &&
        session.user.chatOnlyBots.length > 0
      ) {
        try {
          const chats = await Promise.all(
            session.user.chatOnlyBots.map(async (chat) => {
              const response = await fetch(
                `/api/chatOnly?id=${chat.id}&title=${value}`
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
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
      } else {
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
        
        if (true) {
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

      
      <CB_S
        createNewChat={createNewChat}
        handleClickTitle={handleClickTitle}
        uniqueTitles={uniqueTitles}
      />

      <div className="flex-1 p-8 flex justify-between overflow-auto bg-[#252525]">
        <div className="bg-[#252525] rounded-lg shadow-lg p-4 w-full overflow-y-auto flex flex-col justify-between border-2 border-black">
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
                      {chatMessage.content.replace(/[#*`~]/g, "")}
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

export default ChatBot;