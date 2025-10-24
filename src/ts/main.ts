import type { Transaction } from "./types.js";
import {
  addTransaction,
  saveTransaction,
  loadTransaction,
  transactions,
} from "./transactions.js";
import { renderTransaction } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  //dark mode
  const modeToggleBtn = document.getElementById("dark-mode") as
  HTMLButtonElement;

  // Elements
  const inputDescription = document.getElementById(
    "input-description"
  ) as HTMLInputElement;
  const inputAmount = document.getElementById(
    "input-amount"
  ) as HTMLInputElement;
  const inputType = document.getElementById("input-type") as HTMLSelectElement;
  const inputDate = document.getElementById("input-date") as HTMLInputElement;
  const searchTransaction = document.getElementById(
    "search-transaction"
  ) as HTMLInputElement;
  const filterType = document.getElementById("filter-type") as 
  HTMLSelectElement;
  const resetBtn = document.getElementById("reset-btn") as 
  HTMLButtonElement;
  const addBtn = document.getElementById("add-btn")! as 
  HTMLButtonElement;
  const successTick = document.getElementById("success-tick") as 
  HTMLButtonElement;

  let debounceTimeout: number;

  // Form
  const transactionForm = document.getElementById(
    "transaction-form"
  ) as HTMLFormElement;

  const today = new Date().toISOString().split("T")[0];
  inputDate.max = today;

  loadTransaction();
  renderTransaction();

  function handleFormSubmit(e: Event) {
    // Reading values
    const enteredDesc = inputDescription.value.trim();
    const enteredAmount = parseFloat(inputAmount.value);
    const enteredType = inputType.value as "Income" | "Expense";
    const enteredDate = inputDate.value;
    console.log(enteredDate);
    e.preventDefault(); // stop the form from reloading the page

    if (
      !enteredDesc ||
      isNaN(enteredAmount) ||
      enteredAmount <= 0 ||
      !enteredDate
    ) {
      alert("Please Enter Required Fields Properly");
      return;
    }

    const newTransaction: Transaction = {
      description: enteredDesc,
      amount: enteredAmount,
      type: enteredType,
      date: enteredDate,
      id: Date.now(),
    };

    successTick.classList.add("active");

    setTimeout(() => {
      successTick.classList.remove("active");

      const circle = successTick.querySelector(".tick-circle") as SVGElement | null;
      const check = successTick.querySelector(".tick-check") as SVGElement | null;

      if (circle) circle.style.strokeDashoffset = "157";
      if (check) check.style.strokeDashoffset = "42";
    }, 1500);

    addTransaction(newTransaction);
    saveTransaction();
    renderTransaction();

    inputDescription.value = "";
    inputAmount.value = "";
    inputDate.value = "";
  }

  function searchInputTransaction(): void {
    clearTimeout(debounceTimeout);
    debounceTimeout = window.setTimeout(() => {
      const enteredQuery = String(searchTransaction.value.toLowerCase().trim());
      const results = transactions.filter((t) =>
        t.description.toLowerCase().trim().includes(enteredQuery)
      );

      if (results.length === 0) {
        alert("No Such Transaction Exists");
        renderTransaction();
      } else {
        renderTransaction(results);
        searchTransaction.value = "";
      }
    }, 0.9 * 1000);
  }

  function filterTransactions(receivedFilterType?:any):void{
    const enteredType = filterType.value || receivedFilterType;
    if (enteredType === "select-type") {
      console.log("Selected:",enteredType);
      return;
    } 
    console.log("selected:",enteredType);
    if (enteredType === "Incomes") {
      const incomeTransactions = transactions.filter((t) => t.type === "Income");
      console.log(incomeTransactions.length);
      
      renderTransaction(incomeTransactions);
    } else if(enteredType === "Expenses") {
      const expenseTransactions = transactions.filter((t) => t.type === "Expense");
      renderTransaction(expenseTransactions);
    } else {
      renderTransaction();
    }
  }

  function resetFilter():void {
    filterType.value = "select-type";
    renderTransaction();
  }

  transactionForm.addEventListener("submit", handleFormSubmit);
  searchTransaction.addEventListener("input", searchInputTransaction);
  filterType.addEventListener("change",filterTransactions);
  resetBtn.addEventListener("click",resetFilter);
});
