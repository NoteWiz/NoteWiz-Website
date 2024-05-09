// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface UploadsSectionProps {
//   selectedQuestionType: string;
//   setSelectedQuestionType: (value: string) => void;
//   selectedDifficulty: string;
//   setSelectedDifficulty: (value: string) => void;
//   selectedNumQuestions: number;
//   setSelectedNumQuestions: (value: number) => void;
//   inputError: string | null;
//   setInputError: (value: string | null) => void;
//   handleError: (errorMessage: string) => void;
// }

// const UploadsSection: React.FC<UploadsSectionProps> = ({
//   selectedQuestionType,
//   setSelectedQuestionType,
//   selectedDifficulty,
//   setSelectedDifficulty,
//   selectedNumQuestions,
//   setSelectedNumQuestions,
//   inputError,
//   setInputError,
//   handleError,
// }) => {
//   const [acceptedFile, setAcceptedFile] = useState<File | null>(null);

//   const onDrop = async (acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       setAcceptedFile(file);
//       console.log(file);
//       let formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await fetch("http://localhost:4000/generate", {
//           method: "POST",
//           body: formData,
//         });
//         const data = await response.json();
//         if (response.ok) {
//           console.log("File uploaded successfully:", data);
//           toast.success("File uploaded successfully!", {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         } else {
//           console.error("Error uploading file:", data);
//           handleError("An error occurred while uploading the file. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         handleError("An error occurred while uploading the file. Please try again.");
//       }
//     } else {
//       setAcceptedFile(null);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.trim();
//     const numericValue = parseInt(value);
//     if (
//         value === "" ||
//         numericValue < 1 ||
//         numericValue > 10 ||
//         isNaN(numericValue)
//       ) {
//         setInputError("Please enter a number between 1 and 10");
//       } else {
//         setInputError(null);
//         setSelectedNumQuestions(numericValue);
//       }
//     };
//     const handleQuestionTypeChange = (
//         e: React.ChangeEvent<HTMLSelectElement>
//         ) => {
//         setSelectedQuestionType(e.target.value);
//         };
//         const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedDifficulty(e.target.value);
//         };
//         return (
//         <div>
//         <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p className="text-black font-medium text-xl mt-3">Drag and drop a file here, or click to select a file</p>
//         <button className="bg-blue-600 text-white font-semibold text-xl rounded-md px-2 py-4 mt-6 hover:bg-blue-800 w-full focus:outline-none transition-colors duration-300">
//         <i className="fas fa-upload mr-2"></i>
//         Upload File
//         </button>
//         </div>
//         {acceptedFile && <p>Selected file: {acceptedFile.name}</p>}
//         <div className="flex flex-wrap mt-4">
//         <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
//         <label
//                  htmlFor="questionType"
//                  className="block font-bold text-black mb-2"
//                >
//         Question type
//         </label>
//         <select
//                  id="questionType"
//                  className="border border-gray-300 rounded-md p-2 w-full"
//                  value={selectedQuestionType}
//                  onChange={handleQuestionTypeChange}
//                >
//         <option>Multiple Choice</option>
//         <option>True/False</option>
//         </select>
//         </div>
//         <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
//         <label
//                  htmlFor="difficulty"
//                  className="block font-bold text-black mb-2"
//                >
//         Difficulty
//         </label>
//         <select
//                  id="difficulty"
//                  className="border border-gray-300 rounded-md p-2 w-full"
//                  value={selectedDifficulty}
//                  onChange={handleDifficultyChange}
//                >
//         <option>Easy</option>
//         <option>Medium</option>
//         <option>Hard</option>
//         </select>
//         </div>
//         <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 mb-4">
//         <label
//                  htmlFor="maxQuestions"
//                  className="block font-bold text-black mb-2"
//                >
//         Max Questions
//         </label>
//         <input
//                  autoFocus
//                  id="maxQuestions"
//                  placeholder="How many questions?"
//                  type="number"
//                  min={1}
//                  max={10}
//                  className="border border-gray-300 rounded-md p-2 w-full"
//                  onChange={handleInputChange}
//                  value={selectedNumQuestions}
//                />
//         {inputError && <p className="text-red-400 font-semibold">{inputError}</p>}
//         </div>
//         </div>
//         </div>
//         );
//         };
//         export default UploadsSection;
        