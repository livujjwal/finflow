import React, { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const Button = ({ text, blue, onClick, disabled }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      disabled={disabled}
      className={
        blue
          ? theme === "dark"
            ? "text-sm rounded-md hover:text-white  hover:bg-white bg-theme text-center my-2 p-1 w-full  flex justify-center items-center h-auto bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
            : "text-sm rounded-md hover:text-theme hover:bg-white bg-theme text-white text-center my-2 p-1 w-full border-[1px] border-theme flex justify-center items-center h-auto"
          : theme === "dark"
          ? "text-sm rounded-md  bg-white hover:bg-theme hover:text-white text-center my-2 p-1 w-full  flex justify-center items-center h-auto bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
          : "text-sm rounded-md text-theme bg-white hover:bg-theme hover:text-white text-center my-2 p-1 w-full border-[1px] border-theme flex justify-center items-center h-auto"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
