import { addTransaction, saveTransaction, loadTransaction, transactions, } from "./transactions.js";
import { renderTransaction } from "./ui.js";
document.addEventListener("DOMContentLoaded", () => {
    console.log("script loaded");
    loadTransaction();
    renderTransaction();
    // Elements
    const inputDescription = document.getElementById("input-description");
    const inputAmount = document.getElementById("input-amount");
    const inputType = document.getElementById("input-type");
    const inputDate = document.getElementById("input-date");
    const searchTransaction = document.getElementById("search-transaction");
    const filterType = document.getElementById("filter-type");
    const resetBtn = document.getElementById("reset-btn");
    const addBtn = document.getElementById("add-btn");
    const successTick = document.getElementById("success-tick");
    let debounceTimeout;
    // Form
    const transactionForm = document.getElementById("transaction-form");
    const today = new Date().toISOString().split("T")[0];
    inputDate.max = today;
    function handleFormSubmit(e) {
        // Reading values
        const enteredDesc = inputDescription.value.trim();
        const enteredAmount = parseFloat(inputAmount.value);
        const enteredType = inputType.value;
        const enteredDate = inputDate.value;
        console.log(enteredDate);
        e.preventDefault(); // stop the form from reloading the page
        if (!enteredDesc ||
            isNaN(enteredAmount) ||
            enteredAmount <= 0 ||
            !enteredDate) {
            alert("Please Enter Required Fields Properly");
            return;
        }
        const newTransaction = {
            description: enteredDesc,
            amount: enteredAmount,
            type: enteredType,
            date: enteredDate,
            id: Date.now(),
        };
        successTick.classList.add("active");
        setTimeout(() => {
            successTick.classList.remove("active");
            const circle = successTick.querySelector(".tick-circle");
            const check = successTick.querySelector(".tick-check");
            if (circle)
                circle.style.strokeDashoffset = "157";
            if (check)
                check.style.strokeDashoffset = "42";
        }, 1500);
        addTransaction(newTransaction);
        saveTransaction();
        renderTransaction();
        inputDescription.value = "";
        inputAmount.value = "";
        inputDate.value = "";
    }
    function searchInputTransaction() {
        clearTimeout(debounceTimeout);
        debounceTimeout = window.setTimeout(() => {
            const enteredQuery = String(searchTransaction.value.toLowerCase().trim());
            const results = transactions.filter((t) => t.description.toLowerCase().trim().includes(enteredQuery));
            if (results.length === 0) {
                alert("No Such Transaction Exists");
                renderTransaction();
            }
            else {
                renderTransaction(results);
                searchTransaction.value = "";
            }
        }, 0.9 * 1000);
    }
    function filterTransactions(receivedFilterType) {
        const enteredType = filterType.value || receivedFilterType;
        if (enteredType === "select-type") {
            console.log("Selected:", enteredType);
            return;
        }
        console.log("selected:", enteredType);
        if (enteredType === "Incomes") {
            const incomeTransactions = transactions.filter((t) => t.type === "Income");
            console.log(incomeTransactions.length);
            renderTransaction(incomeTransactions);
        }
        else if (enteredType === "Expenses") {
            const expenseTransactions = transactions.filter((t) => t.type === "Expense");
            renderTransaction(expenseTransactions);
        }
        else {
            renderTransaction();
        }
    }
    function resetFilter() {
        filterType.value = "select-type";
        renderTransaction();
    }
    transactionForm.addEventListener("submit", handleFormSubmit);
    searchTransaction.addEventListener("input", searchInputTransaction);
    filterType.addEventListener("change", filterTransactions);
    resetBtn.addEventListener("click", resetFilter);
});
//# sourceMappingURL=main.js.map