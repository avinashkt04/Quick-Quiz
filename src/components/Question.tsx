import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface QuestionProps {
  question: string;
  options?: string[];
  answer: string | number;
  type: string;
  onAnswerSelect: (answer: string) => void;
  userAnswer: string;
  isTimerUp: boolean;
}

const Question = ({
  question,
  options,
  answer,
  type,
  onAnswerSelect,
  userAnswer,
  isTimerUp,
}: QuestionProps) => {
  const [inputAnswer, setInputAnswer] = useState("");

  useEffect(() => {
    setInputAnswer(""); // Reset input when question changes
  }, [question]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerlistren: 0.2 } },
  };
  const list = { hidden: { x: -10, opacity: 0 }, show: { x: 0, opacity: 1 } };

  // Show correct answer when user has answered or time is up
  const showCorrectAnswer =
    type === "integer" &&
    (isTimerUp || (userAnswer && userAnswer !== answer.toString()));

  return (
    <div key={question} className="max-w-lg w-full p-4 bg-[#272a3e] rounded-lg">
      {/* Display result message */}
      <div className="h-5 mb-3 flex justify-between items-center">
        {isTimerUp && !userAnswer && (
          <h1 className="text-2xl font-bold text-red-500">Time's up!</h1>
        )}
        {userAnswer && (
          <h1
            className={`text-2xl font-bold ${
              userAnswer === answer.toString()
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {userAnswer === answer.toString() ? "Correct!" : "Incorrect!"}
          </h1>
        )}
      </div>

      {/* Question Text */}
      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-white text-2xl font-bold"
      >
        {question}
      </motion.h1>

      {/* Multiple Choice Options */}
      {type === "mcq" && (
        <motion.div
          key={question}
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col mt-4 space-y-2"
        >
          {options?.map((option) => (
            <motion.button
              variants={list}
              key={option}
              className={`bg-gray-100 text-black border-2 rounded-xl w-full h-10 gap-2 cursor-pointer hover:bg-blue-300 hover:scale-102 active:bg-blue-400 
                ${
                  (userAnswer || isTimerUp) &&
                  (option === answer.toString() // Highlight correct answer
                    ? "bg-green-400"
                    : option === userAnswer // Highlight user answer
                    ? "bg-red-400"
                    : "") // Default style
                }`}
              value={option}
              onClick={() => onAnswerSelect(option)}
              disabled={!!userAnswer || isTimerUp}
            >
              {option}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Integer Input Field */}
      {type === "integer" && (
        <div className="mt-4">
          <input
            type="number"
            className="w-full h-10 border-2 outline-none rounded-xl p-2 bg-gray-100 text-black"
            placeholder="Enter your answer"
            value={inputAnswer}
            required
            onChange={(e) => setInputAnswer(e.target.value)}
            disabled={!!userAnswer || isTimerUp}
          />
          <div className="mt-2 h-5">
            {!userAnswer && !isTimerUp && (
              <button
                onClick={() => onAnswerSelect(inputAnswer)}
                className={`mt-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition hover:scale-102 ${
                  !inputAnswer
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={!inputAnswer}
              >
                Submit
              </button>
            )}
            {showCorrectAnswer && (
              <h1 className="text-2xl font-bold text-green-500">
                Correct Answer: {answer}
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
