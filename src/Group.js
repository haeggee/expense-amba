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
        this.bills = []
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
        if (bills) {
            for (let i = 0; i < bills.length; i++) {
                this.addBill(bills[i])
            }
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
        // amount each member has to pay to current user (the + converts this to a integer)
        const owed = +(bill.amount / (bill.payees.length)).toFixed(2)

        for (let i = 0; i < this.groupMembers.length; i++) {
            const member = this.groupMembers[i]
            if (member.user === bill.payer) {
                member.debt -= +bill.amount
            }
            if (bill.payees.includes(member.user)){
                member.debt += owed
            }
            member.debt = Math.round(member.debt*100) / 100
        }

        bill.group = this
    	this.bills.push(bill)

	}

	removeBill(bill) {
        const owed = +(bill.amount / (bill.payees.length)).toFixed(2)

        for (let i = 0; i < this.groupMembers.length; i++) {
            const member = this.groupMembers[i]
            if (member.user === bill.payer) {
                member.debt += +bill.amount
            }
            if (bill.payees.includes(member.user)){
                member.debt -= owed
            }
            member.debt = Math.round(member.debt*100) / 100
        }

        this.bills = this.bills.filter(value => value !== bill)
    }
}

class GroupMember {
    constructor(user, debt) {
        this.user = user
        this.debt = debt ? debt : 0
    }

}