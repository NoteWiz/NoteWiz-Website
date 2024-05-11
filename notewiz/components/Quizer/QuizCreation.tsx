"use client";
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextSection from './TextSection';
import TopicSection from './TopicSection';
import UploadsSection from './UploadsSection'
import QuizPlayer from "./QuizPlayer";

const QuizCreation = () => {

  const [error, setError] = useState<string | null>(null);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 3000); // Clear the error after 3 seconds
  };

  const [activeSection, setActiveSection] = useState("Text");
  const [inputError, setInputError] = useState<string | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("Multiple Choice");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Easy");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState<number>(2);
  const [textValue, setTextValue] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [acceptedFile, setAcceptedFile] = useState<File | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

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
 
  const handleGenerate = async () => {
    console.log("Printing RequestData.....");
    const requestData = {
      textValue,
      topicValue,
      acceptedFile,
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

    // console.log(requestData);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      })

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

  // Memoize the mapped items to prevent unnecessary re-renders
  const navItemButtons = React.useMemo(
    () =>
      navItems.map((item) => (
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
      )),
    [activeSection]
  );

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
                {navItemButtons}
              </div>
            </div>

            <div className="mb-6">
              {activeSection === "Text" && (
                <TextSection
                  textValue={textValue}
                  setTextValue={setTextValue}
                  selectedQuestionType={selectedQuestionType}
                  setSelectedQuestionType={setSelectedQuestionType}
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                  selectedNumQuestions={selectedNumQuestions}
                  setSelectedNumQuestions={setSelectedNumQuestions}
                  inputError={inputError}
                  setInputError={setInputError}
                />
              )}
              {activeSection === "Topic" && (
                <TopicSection
                  topicValue={topicValue}
                  setTopicValue={setTopicValue}
                  selectedQuestionType={selectedQuestionType}
                  setSelectedQuestionType={setSelectedQuestionType}
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                  selectedNumQuestions={selectedNumQuestions}
                  setSelectedNumQuestions={setSelectedNumQuestions}
                  inputError={inputError}
                  setInputError={setInputError}
                />
              )}
              {activeSection === "Uploads" && (
                <UploadsSection
                selectedQuestionType={selectedQuestionType}
                setSelectedQuestionType={setSelectedQuestionType}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                selectedNumQuestions={selectedNumQuestions}
                setSelectedNumQuestions={setSelectedNumQuestions}
                inputError={inputError}
                setInputError={setInputError}
                handleError={handleError}
                isFileUploading={isFileUploading}
                setIsFileUploading={setIsFileUploading}
                acceptedFile={acceptedFile}
                setAcceptedFile={setAcceptedFile}
                />
              )}
            </div>

            <button
              className="bg-yellow-200 text-black font-semibold text-2xl rounded-md px-4 py-4 hover:bg-yellow-300 w-full focus:outline-none transition-colors duration-300"
              onClick={handleGenerate}
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
  { id: 3, label: "Uploads" },
];

export default QuizCreation;
