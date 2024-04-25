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

const API_KEY = "sk-proj-L7lUhXh2ZthwV27ebxXkT3BlbkFJvwS1m9crm1ymRbMSzM0S";

// Define ChatMessage interface
interface ChatMessage {
  title: string;
  role: string;
  content: string;
}

const cb = () => {
  // State variables
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<{
    role: string;
    content: string;
  } | null>(null);
  const [previousChats, setPreviousChats] = useState<ChatMessage[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setuploadStatus] = useState<String>("");
  const [Files, setFiles] = useState<File | null>(null);
  const [allImage, setAllImage] = useState("");
  // pdf file onChange state
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  // pdf file error state
  const [pdfError, setPdfError] = useState("");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // handle file onChange event
 
  

  // useEffect(()=>{
  //   getPdf()
  // },[])

  // Ref for the chat feed container
  const feedContainerRef = useRef<HTMLDivElement>(null);

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
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
        file: uploadedFiles,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:4000/connections",
        options
      );
      const data = await response.json();

      setMessage(data.choices[0].message);
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
        ...prevChats,
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
      setMessage(null);
    }
  }, [message, currentTitle, value]);

  // Filter previous chats by title
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  const submitImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("file", Files);

    try {
      const result = await fetch("http://localhost:4000/upload-files", {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
      } else {
        console.log("File upload failed:", result.status, result.statusText);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const getPdf = async () => {
    try {
      const response = await fetch("http://localhost:4000/files");
      if (!response.ok) {
        throw new Error("Failed to fetch PDF files");
      }
      const data = await response.json();
      console.log(data.data);
      setAllImage(data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
    const formData = new FormData();
    // formData.append("userInput", value);
    formData.append("file", acceptedFiles[0]); // Assuming only one file is uploaded
    console.log(formData);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("file uploaded");
      // setFileId(data.fileId);
      // console.log(response.json());
      // Handle response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // UseDropzone hook configuration
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  //   // Function to handle file upload
  //   const formData = new FormData();
  //   formData.append("pdf", selectedFiles);

  //   try {
  //     const response = await fetch("http://localhost:4000/upload", {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.text();
  //       setuploadStatus(data);
  //     } else {
  //       throw new Error("failed to upload");
  //     }
  //   } catch (error) {
  //     console.log("error uploading pdf", error);
  //   }
  // };

  // UseDropzone hook configuration
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Scroll the chat feed container to the bottom
  useEffect(() => {
    if (feedContainerRef.current) {
      feedContainerRef.current.scrollTop =
        feedContainerRef.current.scrollHeight;
    }
  }, [previousChats]);






  const handleFile=(e:any)=>{
    let selectedFiles = e.target.files[0]
    console.log(selectedFiles.type)
    if(selectedFiles)
      {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFiles)
        reader.onload=(e)=>{
          setPdfFile(e.target?.result as string|| null)
          console.log("fucking finally")
        }
      }
      else{
        console.log('please select another pdf')
      }
  }




  return (
    <div className="flex h-screen font-roboto">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-6 w-1/9 transition-transform -translate-x-full sm:translate-x-0">
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

      {/* Main Content */}
      <div className="flex-1 p-8 flex justify-between overflow-auto">
        {/* Document Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 w-90">
          <h2 className="text-2xl font-semibold mb-4">Chat with Document</h2>
          {/* <div className="border-4 border-dashed border-purple-500 rounded-lg p-8 text-center" {...getRootProps()}> */}
          {/* <input {...getInputProps()} /> */}
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
            <form
              // action="/upload-files"
              // onSubmit={submitImage}
              // method="post"
              // encType="multipart/form-data"
            >
              {/* input feild */}
              <input
                type="file"
                onChange={handleFile}
                accept="application/pdf"
                // onChange={(e)=>setFiles(e.target.files?.[0] || null)}
                name="file"
                className=" border-none text-purple-600"
              />

              {/* submit button */}
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
                // onClick={handleUpload}
                // onClick={(e)=>{
                //   handleFile
                //   e.preventDefault()
                // }}
                type="submit"
              >
                <i className="fas fa-upload mr-2"></i>
                Upload Files
              </button>
              {/* <button className="bg-black" onClick={()=>showPdf(allImage)}>Show PDF</button> */}
            </form>

          </div>
            <div>
              {pdfFile && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}></Viewer>
              </Worker>
              )}
            </div>
        </div>
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

      {/* Chat Feed and User Input */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 overflow-y-auto flex flex-col justify-between">
        <div
          ref={feedContainerRef}
          className="feed max-h-[300px] overflow-y-auto"
        >
          <ul className="feed p-0 w-full">
            {currentChat?.map((chatMessage, index) => (
              <li className="flex bg-gray-200 w-full p-4 my-4" key={index}>
                <p className="role w-32 font-semibold">{chatMessage.role}</p>
                <p className="flex-grow">{chatMessage.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* User Input */}
        <div className="flex w-full items-center space-x-2 justify-between p-2 shadow-xl">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter prompt"
          />
          <Button type="submit" onClick={getMessages}>
            Enter
          </Button>
        </div>
      {/* <button className="bg-black">Display pdf</button> */}
      {/* {pdfFile&&(
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.12/build/pdf.worker.min.js">
        <Viewer
          // fileUrl={pdfFile}
          plugins={[defaultLayoutPluginInstance]}
        ></Viewer>
      </Worker>
      )} */}
      </div>
    </div>
    // </div>
  );
};

export default cb;
