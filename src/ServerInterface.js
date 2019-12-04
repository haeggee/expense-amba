import User from "./User"
import Group from "./Group"
import Bill from "./Bills"

import { setEmptyState } from "./actions/helpers";
import { getState, setState } from "statezero"


export default class ServerInterface {

    static userList = [new User("Alice`s username", "password", "fucker", "Alice.gmail.com"),
    new User("Bob`s username", "password", "Bob", "Bob.gmail.com"),
    new User("Jame`s username", "password", "James", "James.gmail.com"),
    new User("Maria`s username", "password", "Maria", "Maria.gmail.com"),
    new User("Thoma`s username", "password", "Thomas", "Thomas.gmail.com"),
    new User("Jennifer`s username", "password", "Jennifer", "Jennifer.gmail.com")]

    static billsGroup0 =
        [new Bill(0, "Uber", 20.0, new Date('2019-10-01'), this.userList[0], this.userList),
        new Bill(1, "Dinner", 35.0, new Date('2019-10-12'), this.userList[1], [this.userList[0], this.userList[1], this.userList[2]]),
        new Bill(2, "Movie tickets", 15.0, new Date('2019-10-25'), this.userList[4], [this.userList[4], this.userList[0], this.userList[5]])]

    static groupList = [new Group(0, "Family", this.userList, this.billsGroup0,
        [0, 0, 0, 0, 0, 0]),
    new Group(1, "TO", [this.userList[0], this.userList[2], this.userList[3], this.userList[4], this.userList[5]], [], []),
    new Group(2, "Team 42", [this.userList[0], this.userList[1]], [], [])]

    static _largestGroupID = 2

    static _largestBillID = 2

    static getNextGroupID() {
        this._largestGroupID++
        return this._largestGroupID
    }

    static getUserByUsername(username) {
        const users = this.userList.filter(value => value.username === username)
        return users[0]
    }

