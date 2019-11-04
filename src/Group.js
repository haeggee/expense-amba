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
    constructor(groupID, name, members, bills, debts) {
        this.groupID = groupID
        this.name = name
        this.bills = bills
        this.groupMembers = []
        for (let i = 0; i < members.length; i++) {
        	if (debts) {
				this.groupMembers.push(new GroupMember(members[i], debts[i]))
			}
        	else{
				this.groupMembers.push(new GroupMember(members[i]))
			}
        }
        // add more fields here later as needed
        for (let i = 0; i < members.length; i++) {
            this.groupMembers[i].user._addToGroup(this)
        }
    }

    addMember(user, debt) {
        this.groupMembers.push(new GroupMember(user, debt))
        user._addToGroup(this)
    }

    addMembers(users) {
    	for (let i = 0; i < users.length; i++) {
    		this.addMember(users[i])
		}
	}

    hasUser(user) {
        for (let i = 0; i < this.groupMembers.length; i++){
        	if (this.groupMembers[i].user === user){
        		return true
			}
		}
        return false
    }

    addBill(bill) {
    	this.bills.push(bill)
	}
}

class GroupMember {
    constructor(user, debt) {
        this.user = user
        this.debt = debt ? debt : 0
		this.username = user.username
		this.name = user.name
    }

}