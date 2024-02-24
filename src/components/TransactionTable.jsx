import { Radio } from "antd";
import { useState, useContext } from "react";
import searchImg from "../assets/search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import ThemeContext from "../utils/ThemeContext";
import { Basic } from "./Table";
const TransactionTable = ({ transactions, addTransaction, getTransaction }) => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLaoding] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("noSort");

  let filteredTransaction = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );
  let sortedTransaction = [...filteredTransaction].sort((a, b) => {
    if (sortKey === "date") return new Date(a.date) - new Date(b.date);
    if (sortKey === "amount") return a.amount - b.amount;
    else return 0;
  });
  function exportCSV() {
    const csv = unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transactions,
    });
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function importCSV(e) {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transaction Added!");
      getTransaction();
      e.target.files = null;
    } catch (error) {
      toast.error(error);
    }
  }
  function handleFilter(e) {
    setSortKey(e.target.value);
  }
  return (
    <div className="flex flex-col md:w-[95%] w-[82%] mx-auto">
      <div className="w-full mx-auto  flex items-center justify-between">
        <div
          className={
            theme ? "w-[70%] flex items-center  " : "w-[70%] flex items-center "
          }
        >
          <img
            className="absolute w-5 inline-block m-2 text-slate-200"
            src={searchImg}
            alt="search logo"
          />
          <input
            className={
              theme === "dark"
                ? "w-full shadow-5xl my-4 p-2 px-8 outline-none rounded text-sm bg-gradient-to-tr from-[#08203e] from-30% via-cyan-800 to-70%  to-[#557c93] text-[#fff] placeholder:text-[#e6e6e6]"
                : "w-full my-4 p-2 px-8 outline-none border rounded text-sm shadow-4xl "
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search by Name"}
          />
        </div>

        <select
          className={
            theme === "dark"
              ? "w-[28%] shadow-5xl rounded bg-gradient-to-tr from-[#08203e] to-[#557c93] p-[.64rem] my-4 text-sm text-[#e6e6e6] focus:bg-[#557c93]"
              : "w-[28%] rounded shadow-4xl  bg-transparent p-[.64rem]  my-4 border text-sm"
          }
          onChange={(e) => setTypeFilter(e.target.value)}
          value={typeFilter}
          placeholder="Filter"
        >
          <option
            className={
              theme === "dark"
                ? "bg-gradient-to-tr from-[#08203e] to-[#557c93] "
                : ""
            }
            key={"1"}
            value=""
          >
            All
          </option>
          <option key={"2"} value="income">
            Income
          </option>
          <option key={"3"} value="expenses">
            Expenses
          </option>
        </select>
      </div>
      {transactions.length != 0 && (
        <div
          className={
            theme === "dark"
              ? "w-full shadow-5xl mx-auto my-4 flex flex-col rounded text-[#e6e6e6] bg-gradient-to-tr from-[#0E1C26] to-[#2A454B]"
              : "shadow-4xl w-full mx-auto my-4 flex flex-col rounded"
          }
        >
          <div className="w-[93.5%] mx-auto  flex  items-center my-4 justify-between max-lg:gap-6 max-lg:flex-col">
            <h1 className="font-medium">My Transaction</h1>
            <div className="flex  max-sm:flex-col">
              <label
                htmlFor="noSort"
                className={
                  sortKey === "noSort"
                    ? theme === "dark"
                      ? "cursor-pointer text-sm rounded-md  bg-theme text-center my-2 px-2 py-[.45rem] w-[10rem]  flex justify-center items-center  bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
                      : "cursor-pointer text-sm rounded-md  bg-theme text-white text-center my-2 px-2 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center"
                    : theme === "dark"
                    ? "cursor-pointer text-sm rounded-md  bg-white  text-center my-2 px-2 py-[.45rem] w-[10rem]  flex justify-center items-center  bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
                    : "cursor-pointer text-sm rounded-md text-theme bg-white  text-center my-2 px-2 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center"
                }
              >
                No Sort
              </label>
              <input
                type="radio"
                id="noSort"
                name="noSort"
                value="noSort"
                className="hidden"
                onChange={handleFilter}
              />

              <label
                htmlFor="date"
                className={
                  sortKey === "date"
                    ? theme === "dark"
                      ? "cursor-pointer text-sm rounded-md    bg-theme text-center my-2 px-2 py-[.45rem] w-[10rem]  flex justify-center items-center  bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
                      : "cursor-pointer text-sm rounded-md  bg-theme text-white text-center my-2 px-2 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center"
                    : theme === "dark"
                    ? "cursor-pointer text-sm rounded-md    text-center my-2 px-2 py-[.45rem] w-[10rem]  flex justify-center items-center  bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
                    : "cursor-pointer text-sm rounded-md text-theme  bg-white text-center my-2 px-2 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center"
                }
              >
                Sort by Date
              </label>
              <input
                type="radio"
                id="date"
                name="date"
                value="date"
                className="hidden"
                onChange={handleFilter}
              />

              <label
                htmlFor="amount"
                className={
                  sortKey === "amount"
                    ? theme === "dark"
                      ? "cursor-pointer text-sm rounded-md  bg-theme text-center my-2 px-2 py-[.45rem] w-[10rem]  flex justify-center items-center  bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
                      : "cursor-pointer text-sm rounded-md  bg-theme text-white text-center my-2 px-2 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center"
                    : theme === "dark"
                    ? "cursor-pointer text-sm rounded-md  bg-white  text-center my-2 px-2 py-[.45rem] w-[10rem]  flex justify-center items-center  bg-gradient-to-tl from-[#0B2C24] to-[#247A4D] text-[#e6e6e6]"
                    : "cursor-pointer text-sm rounded-md text-theme bg-white text-center my-2 px-2 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center"
                }
              >
                Sort by Amount
              </label>
              <input
                type="radio"
                id="amount"
                name="date"
                value="amount"
                className="hidden"
                onChange={handleFilter}
              />
            </div>
            <div className="md:flex w-auto  gap-4 max-md:gap-6">
              <button
                disabled={loading}
                className={
                  theme === "dark"
                    ? "text-sm rounded text-[#e6e6e6] bg-white hover:bg-theme hover:text-white text-center my-2 px-4 py-[.45rem] w-[10rem] flex justify-center items-center bg-gradient-to-tl from-[#0B2C24] to-[#247A4D]"
                    : "text-sm rounded text-theme bg-white hover:bg-theme hover:text-white text-center my-2 px-4 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center "
                }
                onClick={exportCSV}
              >
                {loading ? "Loading.." : "Export to CSV"}
              </button>
              <label
                htmlFor="csv-file"
                className={
                  theme === "dark"
                    ? "cursor-pointer text-sm rounded text-[#e6e6e6] bg-white hover:bg-theme hover:text-white text-center my-2 px-4 py-[.45rem] w-[10rem] flex justify-center items-center bg-gradient-to-tl from-[#0B2C24] to-[#247A4D]"
                    : "cursor-pointer text-sm rounded hover:text-theme hover:bg-white bg-theme text-white text-center my-2 px-4 py-[.45rem] w-[10rem] border-[1px] border-theme flex justify-center items-center "
                }
              >
                {loading ? "Loading.." : "Import from CSV"}
              </label>
              <input
                className="hidden"
                id="csv-file"
                type="file"
                accept=".csv"
                required
                onChange={importCSV}
              />
            </div>
          </div>
          <Basic
            className={
              theme === "dark"
                ? " w-[80%] text-[1px] md:w-[96%] mx-auto text-[#e6e6e6]  hover:bg-theme hover:text-white bg-gradient-to-tr from-[#CAF2EF] to-[#C9EFDC]"
                : "w-[96%] mx-auto"
            }
            data={sortedTransaction}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
