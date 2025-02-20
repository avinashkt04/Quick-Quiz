import { useState } from "react";
import { Timer } from "../components/Timer";
import Question from "../components/Question";
import { questions } from "../../Questions.json";
import { saveQuizResult} from "../db";
import { useNavigate } from "react-router-dom";

export interface QuizHistoryEntry {
  id?: number;
  score: number;
  date: string;
  time: string;
  answers: string[];
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isTimerUp, setIsTimerUp] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );

  const navigate = useNavigate();

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setUserAnswer(answer);
    setIsTimerUp(true); // Stop the timer when option is selected

    // updating the user answers array which is used to store in the indexedDB
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });

    // Check if the answer is correct
    if (
      answer.toString() === questions[currentQuestionIndex].answer.toString()
    ) {
      setScore((prevScore) => {
        const newScore = prevScore + 10;
        return newScore;
      });
    }
  };

  // Handle timer completion
  const handleTimerEnd = () => {
    setIsTimerUp(true); // Stop the timer if the time is up
  };

  // Move to the next question or end the quiz
  const handleContinue = async () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setUserAnswer(""); // Reset selected answer
      setIsTimerUp(false); // Reset timer state
    } else {
      await handleQuizEnd();
    }
  };

  // Save the quiz result
  const handleQuizEnd = async () => {
    const date = new Date();
    const result = {
      score,
      date:
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      time: date.toLocaleTimeString(),
      answers: userAnswers,
    };

    const id = await saveQuizResult(result);
    navigate(`/submissions/${id}`); // Navigate to the submissions page
  };

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Check if the "Continue" button should be shown
  const showContinueButton = userAnswer !== "" || isTimerUp;

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <>
        <h2 className="w-full flex justify-center items-center text-xl font-semibold py-4">
          {currentQuestion.type === "mcq"
            ? "Multiple Choice Question:"
            : "Integer Type Question:"}
        </h2>

        {/* Quiz Container */}
        <div className="w-full flex justify-center items-center bg-[#272a3e] py-4 rounded-lg">
          <div className="flex flex-col justify-between items-center">
            {/* Timer */}
            <Timer
              onTimerEnd={handleTimerEnd}
              stop={isTimerUp}
              questionIndex={currentQuestionIndex}
            />

            {/* Current Question */}
            {currentQuestion && (
              <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                answer={currentQuestion.answer}
                type={currentQuestion.type}
                onAnswerSelect={handleAnswerSelect}
                userAnswer={userAnswer}
                isTimerUp={isTimerUp}
              />
            )}
          </div>
        </div>

        {/* Button */}
        <div className="my-6 h-8">
          {showContinueButton && (
            <button
              onClick={handleContinue}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition cursor-pointer hover:scale-102"
            >
              {currentQuestionIndex + 1 < totalQuestions
                ? "Continue"
                : "Finish"}
            </button>
          )}
        </div>
      </>
    </div>
  );
};

export default Quiz;
