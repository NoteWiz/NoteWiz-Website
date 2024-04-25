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
// Define ChatMessage interface

interface ChatMessage {
  title: string;
  role: string;
  content: string;
}

const cb = () => {
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

  // Function to reset chat state
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle("");
  };

  // Function to define new chat
  const handleClick = (uniqueTitle: any) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  // Function to fetch messages
  const getMessages = async () => {
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
    } catch (error) {
      console.log(error);
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
    formData.append("file", acceptedFiles[0]); // Assuming only one file is uploaded
    console.log(formData);
    if (acceptedFiles) {
      let reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = (e) => {
        setPdfFile((e.target?.result as string) || null);
        console.log("fucking finally");
        console.log(acceptedFiles[0]);
      };
    } else {
      console.log("please select another pdf");
    }

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("file uploaded");
      // Handle response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
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
      <div className="bg-gray-800 text-white p-6 w-1/6 transition-transform -translate-x-full sm:translate-x-0">
        <button
          onClick={createNewChat}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-6 w-full"
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
                className="py-2 px-4 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                {uniqueTitle}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-8 flex justify-between overflow-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 mr-4 overflow-y-auto">
          {pdfFile ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Chat with Document
              </h2>

              <div
                className="border-4 border-dashed border-purple-500 rounded-lg p-8 text-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  Click to Upload or Drop PDF/DOC here
                </p>

                <div className="flex justify-center space-x-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
                    <i className="fas fa-upload mr-2"></i>
                    Upload Files
                  </button>
                </div>
              </div>
            </>
          )}

          {uploadedFiles.length > 0 && (
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

        <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 overflow-y-auto flex flex-col justify-between">
          <div
            ref={feedContainerRef}
            className="feed h-[80vh] overflow-y-auto rounded-lg bg-gray-100 p-4"
          >
            <ul className="feed p-0 w-full">
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
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`font-bold ${
                          chatMessage.role === "user"
                            ? "text-purple-600"
                            : "text-gray-600"
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
            <Button type="submit" onClick={getMessages}>
              Enter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cb;
