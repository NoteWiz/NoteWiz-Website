import React from 'react';

const Notes = () => {
  return (
    <div className='bg-yellow-200 min-h-screen'>

    <div className="container mx-auto px-6">
      <h1 className="text-3xl font-bold pt-6 mb-4">MY SUBJECTS:</h1>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-600 mb-2">IT 3rd Semester</p>
              <h1 className="text-xl font-bold mb-4">Data Structures and Algorithms</h1>
            </div>
            <div className="flex flex-col">
              <a href="https://drive.google.com/file/d/1W4NgPhXxUswRY0tb7RmJeForB6OGuwfP/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2 w-full">Unit 1-5 notes</button>
              </a>
              <a href="#">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2 w-full">Practice Questions</button>
              </a>
              <a href="#">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">Take a Test</button>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-600 mb-2">IT 3rd Semester</p>
              <h1 className="text-xl font-bold mb-4">Design Analysis of Algorithms</h1>
            </div>
            <div className="flex flex-col">
              <a href="https://drive.google.com/file/d/1MT14ANYtgYWi41xi3nz0EMtLSKGOgK_4/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2 w-full">Unit 1-5 notes</button>
              </a>
              <a href="#">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2 w-full">Practice Questions</button>
              </a>
              <a href="#">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">Take a Test</button>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-600 mb-2">IT 3rd Semester</p>
              <h1 className="text-xl font-bold mb-4">Artificial Intelligence</h1>
            </div>
            <div className="flex flex-col">
              <a href="https://drive.google.com/file/d/1diBTI3-JMupsofhyFRZwON9oj4-q4Rjo/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2 w-full">Unit 1-5 notes</button>
              </a>
              <a href="#">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">Practice Questions</button>
              </a>
              <a href="#">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 w-full">Take a Test</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
    
  );
};

export default Notes;
