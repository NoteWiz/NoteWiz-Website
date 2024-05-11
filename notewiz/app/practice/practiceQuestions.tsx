"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizPlayer from "./QuizPlayer";

const QuestionGenerator = () => {
  const [error, setError] = useState<string | null>(null);
  // const [isFileUploading, setIsFileUploading] = useState(false);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 3000); // Clear the error after 3 seconds
  };

  const [activeSection, setActiveSection] = useState("Text");
  const [inputError, setInputError] = useState<string | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<string>("Multiple Choice");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Easy");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState<number>(2);
  const [textValue, setTextValue] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [acceptedFile, setAcceptedFile] = useState<File | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const numericValue = parseInt(value);

    if (
      value === "" ||
      numericValue < 1 ||
      numericValue > 10 ||
      isNaN(numericValue)
    ) {
      setInputError("Please enter a number between 1 and 10");
    } else {
      setInputError(null);
      setSelectedNumQuestions(numericValue);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleQuestionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedQuestionType(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
  };

  const TextSection = () => {

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setTextValue(value);
    };

    const isTextValid = textValue.length <= 2000;
    // const textAreaRef = useRef<HTMLTextAreaElement>(null);
    // const [textAreaValue, setTextAreaValue] = useState('');

    // useEffect(() => {
    //   if (textAreaRef.current) {
    //     textAreaRef.current.focus();
    //   }
    // }, []);

    // const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   const newValue = e.target.value;
    //   setTextAreaValue(newValue);
    //   setTextValue(newValue);
    // };

    // const handleTextAreaBlur = () => {
    //   setTextValue(textAreaValue);
    // };

    // const isTextValid = textValue.length <= 2000;

    return (
      <div>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mt-4"
          rows={8}
          placeholder="Type or copy and paste your notes to generate questions from text. Maximum 2,000 characters."
          value={textValue}
          onChange={handleTextChange}
        />
        <p className="text-blue-800 font-medium text-xl">Please enter some text.</p>
        {!isTextValid && (
          <p className="text-red-600">
            Text exceeds the maximum character limit (2,000).
          </p>
        )}
        <div className="flex flex-wrap mt-4">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="questionType"
              className="block font-bold text-black mb-2"
            >
              Question type
            </label>
            <select
              id="questionType"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedQuestionType}
              onChange={handleQuestionTypeChange}
            >
              <option>Multiple Choice</option>
              <option>True/False</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="difficulty"
              className="block font-bold text-black mb-2"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="maxQuestions"
              className="block font-bold text-black mb-2"
            >
              Max Questions
            </label>
            <input
              id="maxQuestions"
              placeholder="How many questions?"
              type="number"
              min={1}
              max={10}
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={handleInputChange}
              value={selectedNumQuestions}
            />
            {inputError && <p className="text-red-600">{inputError}</p>}
          </div>
        </div>
      </div>
    );
  };

  const TopicSection = () => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setTopicValue(inputValue);
    };

    const isTopicValid = topicValue.trim().length > 0;

    return (
      <div>
        <input
          ref={inputRef}
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mt-4"
          placeholder="E.g. Biology"
          value={topicValue}
          onChange={handleTopicChange}
        />
        {!isTopicValid && <p className="text-blue-800 font-medium text-xl mt-2">Please enter a topic.</p>}
        <div className="flex flex-wrap mt-4">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="questionType"
              className="block font-bold text-black mb-2"
            >
              Question type
            </label>
            <select
              id="questionType"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedQuestionType}
              onChange={handleQuestionTypeChange}
            >
              <option>Multiple Choice</option>
              <option>True/False</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="difficulty"
              className="block font-bold text-black mb-2"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="maxQuestions"
              className="block font-bold text-black mb-2"
            >
              Max Questions
            </label>
            <input
              autoFocus
              id="maxQuestions"
              placeholder="How many questions?"
              type="number"
              min={1}
              max={10}
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={handleInputChange}
              value={selectedNumQuestions}
            />
            {inputError && <p className="text-red-600">{inputError}</p>}
          </div>
        </div>
      </div>
    );
  };

  const UploadsSection = () => {
    let formData = new FormData();
    const onDrop = async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setAcceptedFile(file);
        console.log(file); //
        formData.append("file", file);
        // setIsFileUploading(true); // Set the file upload status to true
        console.log("form appended successfully")
        // try {
        //   const response = await fetch("http://localhost:4000/generate", {
        //     method: "POST",
        //     body: formData,
        //   });
        //   const data = await response.json();
        //   if (response.ok) {
        //     console.log("File uploaded successfully:", data);
        //     toast.success("File uploaded successfully!", {
        //       position: "top-center",
        //       autoClose: 2000,
        //       hideProgressBar: true,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //     });
        //   } else {
        //     console.error("Error uploading file:", data);
        //     handleError("An error occurred while uploading the file. Please try again.");
        //   }
        // } catch (error) {
        //   console.error("Error uploading file:", error);
        //   handleError("An error occurred while uploading the file. Please try again.");
        // }
        //  finally {
        //   setIsFileUploading(false); // Reset the file upload status to false
        // }
      } else {
        setAcceptedFile(null);
      }
    };
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxFiles: 1,
    });

    return (
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p className="text-black font-medium text-xl mt-3">Drag and drop a file here, or click to select a file</p>
          <button className="bg-blue-600 text-white font-semibold text-xl rounded-md px-2 py-4 mt-6 hover:bg-blue-800 w-full focus:outline-none transition-colors duration-300">
            <i className="fas fa-upload mr-2"></i>
            Upload File
          </button>
        </div>
        {acceptedFile && <p>Selected file: {acceptedFile.name}</p>}
        <div className="flex flex-wrap mt-4">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="questionType"
              className="block font-bold text-black mb-2"
            >
              Question type
            </label>
            <select
              id="questionType"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedQuestionType}
              onChange={handleQuestionTypeChange}
            >
              <option>Multiple Choice</option>
              <option>True/False</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="difficulty"
              className="block font-bold text-black mb-2"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="maxQuestions"
              className="block font-bold text-black mb-2"
            >
              Max Questions
            </label>
            <input
              autoFocus
              id="maxQuestions"
              placeholder="How many questions?"
              type="number"
              min={1}
              max={10}
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={handleInputChange}
              value={selectedNumQuestions}
            />
            {inputError && <p className="text-red-400 font-semibold">{inputError}</p>}
          </div>
        </div>
      </div>
    );
  };

  const handleGenerate = async () => {
    // if (isFileUploading) {
    //   toast.error("Please wait for the file to finish uploading before generating questions.", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }

    console.log("Printing RequestData.....");
    const requestData = {
      textValue,
      topicValue,
      // acceptedFile,
      questionType: selectedQuestionType,
      difficulty: selectedDifficulty,
      numQuestions: selectedNumQuestions,
    };
    let formData = new FormData()
    formData.append("textValue", textValue);
    formData.append("topicValue", topicValue);
    formData.append("questionType", selectedQuestionType);
    formData.append("difficulty", selectedDifficulty);
    formData.append("numQuesitons", JSON.stringify(selectedNumQuestions));
    // formData.append("requestData",JSON.stringify(requestData))
    if (acceptedFile) {
      formData.append("file", acceptedFile as Blob);
      setAcceptedFile(null);
    }
    console.log(requestData);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data[0]);
      setGeneratedQuestions(data[0]); //
    } catch (error) {
      console.error("Error generating questions:", error);
      handleError(
        "An error occurred while generating questions. Please try again."
      );
    }
    setTextValue("");
    setTopicValue("");
    setAcceptedFile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="max-w-4xl w-full h-full p-6 rounded-lg mx-auto">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {generatedQuestions?.length === 0 ? (
          <>
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold mb-8 text-center text-black">
                Generate Quiz Questions
              </h1>
              <div className="mb-8 flex justify-center space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.label)}
                    className={`text-lg font-semibold focus:outline-none px-6 py-3 rounded-full transition duration-300 ${
                      activeSection === item.label
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                        : "bg-blue-100 text-blue-900 hover:bg-blue-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              {activeSection === "Text" && <TextSection />}
              {activeSection === "Topic" && <TopicSection />}
              {/* {activeSection === "Uploads" && <UploadsSection />} */}
            </div>

            <button
              className="bg-yellow-200 text-black font-semibold text-2xl rounded-md px-4 py-4 hover:bg-yellow-300 w-full focus:outline-none transition-colors duration-300"
              onClick={handleGenerate}
              // disabled={isFileUploading}
            >
              Generate
            </button>
          </>
        ) : (
          <QuizPlayer
            questions={generatedQuestions}
            questionType={selectedQuestionType}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

const navItems = [
  { id: 1, label: "Text" },
  { id: 2, label: "Topic" },
  // { id: 3, label: "Uploads" },
];

export default QuestionGenerator;