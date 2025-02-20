import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="w-full border-b border-slate-600">
      <header className="w-[90%] sm:w-[80%] mx-auto py-4">
        <div className="flex justify-between items-center">
          <div>
            <Link to={"/"} className="text-xl sm:text-2xl font-bold text-white">
              Quick<span className="text-cyan-400">Quiz</span>
            </Link>
          </div>
          <div className="flex items-center gap-x-3">
            <Link
              to={"/"}
              className={`text-md sm:text-lg ${
                pathname === "/" ? "text-teal-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to={"/history"}
              className={`text-md sm:text-lg  ${
                pathname === "/history" ? "text-teal-500" : ""
              }`}
            >
              History
            </Link>
            <Link
              to={"/instruction"}
              className={` text-white px-3 py-2 rounded-lg hover:bg-teal-600 transition cursor-pointer hover:scale-102 ${
                pathname === "/instruction" ? "bg-teal-600" : "bg-teal-500"
              }`}
            >
              New Quiz
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
