import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Instruction = () => {
  const [isInstructionsRead, setIsInstructionsRead] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="w-[80%] mx-auto h-screen max-w-xl flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold mt-8">Instructions:</h1>
        <div className="text-lg mt-4">
          Welcome to the quiz! Before you begin, please read the instructions
          carefully:
        </div>
        <div className="text-lg mt-4">
          <ol className="list-disc list-inside">
            <li>
              <strong>Time:</strong> You will have <strong>15 seconds</strong>{" "}
              to answer each question.
            </li>
            <li>
              <strong>Total Questions:</strong> There are{" "}
              <strong>10 questions</strong> in total.
            </li>
            <li>
              <strong>Question Types:</strong>
              <ul className=" pl-6 list-disc list-inside">
                <li>5 multiple-choice questions (select the best answer).</li>
                <li>5 integer-type questions (enter the correct number).</li>
              </ul>
            </li>
            <li>
              <strong>Scoring:</strong> Each correct answer will earn you{" "}
              <strong>10 points</strong>.
            </li>
            <li>
              ⏭️ <strong>Navigation:</strong> You cannot go back to previous
              questions once answered.
            </li>
          </ol>
        </div>
        <div className="flex items-center text-md font-semibold mt-4">
          <input
            type="checkbox"
            id="instructionsCheckbox"
            className="rounded-lg cursor-pointer w-4 h-4"
            onClick={() => setIsInstructionsRead(!isInstructionsRead)}
          />
          <label htmlFor="instructionsCheckbox" className="ml-4 cursor-pointer">
            I have read and understood the instructions.
          </label>
        </div>
        <div className="flex justify-center items-center mt-6">
          <button
            className={`mt-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition hover:scale-102 ${
              !isInstructionsRead ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={!isInstructionsRead}
            onClick={() => navigate("/quiz")}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
