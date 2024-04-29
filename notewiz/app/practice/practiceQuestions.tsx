"use client";

import React, { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import QuizPlayer from "./QuizPlayer";

const QuestionGenerator = () => {
  const [error, setError] = useState<string | null>(null);

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
  const [selectedNumQuestions, setSelectedNumQuestions] = useState<number>(1);
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

    return (
      <div>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mt-4"
          rows={8}
          placeholder="Type or copy and paste your notes to generate questions from text. Maximum 2,000 characters."
          value={textValue}
          onChange={handleTextChange}
        />
        {!isTextValid && (
          <p className="text-red-600">
            Text exceeds the maximum character limit (2,000).
          </p>
        )}
        <div className="flex flex-wrap mt-4">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="questionType"
              className="block font-semibold text-gray-600 mb-2"
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
              <option>Open Ended</option>
              <option>True/False</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="difficulty"
              className="block font-semibold text-gray-600 mb-2"
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
              className="block font-semibold text-gray-600 mb-2"
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
    const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTopicValue(e.target.value);
    };

    const isTopicValid = topicValue.trim().length > 0;

    return (
      <div>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mt-4"
          placeholder="E.g. Biology"
          value={topicValue}
          onChange={handleTopicChange}
        />
        {!isTopicValid && <p className="text-red-600">Please enter a topic.</p>}
        <p className="text-gray-600 mt-2">
          Enter a topic to generate questions from.
        </p>
        <div className="flex flex-wrap mt-4">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="questionType"
              className="block font-semibold text-gray-600 mb-2"
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
              <option>Open Ended</option>
              <option>True/False</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="difficulty"
              className="block font-semibold text-gray-600 mb-2"
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
              className="block font-semibold text-gray-600 mb-2"
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

  const UploadsSection = () => {
    let formData = new FormData();
    const onDrop = async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setAcceptedFile(acceptedFiles[0]);
        console.log(acceptedFiles[0]);
        formData.append("file", file);
        try {
          const response = await fetch("http://localhost:4000/generate", {
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
          <p>Drag and drop a file here, or click to select a file</p>
          <button className="bg-yellow-500 text-white rounded-md px-4 py-2 hover:bg-yellow-700 mt-6 w-full focus:outline-none">
            <i className="fas fa-upload mr-2"></i>
            Upload File
          </button>
        </div>
        {acceptedFile && <p>Selected file: {acceptedFile.name}</p>}
        <div className="flex flex-wrap mt-4">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="questionType"
              className="block font-semibold text-gray-600 mb-2"
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
              <option>Open Ended</option>
              <option>True/False</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label
              htmlFor="difficulty"
              className="block font-semibold text-gray-600 mb-2"
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
              className="block font-semibold text-gray-600 mb-2"
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

  const handleGenerate = async () => {
    console.log("hello");
    const requestData = {
      textValue,
      topicValue,
      acceptedFile,
      questionType: selectedQuestionType,
      difficulty: selectedDifficulty,
      numQuestions: selectedNumQuestions,
    };

    console.log(requestData);

    try {
      const response = await fetch("http://localhost:4000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setGeneratedQuestions(data);
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
    <div className="min-h-screen flex items-center justify-center bg-yellow-200">
      <div className="max-w-xl w-full p-6 bg-white rounded-lg shadow-lg">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {generatedQuestions.length === 0 && (
          <>
            {/* Section Navigation */}
            <div className="mb-6 flex justify-between items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.label)}
                  className={`text-lg font-semibold focus:outline-none ${
                    activeSection === item.label
                      ? "text-blue-600 underline"
                      : "text-gray-600"
                  } hover:text-blue-600 transition duration-300`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Conditional rendering for active section */}
            {activeSection === "Text" && <TextSection />}
            {activeSection === "Topic" && <TopicSection />}
            {activeSection === "Uploads" && <UploadsSection />}

            {/* Generate button */}
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-4 hover:bg-blue-700 mt-6 w-full focus:outline-none"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </>
        )}

        {generatedQuestions.length > 0 && (
          <QuizPlayer questions={generatedQuestions} />
        )}
      </div>
    </div>
  );
};

const navItems = [
  { id: 1, label: "Text" },
  { id: 2, label: "Topic" },
  { id: 3, label: "Uploads" },
];

export default QuestionGenerator;
