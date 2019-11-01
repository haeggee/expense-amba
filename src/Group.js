
/** 
Class that represents a specific group. Has information such as the group name, and stores members of the group.
*/
export default class Group {
	
	/**
	 * Creatse a new group.
	 * @param {groupID} The id of the group. Must be unique.
	 * @param {name} The name of the group.
	 * @param {members} Array of Users. 
	 */
	constructor(groupID, name, members) {
		this.groupID = groupID
		this.name = name
		this.groupMembers = members
		
		// add more fields here later as needed
	}
	
}