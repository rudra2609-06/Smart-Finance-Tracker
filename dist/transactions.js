export let transactions = [];
export function loadTransaction() {
    const storedTransactions = localStorage.getItem("SavedTransactions");
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
        console.log("Current list of transactions are:", transactions);
    }
}
export function saveTransaction() {
    localStorage.setItem("SavedTransactions", JSON.stringify(transactions));
}
export function addTransaction(newTx) {
    transactions.push(newTx);
    console.log(transactions);
}
export function deleteTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    saveTransaction();
}
//# sourceMappingURL=transactions.js.map