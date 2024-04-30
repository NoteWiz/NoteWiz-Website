import React, { useState } from "react";

interface QuestionData {
  question: string;
  option1?: string;
  // Add more option properties if needed
}

interface QuizPlayerProps {
  questions: QuestionData[];
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserAnswer("");
  };

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      {currentQuestion.option1 && (
        <div>
          <label>
            <input
              type="radio"
              name="answer"
              value={currentQuestion.option1}
              checked={userAnswer === currentQuestion.option1}
              onChange={handleAnswerChange}
            />
            {currentQuestion.option1}
          </label>
        </div>
      )}
      {/* Render other options if available */}
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default QuizPlayer;
