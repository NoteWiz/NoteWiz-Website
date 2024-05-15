import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Timer } from 'lucide-react';

interface QuestionData {
  question: string;
  answer: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
}

interface QuizPlayProps {
  questions: QuestionData[];
  questionType: string;
}

const QuizPlay: React.FC<QuizPlayProps> = ({ questions, questionType }) => {
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
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(`Wrong Answer! The correct answer is: ${currentQuestion.answer}`, {
        position: 'bottom-right',
        autoClose: 500,
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
        autoClose: 500,
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
      case 'mcq':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-xl mb-4 text-white">{currentQuestion.question}</p>
            {options.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="bg-[#252525] hover:bg-[#00D93D] text-white font-bold py-4 px-4 rounded-3xl transition-colors duration-300"
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
      case 'true_false':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-xl mb-10 text-white">{currentQuestion.question}</p>
            <div className="flex justify-center gap-16">
              <button
                className="bg-[#252525] hover:bg-[#00D93D] text-white font-bold py-4 px-14 rounded-3xl transition-colors duration-300"
                onClick={() => handleButtonClick('True')}
              >
                True
              </button>
              <button
                className="bg-[#252525] hover:bg-[#00D93D] text-white font-bold py-4 px-14 rounded-3xl transition-colors duration-300"
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
    <div className="min-h-screen flex items-center justify-center bg-[#252525]">
      <div className="bg-[#181818] p-8 rounded-lg shadow-xl max-sm:w-4/5 md:w-4/5 lg:w-1/2">
        <div className='flex flex-row justify-between'>
        <h1 className="text-4xl font-bold mb-6 text-white">Quiz</h1>
        <Timer color='#00D93D' size={36} />
      </div>
        {questions.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No questions available</h2>
            <p className="text-lg">Please try again later.</p>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Quiz Completed!</h2>
            <p className="text-xl text-white">
              Your score: <span className='text-[#00D93D]'>{score} </span> / <span className='text-[#00D93D]'>{questions.length}</span>
            </p>
            <p className="text-xl text-white">
              Percentage: <span className='text-[#00D93D]'> {((score / questions.length) * 100).toFixed(1)} </span>%
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

export default QuizPlay;