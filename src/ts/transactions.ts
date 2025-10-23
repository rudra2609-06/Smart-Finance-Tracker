import type { Transaction } from './types';

export let transactions: Transaction[] = [];

export function addTransaction(newTx: Transaction): void {
  transactions.push(newTx);
  console.log(transactions);
}

export function deleteTransaction(id: number): void {
  transactions = transactions.filter((t) => t.id !== id);
}

export function saveTransaction(): void {
  localStorage.setItem("SavedTransactions", JSON.stringify(transactions));
}

export function loadTransaction(): void {
  const storedTransactions = localStorage.getItem("SavedTransactions");
  if (storedTransactions) {
    transactions = JSON.parse(storedTransactions) as Transaction[];
  }
}