    /** ** -- USER FUNCTIONS --------------------------- */
    /**
     * Makes server call to get user with userID of DB
     * @param  id 
     */
    static getUserById(id) {
        const url = '/users/' + id;
        fetch(url).then((res) => {
            if (res.status === 200) {
                const result = res.json();
                return result;
            }
        }).then((json) => {
            setState("user", json)
            setState("groups", json.groups)
        }).catch((error) => {
            console.log(error);
        })
    }
    /**
     * Make server call to login after user input
     * @param {String} username 
     * @param {String} password 
     */
    static userLogin(username, password) {
        const url = '/users/login'
        const data = { username: username, password: password }
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                const result = res.json();
                return result;
            } else {
                alert('Username and password combination incorrect')
                return null;
            }
        }).then((json) => {
            setState("user", json)
            setState("groups", json.groups)
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * Creates new user in DB and directs to overview
     * @param {String} username 
     * @param {String} name 
     * @param {String} email 
     * @param {String} password 
     */
    static userRegister(username, name, email, password) {
        const url = '/users'
        const data = { username: username, password: password, name: name, email: email }
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Registration failed. Try a different username and/or email.')
                return null;
            }
        }).then((json) => {
            setState("user", json)
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * Logout user, redirect to homepage and delete state as well as cookie.
     */
    static userLogout() {
        const url = "/users/logout";

        fetch(url)
            .then(res => {
                setEmptyState();
            })
            .catch(error => {
                console.log(error);
            });
    }


    /**
     * get all users from the server.
     * Note that users will only contain 'username' and 'name' fields for security reasons
     * @param setter: callback function
     */
    static getAllUsers(setter) {
        const url = '/users'
        const request = new Request(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            // console.log("got request " + res.status)
            if (res.status === 200) {
                return res.json()
            } else {
                alert('Cannot fetch all users.')
                return null;
            }
        }).then((json) => {
            setter(json)
        }).catch((error) => {
            console.log(error);
        })
    }

    static modifyUser(id, username, name, email, password, callback) {
        const url = '/users/' + id
        const data = { username: username, password: password, name: name, email: email }
        const request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        }).then((json) => {
            if (json) {
                callback(true) // show success to caller
            } else {
                callback(false) // show failure to caller
            }
        }).catch((error) => {
            callback(false)
            console.log(error);
        })
    }

    static deleteUser(id, callback) {
        const url = '/users/' + id
        const request = new Request(url, {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        }).then((json) => {
            if (json) {
                callback(true) // show success to admin page
            } else {
                callback(false) // show failure to admin page
            }
        }).catch((error) => {
            callback(false)
            console.log(error);
        })
    }

    /**
     * Check if cookie exists, and set data accordingly.
     */
    static checkCookie = () => {
        const url = "/users/check-session";
        fetch(url).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(json => {
            if (json && json.id) {
                this.getUserById(json.id)
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    /** ** -- GROUP FUNCTIONS --------------------------- */
    /**
     * create a group in db and set state
     * @param name
     * @param users :An array of users to be added to the group.
     *               Current user will be automatically added if not in the array
     */
    static requestGroupCreation(name, users, callback) {
        const url = '/group'
        const currUser = getState('user')
        if (!users.find(user => user._id === currUser._id)) {
            users.push(currUser)
        }
        const data = { name: name, groupMembers: users, bills: [] }
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Group creation failed. Please try again.')
                return null;
            }
        }).then((json) => {
            let groups = getState('groups')
            const user = getState('user')
            if (groups === undefined) {
                groups = []
            }
            // this isnt working
            // groups.push(json)
            // user.groups.push(json)
            const newGroups = [json, ...groups]
            const newUserGroups = [json, ...user.groups]
            const newUser = {
                _id: user._id,
                name: user.name,
                username: user.username,
                password: user.password,
                email: user.email,
                groups: newUserGroups
            }
            callback(json)
            setState('groups', newGroups)
            setState('user', newUser)
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * Removes a group.
     * @param group The group to remove.
     */
    static requestGroupDeletion(group, callback) {
        let url = "/group/"
        url += group._id;

        const request = new Request(url, {
            method: 'delete',
        })

        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Group deletion failed. Please try again.')
                return null;
            }
        }).then((json) => {
            callback()
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * add a list of users to the group and set state
     * @param users
     * @param group
     */
    static addUsersToGroup(users, group, callback) {
        const url = '/group/' + group._id
        const data = { addUsers: users }
        const request = new Request(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Cannot add the users. Please try again.')
                return null;
            }
        }).then((json) => {
            /*getState('groups').map(group => {
                if (group._id === json._id) {
                    return json;
                } else {
                    return group;
                }
            })*/

            const groups = getState("groups")

            let newGroups = []
            for (let i = 0; i < groups.length; i ++) {
                const group = groups[i]
                // found the group we were looking for
                if (group._id === json._id) {
                    let newMembers = []
                    for (let j = 0; j < users.length; j ++) {
                        newMembers.push({
                            user: users[j]._id,
                            balance: 0
                        })
                    }
                    const newGroup = {
                        _id: group._id,
                        name: group.name,
                        bills: group.bills,
                        groupMembers: [...newMembers, ...group.groupMembers]
                    }
                    newGroups.push(newGroup)
                    callback(newGroup)
                } else {
                    newGroups.push(groups[i])
                }
            }
            setState("groups", newGroups)

        }).catch((error) => {
            console.log(error);
        })
    }

    static updateGroup(group) {
        let url = "/group/"
        url += group._id
        const data = { name: group.name, groupMembers: group.groupMembers, bills: group.bills }
        const request = new Request(url, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })

        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Group update failed.')
                return null;
            }
        }).then((json) => {

        }).catch((error) => {
            console.log(error);
        })
    }

