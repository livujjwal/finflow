import { useState } from "react";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const Chart = ({ sortedTransactions }) => {
  const { theme } = useContext(ThemeContext);
  const [showSpending, setShowSpending] = useState(true);
  const lineChartData = sortedTransactions.map((item) => {
    return { date: item.date, amount: parseFloat(item.amount) };
  });

  const spendingData = sortedTransactions.filter((item) => {
    if (item.type === "expenses") {
      return { tag: item.tag, amount: parseFloat(item.amount) };
    }
  });
  let finalSpendingData = [];
  spendingData.reduce((acc, item) => {
    let key = item.tag;
    if (!acc[key]) {
      acc[key] = { tag: item.tag, amount: parseFloat(item.amount) };
      finalSpendingData.push(acc[key]);
    } else {
      acc[key].amount += parseFloat(item.amount);
    }
    return acc;
  }, {});
  const incomeData = sortedTransactions.filter((item) => {
    if (item.type === "income") {
      return { tag: item.tag, amount: parseFloat(item.amount) };
    }
  });
  let finalIncomeData = [];
  incomeData.reduce((acc, item) => {
    let key = item.tag;
    if (!acc[key]) {
      acc[key] = { tag: item.tag, amount: parseFloat(item.amount) };
      finalIncomeData.push(acc[key]);
    } else {
      acc[key].amount += parseFloat(item.amount);
    }
    return acc;
  }, {});

  return (
    <div className="w-[95%] flex max-lg:flex-col items-center justify-between max-lg:gap-10  mx-auto my-8 lg:h-[40rem] max-md:gap-8">
      <div
        className={
          theme === "dark"
            ? "w-[82%] lg:w-[62%] shadow-5xl h-full max-lg:h-[40rem]  text-[#393737] bg-gradient-to-tr from-[#CAF2EF] to-[#C9EFDC] rounded"
            : "shadow-4xl w-[82%] lg:w-[62%] h-full max-lg:h-[40rem]"
        }
      >
        <LineChart data={lineChartData} />
      </div>
      <div
        className={
          theme === "dark"
            ? "w-[82%] lg:w-[35%] shadow-5xl flex items-center flex-col h-full max-lg:h-[40rem] text-[#201f1f] bg-gradient-to-tr from-[#CAF2EF] to-[#C9EFDC] rounded"
            : "shadow-4xl w-[82%] lg:w-[35%] flex items-center flex-col h-full max-lg:h-[40rem]"
        }
      >
        {showSpending ? (
          <PieChart data={finalSpendingData} title={"Your Spendings"} />
        ) : (
          <PieChart data={finalIncomeData} title={"Your Incomes"} />
        )}
        <button
          onClick={() => setShowSpending(!showSpending)}
          className={
            theme === "dark"
              ? "text-sm rounded text-[#e6e6e6] bg-white hover:bg-theme hover:text-white text-center my-2 p-1 w-1/2 flex justify-center items-center bg-gradient-to-tl from-[#0B2C24] to-[#247A4D]"
              : "text-sm rounded text-theme bg-white hover:bg-theme hover:text-white text-center my-2 p-1 w-1/2 border-[1px] border-theme flex justify-center items-center "
          }
        >
          {showSpending ? "Show Incomes" : "Show Spendings"}
        </button>
      </div>
    </div>
  );
};

export default Chart;
