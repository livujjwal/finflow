import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import AddIncome from "./AddIncome";
import AddExpenses from "./AddExpenses";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import TransactionTable from "./TransactionTable";
import NoTransactions from "./NoTransaction";
import Chart from "./Charts";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";
const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpensesModalVisible, setIsExpensesModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const showExpensesModal = () => {
    setIsExpensesModalVisible(true);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const handleExpensesCancel = () => {
    setIsExpensesModalVisible(false);
  };
  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, "users/" + user.uid + "/transactions"),
        transaction
      );
      let newArr = transactions;
      let trans = { ...transaction, key: transactions.length + 1 };
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
      if (!many) toast.success("Transaction Added!");
    } catch (error) {
      if (!many) toast.error(" Couldn't add transaction");
    }
  }
  useEffect(() => {
    if (user) getTransaction();
  }, [user]);
  async function getTransaction() {
    const queryRes = await getDocs(
      query(collection(db, "users/" + user.uid + "/transactions"))
    );
    const transactionArray = [];
    queryRes.forEach((doc) => {
      transactionArray.push({ ...doc.data(), key: doc.id });
    });
    setTransactions(transactionArray);
  }
  useEffect(() => {
    calculateBalance();
  }, [transactions]);
  function calculateBalance() {
    let incomeTotal = 0;
    let expensesTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income")
        incomeTotal += Number(transaction.amount);
      else expensesTotal += Number(transaction.amount);
      setBalance(incomeTotal - expensesTotal);
      setExpenses(expensesTotal);
      setIncome(incomeTotal);
    });
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  function onFinish(values, type) {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: values.amount,
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
    handleIncomeCancel();
    handleExpensesCancel();
  }

  return (
    <div>
      <Cards
        income={income}
        expenses={expenses}
        balance={balance}
        showIncomeModal={showIncomeModal}
        showExpensesModal={showExpensesModal}
      />
      <AddIncome
        title={"Add Income"}
        onFinish={onFinish}
        handleIncomeCancel={handleIncomeCancel}
        isIncomeModalVisible={isIncomeModalVisible}
      >
        Income
      </AddIncome>
      <AddExpenses
        title={"Add Expenses"}
        onFinish={onFinish}
        handleExpensesCancel={handleExpensesCancel}
        isExpensesModalVisible={isExpensesModalVisible}
      >
        Expenses
      </AddExpenses>
      {transactions.length != 0 ? (
        <Chart sortedTransactions={sortedTransactions} />
      ) : (
        <NoTransactions />
      )}
      <TransactionTable
        transactions={transactions}
        addTransaction={addTransaction}
        getTransaction={getTransaction}
      />
    </div>
  );
};

export default Dashboard;
