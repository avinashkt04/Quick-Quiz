import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TimerProps {
  onTimerEnd: () => void;
  stop: boolean;
  questionIndex: number;
}

export const Timer = ({ onTimerEnd, stop, questionIndex }: TimerProps) => {
  const [duration, setDuration] = useState(30);
  const [progress, setProgress] = useState(0); // Track animation progress

  useEffect(() => {
    setDuration(30); // Reset timer on every new question
  }, [questionIndex]); // Ensure reset triggers on question change

  useEffect(() => {
    if (stop) return; // Stop timer when an option is selected

    const timer = setInterval(() => {
      setDuration((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stop, questionIndex]); // Restart timer on new question

  useEffect(() => {
    if(!stop){
      setProgress(((30 - duration)/30)* 251)
    }
  }, [duration, stop])

  return (
    <div className="relative w-20 h-20 rounded-full grid place-items-center text-2xl">
      {/* Outer dashed circle */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r="65"
          stroke="teal"
          strokeWidth="8"
          fill="none"
          strokeDasharray="4"
        />
      </svg>

      {/* Inner animated circle */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <motion.circle
          key={questionIndex} // Ensures animation resets on question change
          cx="50"
          cy="50"
          r="40"
          stroke="teal"
          strokeWidth="8"
          fill="none"
          strokeDasharray="251"
          initial={{ strokeDashoffset: 0, rotate: -90 }}
          animate={{ strokeDashoffset: stop ? progress: 251 }}
          transition={{ duration: 30, ease: "linear" }}
        />
      </svg>

      <span className="relative z-10 text-teal-600 font-bold">{duration}</span>
    </div>
  );
};
