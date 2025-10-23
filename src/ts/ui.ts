import { transactions, deleteTransaction } from "./transactions.js";

export function renderTransaction(): void {
  const displayContainer = document.getElementById(
    "display-container"
  ) as HTMLDivElement;
  const displayIncome = document.getElementById(
    "display-income"
  ) as HTMLParagraphElement;
  const displayExpense = document.getElementById(
    "display-expense"
  ) as HTMLParagraphElement;
  const displayBalance = document.getElementById(
    "display-balance"
  ) as HTMLParagraphElement;

  const headerHTML =
    displayContainer.querySelector(".description-headers")?.outerHTML || "";
  displayContainer.innerHTML = headerHTML;

  let transactionsHTML = "";

  transactions.forEach((transaction) => {
    transactionsHTML += `
      <div class="transactions grid grid-cols-5 gap-2 p-3 text-gray-800 text-sm text-center md:text-left items-center border-t border-gray-200">
        <p class="truncate">${transaction.description}</p>
        <p>${transaction.amount}</p>
        <p>${transaction.type}</p>
        <p>${transaction.date}</p>
        <p class="text-red-500 cursor-pointer hover:underline" data-id = ${transaction.id}>Delete</p>
      </div>
    `;
  });

  displayContainer.innerHTML += transactionsHTML;

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "Income") income += t.amount;
    else expense += t.amount;
  });

  const balance = income - expense;

  displayIncome.textContent = `$${income.toFixed(2)}`;
  displayExpense.textContent = `$${expense.toFixed(2)}`;
  displayBalance.textContent = `$${balance.toFixed(2)}`;

  displayContainer.addEventListener("click", (e) => {
    const targetedElement = e.target as HTMLElement;
    if (
      targetedElement.tagName === "P" &&
      targetedElement.classList.contains("text-red-500")
    ) {
      const id = parseInt(targetedElement.getAttribute("data-id")!);
      deleteTransaction(id);
      renderTransaction();
    }
  });
}
