import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  "Engaging questions & instant feedback",
  "Review past quiz attempts & improve",
  "Track your progress with detailed history",
  "Test your knowledge across multiple topics",
];

const Home = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#282A36]">
      <motion.div
        className="text-center w-[90%] md:w-[60%] lg:w-[50%]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          variants={childVariants}
        >
          Welcome to <span className="text-cyan-400">QuickQuiz</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-6"
          variants={childVariants}
        >
          Challenge yourself with fun, interactive quizzes and improve your
          knowledge!
        </motion.p>

        {/* Key Features */}
        <motion.ul
          className="text-left text-gray-300 text-lg md:text-xl space-y-3 mb-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-2"
              variants={childVariants}
            >
              ✅ {feature}
            </motion.li>
          ))}
        </motion.ul>

        {/* Action Button */}
        <motion.button
          className="bg-cyan-500 text-white font-semibold px-8 py-3 rounded-lg 
          hover:bg-cyan-400 transition-all transform hover:scale-105 cursor-pointer shadow-lg"
          variants={childVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/instruction")} 
        >
          Start Quiz 🚀
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
