export  interface Transaction{
	description : string,
	amount : number,
	type : "Income" | "Expense",
	date : string,
	id : number,
}
