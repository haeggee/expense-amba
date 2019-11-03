
/** 
Class that represents a specific group. Has information such as the group name, and stores members of the group.
*/
export default class Group {
	
	/**
	 * Create a new group.
	 * @param {groupID} The id of the group. Must be unique.
	 * @param {name} The name of the group.
	 * @param {members} Array of Users. 
   * @param {bills} Array of bills belonging to the group. 
   * @param {debtors} How much user in this group owes.
	 */
	constructor(groupID, name, members, bills, debtors) {
		this.groupID = groupID;
		this.name = name;
		this.groupMembers = members;
		this.bills = bills;
		this.debtors = debtors;
		// add more fields here later as needed
	}
}