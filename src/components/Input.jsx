import React, { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const Input = ({ label, state, setState, type, placeholder }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="my-4 text-sm">
      <p className="mb-2">{label}</p>
      <input
        className={
          theme === "dark"
            ? "border-b w-full  opacity-80 focus:opacity-100 duration-200 border-[#08203e] p-[0.2rem] outline-none rounded text-sm bg-gradient-to-tr from-[#08203e] to-[#557c93] text-[#fff] placeholder:text-[#e6e6e6]"
            : "border-b w-full  opacity-80 outline-none focus:opacity-100 duration-200 placeholder:text-gray-500"
        }
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
