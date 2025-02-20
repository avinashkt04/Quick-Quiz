import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizHistoryById } from "../db";
import { questions } from "../../Questions.json";
import { CheckCircle, XCircle, HelpCircle } from "react-feather";

interface QuizHistoryEntry {
  id?: number;
  score: number;
  date: string;
  time: string;
  answers: string[];
}

const Submissions = () => {
  const { id } = useParams();
  const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getQuizHistoryById(Number(id));
      setQuizHistory(history);
    };
    fetchHistory();
  }, [id]);

  return (
    <div className="w-[80%] max-w-lg mx-auto mt-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Quiz Score</h1>
        <p className="text-2xl mt-3">
          You scored {quizHistory?.score} out of 100
        </p>
      </div>

      {questions.map((currentQuestion, index) => {
        const userAnswer = quizHistory?.answers?.[index].toString();
        const isAnswered = userAnswer !== undefined && userAnswer !== "";
        const isCorrect = userAnswer === currentQuestion.answer.toString();

        return (
          <div
            key={index}
            className="w-full bg-[#272a3e] p-6 my-4 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <h1 className="text-xl font-semibold">
                {currentQuestion.question}
              </h1>
              <div className="flex items-center mt-2">
                {isAnswered ? (
                  isCorrect ? (
                    <CheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <XCircle className="text-red-500 mr-2" />
                  )
                ) : (
                  <HelpCircle className="text-yellow-500 mr-2" />
                )}
                <p className="text-lg">
                  {isAnswered
                    ? isCorrect
                      ? "Correct Answer"
                      : "Incorrect Answer"
                    : "Unanswered"}
                </p>
              </div>
              <p className="text-lg mt-2">
                Score: {isCorrect ? "10/10" : "0/10"}
              </p>
            </div>

            {currentQuestion.type === "mcq" && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option, optionIndex) => {
                  const isSelected = userAnswer === option;
                  const isCorrectOption = option === currentQuestion.answer;

                  return (
                    <button
                      key={optionIndex}
                      className={`w-full h-12 rounded-lg flex items-center justify-between px-4 transition-all
                        ${
                          isSelected
                            ? isCorrectOption
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                            : isCorrectOption
                            ? "bg-green-300 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      disabled
                    >
                      <span>{option}</span>
                      {isSelected && (
                        <span className="ml-2">
                          {isCorrectOption ? "✔️" : "❌"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === "integer" && (
              <div className="mt-4">
                <input
                  type="text"
                  className="w-full h-12 px-4 rounded-lg bg-gray-100 text-black"
                  value={isAnswered ? userAnswer : "Unanswered"}
                  disabled
                />
                <p className="text-lg mt-2">
                  Correct Answer:{" "}
                  <span className="font-bold">{currentQuestion.answer}</span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Submissions;
