import React, { useState } from 'react';
import Image from 'next/image';
import Logo from './notewiz logo.png';
import Link from 'next/link';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [stream, setStream] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const streams = ['CSE', 'IT', 'AIDS'];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3'];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStream(e.target.value);
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSemester(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubjects(Array.from(e.target.selectedOptions, (option) => option.value) as string[]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-400 dark:bg-gray-800'>
      {/* Navbar */}
      <nav className="bg-[#FFE57D] py-4 fixed w-full z-10 top-12 rounded-3xl mx-auto max-w-4xl">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <div className='flex items-center'>
            <Link href='/'>
              <div className="flex items-center">
                <Image src={Logo} alt='Logo' width={30} height={30} />
                <span className="text-2xl font-semibold ml-2 hover:underline">NoteWiz</span>
              </div>
            </Link>
          </div>
          <Link href="#" className="text-lg hover:underline">Link 1</Link>
          <Link href="#" className="text-lg hover:underline">Link 2</Link>
          <Link href="#" className="text-lg hover:underline">Link 3</Link>
          <button className="bg-black hover:bg-white hover:text-black text-white rounded-full font-medium py-2 px-6">Call to Action</button>
        </div>
      </nav>

      {/* Onboarding content */}
      <div className="container mx-auto max-w-4xl max-h-max py-8 mt-14 overflow-y-auto fixed left-0 right-0 bottom-0 top-[calc(12vh+1rem)]">
        <h1 className="text-2xl font-bold mb-16 text-center">Welcome Onboard!</h1>
        {step === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-left">Step 1: Select Stream and Semester</h2>
            <div className="mb-4">
              <label htmlFor="stream" className="block font-medium mb-2">
                Stream:
              </label>
              <select
                id="stream"
                value={stream}
                onChange={handleStreamChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Stream</option>
                {streams.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="semester" className="block font-medium mb-2">
                Semester:
              </label>
              <select
                id="semester"
                value={semester}
                onChange={handleSemesterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Semester</option>
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleNextStep}
              disabled={!stream || !semester}
              className="px-8 py-3 mt-6 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 w-full transition-colors duration-300"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-left">Step 2: Select Subjects</h2>
            <div className="mb-4">
              <label htmlFor="subjects" className="block font-medium mb-2">
                Subjects:
              </label>
              <select
                id="subjects"
                multiple
                value={selectedSubjects}
                onChange={handleSubjectChange}
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Subject 1">Subject 1</option>
                <option value="Subject 2">Subject 2</option>
                <option value="Subject 3">Subject 3</option>
                <option value="Subject 4">Subject 4</option>
                <option value="Subject 5">Subject 5</option>
                <option value="Subject 6">Subject 6</option>
                {/* Add more options if needed */}
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBackStep}
                className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-left">Step 3: Review and Submit</h2>
    <div className="mb-6">
      <p className="mb-2"><span className="font-semibold">Stream:</span> {stream}</p>
      <p className="mb-2"><span className="font-semibold">Semester:</span> {semester}</p>
      <p className="mb-2"><span className="font-semibold">Selected Subjects:</span> {selectedSubjects.join(', ')}</p>
    </div>
    <div className="flex justify-end">
      <button
        onClick={handleBackStep}
        className="px-6 py-3 bg-gray-500 text-white rounded-md mr-4 hover:bg-gray-700 transition-colors duration-300"
      >
        Back
      </button>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Submit
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default OnboardingPage;