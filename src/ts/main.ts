import type { Transaction } from "./types.js";
import {
  addTransaction,
  saveTransaction,
  loadTransaction,
  transactions,
} from "./transactions.js";
import { renderTransaction } from "./ui.js";
document.addEventListener("DOMContentLoaded", () => {
  //Elements
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

  let debounceTimeout: number;

  //form
  const transactionForm = document.getElementById(
    "transaction-form"
  ) as HTMLFormElement;

  const today = new Date().toISOString().split("T")[0];
  inputDate.max = today;

  loadTransaction();
  renderTransaction();

  function handleFormSubmit(e: Event) {
    //Reading values
    const enteredDesc = inputDescription.value.trim();
    const enteredAmount = parseFloat(inputAmount.value);
    const enteredType = inputType.value as "Income" | "Expense";
    const enteredDate = inputDate.value;
    console.log(enteredDate);
    e.preventDefault(); //stop the form from reloading the page

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
      const results = transactions.filter(
        (t) => t.description.toLowerCase().trim().includes(enteredQuery)
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

  transactionForm.addEventListener("submit", handleFormSubmit);
  searchTransaction.addEventListener("input", searchInputTransaction);
});
