import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface QuestionData {
  question: string;
  answer: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
}

interface QuizPlayerProps {
  questions: QuestionData[];
  questionType: string;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ questions, questionType }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  let currentQuestion: QuestionData | undefined;
  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  if (questions.length > 0 && currentQuestionIndex < questions.length) {
    currentQuestion = questions[currentQuestionIndex];
  }

  const handleButtonClick = (selectedOption: string) => {
    if (!currentQuestion) return; // Exit early if currentQuestion is undefined
    
    const trimmedAnswer = selectedOption;
    const correctAnswer = currentQuestion.answer ? currentQuestion.answer : '';

    // Give user notification if correct answer or wrong answer selected
    if (trimmedAnswer === correctAnswer) {
      setScore(score + 1);
      toast.success('Correct Answer!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Wrong Answer! The correct answer is: ${currentQuestion.answer}`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // Check if quiz is completed
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
      toast.success('Quiz Completed!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
    }
  };

  const renderQuestion = () => {
    let currentQuestion: QuestionData | undefined;
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      currentQuestion = questions[currentQuestionIndex];
    }

    if (!currentQuestion) {
      return null; // or render a different component to indicate that there are no more questions
    }
    
    const options = [
      currentQuestion.option1,
      currentQuestion.option2,
      currentQuestion.option3,
      currentQuestion.option4,
    ].filter(Boolean); // Filter out undefined/null values

    switch (questionType) {
      case 'Multiple Choice':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg mb-4">{currentQuestion.question}</p>
            {options.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded transition-colors duration-300"
                    onClick={() => handleButtonClick(option ?? '')}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <p>No options available for this question.</p>
            )}
          </>
        );
      case 'True/False':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg mb-4">{currentQuestion.question}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => handleButtonClick('True')}
              >
                True
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => handleButtonClick('False')}
              >
                False
              </button>
            </div>
          </>
        );
      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-black">Quiz</h1>
        {questions.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No questions available</h2>
            <p className="text-lg">Please try again later.</p>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg">
              Your score: {score} out of {questions.length}
            </p>
            <p className="text-lg">
              Percentage: {((score / questions.length) * 100).toFixed(2)}%
            </p>
          </div>
        ) : (
          <>{renderQuestion()}</>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default QuizPlayer;