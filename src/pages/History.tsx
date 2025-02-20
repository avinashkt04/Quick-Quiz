import { useEffect, useState } from "react";
import { QuizHistoryEntry } from "./Quiz";
import { getQuizHistory } from "../db";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getQuizHistory();
      setQuizHistory(history);
    };
    fetchHistory();
  }, []);
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="text-center">
        {/* Show Previous Quiz Scores */}
        {quizHistory.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Previous Scores</h3>
            <table className="w-full max-w-md border-b border-slate-800 rounded-md">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizHistory.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-4 py-2">{entry.date}</td>
                    <td className="px-4 py-2">{entry.time}</td>
                    <td className="px-4 py-2">{entry.score}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => navigate(`/submissions/${entry.id}`)}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="text-2xl font-bold mt-8">No quiz history found!</h1>
        )}
      </div>
    </div>
  );
};

export default History;
