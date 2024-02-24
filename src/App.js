import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "./utils/ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div
      test-id="app"
      className={
        theme === "dark"
          ? "text-[#e6e6e6] bg-gradient-to-tr from-[#0e1c26] to-[#0D1113]"
          : ""
      }
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ToastContainer />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
