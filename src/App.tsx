import Quiz from "./pages/Quiz";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Instruction from "./pages/Instruction";
import Submissions from "./pages/Submissions";
import History from "./pages/History";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/history" element={<History />} />
        <Route path="/submissions/:id" element={<Submissions />} />
      </Routes>
    </>
  );
}

export default App;