/** ** -- BILL FUNCTIONS --------------------------- */
    static requestBillCreation(group, title, amount, date, payer, payees) {
        const url = '/bills'
        const data = {
            title: title,
            amount: amount,
            date: date,
            payer: payer,
            payees: payees,
            group: group
        }
        console.log(group)
        console.log(payer)
        console.log(payees)
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert('Cannot create bill.')
                return null;
            }
        }).then((json) => {
            const bills = getState('bills')
            const newBills = [json, ...bills]
            setState("bills", newBills)

            // Go through each group until we find the one this bill is a part of.
            const groups = getState('groups')
            const newGroups = []
            for (let i = 0; i < groups.length; i ++) {
                const group = groups[i]
                // found the group, add to the groups bills array
                if (group._id === json.group) {
                    const newBills = [json._id, ...group.bills]

                    // update balances for each group member
                    let newGroupMembers = []
                    const payment = +(amount/payees.length)
                    for (let j = 0; j < group.groupMembers.length; j ++) {
                        let memberFound = false
                        let payerPayedForHimself = false
                        for (let k = 0; k < payees.length; k ++) {
                            if (payees[k]._id === group.groupMembers[j].user) {
                                // payer is also paying for himself
                                if (group.groupMembers[j].user === payer._id) {
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance + payment - amount
                                    })
                                    payerPayedForHimself = true
                                } else {
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance + payment
                                    })
                                }
                                memberFound = true
                            }
                        }

                        if (group.groupMembers[j].user === payer._id && !payerPayedForHimself) {
                            newGroupMembers.push({
                                user: group.groupMembers[j].user,
                                balance: group.groupMembers[j].balance - amount
                            })
                        }
                        else if (!memberFound) {
                            newGroupMembers.push(group.groupMembers[j])
                        }
                    }

                    // create a copy of the old group but with the new bill added.
                    // gotta create a new object because group is read only.
                    const newGroup = {
                        _id: group._id,
                        name: group.name,
                        groupMembers: newGroupMembers,
                        bills: newBills
                    }
                    newGroups.push(newGroup)
                    this.updateGroup(newGroup)
                } else {
                    newGroups.push(group)
                }
            }

            setState('groups', newGroups)


        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * get all bills from the server.
     * @param setter: callback function
     */
    static getAllBills(setter) {
        const url = '/bills'
        const request = new Request(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                alert('Cannot fetch all bills.')
                return null;
            }
        }).then((json) => {
            setter(json)
            //setState("bills", json)

        }).catch((error) => {
            console.log(error);
        })
    }

    static requestBillDeletion(bill) {
        let url = "/bills/"
        url += bill._id
        const request = new Request(url, {
            method: 'delete'
        })

        fetch(request).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Bill deletion failed. Please try again.')
                return null;
            }
        }).then((json) => {

            // Go through each group until we find the one this bill is a part of.
            const groups = getState('groups')

            const newGroups = []
            for (let i = 0; i < groups.length; i ++) {
                const group = groups[i]
                // found the group
                if (group._id === bill.group) {

                    // update balances for each group member
                    let newGroupMembers = []
                    const payment = +(bill.amount/bill.payees.length)
                    for (let j = 0; j < group.groupMembers.length; j ++) {
                        let memberFound = false
                        let payerPayedForHimself = false
                        for (let k = 0; k < bill.payees.length; k ++) {

                            if (bill.payees[k] === group.groupMembers[j].user) {
                                // payer is also paying for himself
                                if (group.groupMembers[j].user === bill.payer) {
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance - payment + bill.amount
                                    })
                                    payerPayedForHimself = true
                                } else {
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance - payment
                                    })
                                }
                                memberFound = true
                            }
                        }

                        if (group.groupMembers[j].user === bill.payer._id && !payerPayedForHimself) {
                            newGroupMembers.push({
                                user: group.groupMembers[j].user,
                                balance: group.groupMembers[j].balance + bill.amount
                            })
                        }
                        if (!memberFound) {
                            newGroupMembers.push(group.groupMembers[j])
                        }
                    }

                    // create a copy of the old group but with the new bill added.
                    // gotta create a new object because group is read only.
                    const newGroup = {
                        _id: group._id,
                        name: group.name,
                        groupMembers: newGroupMembers,
                        bills: group.bills
                    }
                    newGroups.push(newGroup)
                    this.updateGroup(newGroup)
                } else {
                    newGroups.push(group)
                }
            }
            setState('groups', newGroups)
        }).catch((error) => {
            console.log(error);
        })
    }
}