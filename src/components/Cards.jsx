import React, { useContext } from "react";
import Button from "./Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import ThemeContext from "../utils/ThemeContext";

const Cards = ({
  showIncomeModal,
  showExpensesModal,
  income,
  expenses,
  balance,
}) => {
  const { theme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  async function handleDelete() {
    try {
      if (user) {
        await deleteDoc(
          doc(
            db,
            "user/" + user.uid + "/transactions",
            user.uid,
            "users/" + user.uid
          )
        );
      }
    } catch (error) {}
  }

  return (
    <div>
      <div
        className={
          theme == "dark"
            ? "flex max-md:flex-col justify-between w-[95%] mx-auto py-6 items-center gap-4"
            : "flex max-md:flex-col justify-between w-[95%] mx-auto py-6 items-center gap-4"
        }
      >
        <div
          className={
            theme === "dark"
              ? "w-[80%] md:w-[30%] shadow-5xl text-[#e6e6e6] bg-gradient-to-tr from-[#0E1C26] to-[#2A454B] flex flex-col  rounded-md h-[11rem] px-8 py-4 "
              : "shadow-4xl w-[80%] md:w-[30%] flex flex-col  rounded-md h-[11rem] px-8 py-4"
          }
        >
          <h1 className="text-base text-center my-2">Current Balance</h1>
          <p className="my-4">₹{balance}</p>
          <Button text="Reset Balance" onClick={handleDelete} />
        </div>
        <div
          className={
            theme === "dark"
              ? "w-[80%] md:w-[30%] shadow-5xl text-[#e6e6e6] bg-gradient-to-tr from-[#0E1C26] to-[#2A454B] flex flex-col  rounded-md h-[11rem] px-8 py-4 "
              : "shadow-4xl w-[80%] md:w-[30%] flex flex-col  rounded-md h-[11rem] px-8 py-4"
          }
        >
          <h1 className="text-base text-center my-2">Total Income</h1>
          <p className="my-4">₹{income}</p>
          <Button text="Add Income" onClick={showIncomeModal} />
        </div>

        <div
          className={
            theme === "dark"
              ? "w-[80%] md:w-[30%] shadow-5xl text-[#e6e6e6] bg-gradient-to-tr from-[#0E1C26] to-[#2A454B] flex flex-col  rounded-md h-[11rem] px-8 py-4 "
              : "shadow-4xl w-[80%] md:w-[30%] flex flex-col  rounded-md h-[11rem] px-8 py-4"
          }
        >
          <h1 className="text-base text-center my-2">Total Expenses</h1>
          <p className="my-4">₹{expenses}</p>
          <Button text="Add Expenses" onClick={showExpensesModal} />
        </div>
      </div>
    </div>
  );
};

export default Cards;
