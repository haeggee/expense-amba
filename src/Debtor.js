
/** 
 * Class that represents a Debtor. If the amount owed is positive, this person owes oney. If the amount is negative, this person is owed money (he is a creditor).
 */
export default class Debtor {
	
	/**
	 * Create a new Debtor.
	 * @param {user} The user this Debtor represents.
	 * @param {amount} The amount of money owed. If the amount owed is positive, this person owes oney. If the amount is negative, this person is owed money (he is a creditor).
	 */
	constructor(user, amount) {
    this.user = user;
    this.amount = amount;
    this.username = user.username;
  }
}