import React, { useState, useRef } from "react";

interface TextSectionProps {
  textValue: string;
  setTextValue: (value: string) => void;
  selectedQuestionType: string;
  setSelectedQuestionType: (value: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;
  selectedNumQuestions: number;
  setSelectedNumQuestions: (value: number) => void;
  inputError: string | null;
  setInputError: (value: string | null) => void;
}

const TextSection: React.FC<TextSectionProps> = ({
  textValue,
  setTextValue,
  selectedQuestionType,
  setSelectedQuestionType,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedNumQuestions,
  setSelectedNumQuestions,
  inputError,
  setInputError,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextValue(value);
  };

  const isTextValid = textValue.length <= 2000;

  const handleQuestionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedQuestionType(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
  };

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
          <select
  value={selectedNumQuestions}
  onChange={(e) => setSelectedNumQuestions(parseInt(e.target.value))}
  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
    <option key={num} value={num}>
      {num}
    </option>
  ))}
</select>
</div>
</div>
</div>
);
};
export default TextSection;