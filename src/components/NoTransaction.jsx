import React from "react";
import wallet from "../assets/wallet.png";

const NoTransactions = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-2 w-full">
      <img className="w-52 mb-2" src={wallet} alt="no transaction" />
      <p className="text-center text-lg">You Have No Transactions Currently</p>
    </div>
  );
};

export default NoTransactions;
