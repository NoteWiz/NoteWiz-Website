'use client';

import React, { useState } from 'react';

const QuestionGenerator: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Text');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full p-6 bg-white rounded-md shadow-lg">
        {/* Section Navigation */}
        <div className="mb-6 flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.label)}
              className={`text-lg font-semibold focus:outline-none ${
                activeSection === item.label ? 'text-purple-600 underline' : 'text-gray-600'
              } hover:text-purple-600 transition duration-300`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Conditional rendering for active section */}
        {activeSection === 'Text' && <TextSection />}
        {activeSection === 'Topic' && <TopicSection />}
        {activeSection === 'URL' && <UrlSection />}
        {activeSection === 'Uploads' && <UploadsSection />}

        {/* Generate button */}
        <button className="bg-purple-500 text-white rounded-md px-4 py-2 hover:bg-purple-600 mt-6 w-full focus:outline-none">
          Generate
        </button>
      </div>
    </div>
  );
};

const navItems = [
  { id: 1, label: 'Text' },
  { id: 2, label: 'Topic' },
  { id: 3, label: 'URL' },
  { id: 4, label: 'Uploads' },
];

// Reusable components for each section
const TextSection = () => (
  <div>
    <textarea
      className="w-full border border-gray-300 rounded-md p-2 mt-4"
      rows={8}
      placeholder="Type or copy and paste your notes to generate questions from text. Maximum 4,000 characters. Paid accounts can use up to 30,000 characters."
    />
    <OptionsDropdowns />
  </div>
);

const TopicSection = () => (
  <div>
    <input
      type="text"
      className="w-full border border-gray-300 rounded-md p-2 mt-4"
      placeholder="E.g. Biology"
    />
    <p className="text-gray-600 mt-2">Enter a topic to generate questions from.</p>
    <OptionsDropdowns />
  </div>
);

const UrlSection = () => (
  <div>
    <input
      type="text"
      className="w-full border border-gray-300 rounded-md p-2 mt-4"
      placeholder="E.g. https://en.wikipedia.org/wiki/Physics"
    />
    <p className="text-gray-600 mt-2">The URL must be publicly accessible and not behind a login</p>
    <OptionsDropdowns />
  </div>
);

const UploadsSection = () => (
  <div>
    <label htmlFor="fileUpload" className="bg-gray-200 rounded-md px-4 py-2 cursor-pointer mt-4 block w-full">
      Choose File
    </label>
    <span className="ml-2 text-gray-600">No file chosen</span>
    <p className="text-gray-600 mt-2">
      If you upload a PDF, please make sure you can select/highlight the text.
    </p>
    <OptionsDropdowns />
  </div>
);

const OptionsDropdowns = () => (
  <div className="flex flex-wrap mt-4">
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
      <label htmlFor="questionType" className="block font-semibold text-gray-600 mb-2">
        Question type
      </label>
      <select id="questionType" className="border border-gray-300 rounded-md p-2 w-full">
        <option>Multiple Choice</option>
        <option>Fill in the Blank</option>
        <option>True/False</option>
      </select>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
      <label htmlFor="language" className="block font-semibold text-gray-600 mb-2">
        Language
      </label>
      <select id="language" className="border border-gray-300 rounded-md p-2 w-full">
        <option>Auto</option>
        <option>English</option>
        <option>Spanish</option>
      </select>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
      <label htmlFor="difficulty" className="block font-semibold text-gray-600 mb-2">
        Difficulty
      </label>
      <select id="difficulty" className="border border-gray-300 rounded-md p-2 w-full">
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
    </div>
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
      <label htmlFor="maxQuestions" className="block font-semibold text-gray-600 mb-2">
        Max Questions
      </label>
      <select id="maxQuestions" className="border border-gray-300 rounded-md p-2 w-full">
        <option>Auto</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </select>
    </div>
  </div>
);

export default QuestionGenerator;
