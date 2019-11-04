
/** 
Class that represents a specific Bill. Has information such as who it is for, who is paying, the date, the amount, etc.
*/
export default class Bill {

	/**
	 * Creates a new Bill.
	 * @param {billID} The id. Should be unique.
	 * @param {title} The title of the bill.
	 * @param {amount} The amount being paid.
	 * @param {date} The data of this bill.
	 * @param {payer} The User paying.
	 * @param {payees} Array of users receiving the payment.
	 */
	constructor(billID, title, amount, date, payer, payees, group) {
		this.billID = billID
		this.title = title
		this.amount = amount
		this.date = date
		this.payer = payer
		this.payees = payees
		this.group = group
	}

	toPayeesString() {
		let text = this.payees[0].name + ": CAD$" + (this.amount / this.payees.length).toFixed(2);
		for (let i = 1; i < this.payees.length; i++) {
			text += "\n" + this.payees[i].name + ": CAD$" + (this.amount / this.payees.length).toFixed(2);
		}
		return text;
	}
}