
/** 
Class that represents a specific Bill. Has information such as who it is for, who is paying, the date, the amount, etc.
*/
export default class Bill {
	
	/**
	 * Creatse a new Bill.
	 * @param {billID} The id. Should be unique.
	 * @param {title} The title of the bill.
	 * @param {amount} The amount being payed.
	 * @param {date} The data of this bill.
	 * @param {payer} The User paying.
	 * @param {payee} The user recieving the payment.
	 */
	constructor(billID, title, amount, date, payer, payee) {
		this.billID = billID
		this.title = title
		this.amount = amount
		this.date = data
		this.payer = payer
		this.payee = payee
	}
	
}