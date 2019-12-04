import { setEmptyState } from "./actions/helpers";
import { getState, setState } from "statezero"


export default class ServerInterface {

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

        fetch(url).then(res => {
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

    /**
     * Update the user with the provided properties.
     * @param id
     * @param username
     * @param name
     * @param email
     * @param password
     * @param callback
     */
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

    /**
     * Delete the user with the id.
     * @param id
     * @param callback The callback that gets notified of success or failure.
     */
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
     * @param callback: the function that accepts the new group that gets created and gets notified when database
     * operations are complete.
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
     * @param callback: the function that gets notified when database operations are complete.
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
     * @param callback The function that accepts the group that was modified and callback gets notified when database
     * operations are complete.
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

            const groups = getState("groups")

            // update the array of groups
            let newGroups = []
            for (let i = 0; i < groups.length; i ++) {
                const group = groups[i]
                // found the group we added to
                if (group._id === json._id) {
                    let newMembers = []
                    // add new members to array
                    for (let j = 0; j < users.length; j ++) {
                        newMembers.push({
                            user: users[j]._id,
                            balance: 0
                        })
                    }
                    // create a new group that is an exact duplicate of the old one, except it has the new group members
                    // we have to do this since the old group is read only
                    const newGroup = {
                        _id: group._id,
                        name: group.name,
                        bills: group.bills,
                        groupMembers: [...newMembers, ...group.groupMembers]
                    }
                    newGroups.push(newGroup)
                    callback(newGroup)
                } else {
                    // didnt modify anything in this group, just copy without changes
                    newGroups.push(groups[i])
                }
            }
            setState("groups", newGroups)

        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * Updates specified group.
     * @param group The group that we are updating.
     */
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

    /**
     * Creates a new bill with the given properties.
     * @param group
     * @param title
     * @param amount
     * @param date
     * @param payer
     * @param payees
     */
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
            // update the bills in the front end.
            const bills = getState('bills')
            const newBills = [json, ...bills]
            setState("bills", newBills)

            const groups = getState('groups')

            // Go through each group and copy into newGroups array
            const newGroups = []
            for (let i = 0; i < groups.length; i ++) {
                const group = groups[i]

                // found the group that the bill was added to, update the groups bills array
                if (group._id === json.group) {
                    const newBills = [json._id, ...group.bills]

                    // update balances for each group member
                    let newGroupMembers = []
                    const payment = +(amount/payees.length)

                    // loop through each group member
                    for (let j = 0; j < group.groupMembers.length; j ++) {

                        // whether or not the current group member participated in the bill as a payee
                        let memberParticipated = false
                        let payerPayedForHimself = false

                        // loop through each user that participated in the bill
                        for (let k = 0; k < payees.length; k ++) {

                            // current group member participated in the bill
                            if (payees[k]._id === group.groupMembers[j].user) {

                                // the current group member is also a payer; this means that he paid for himself
                                if (group.groupMembers[j].user === payer._id) {
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance + payment - amount
                                    })
                                    payerPayedForHimself = true
                                } else {
                                    // update group members balance
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance + payment
                                    })
                                }
                                // current member is a payee
                                memberParticipated = true
                            }
                        }

                        // the current group member is the payer and he didnt pay for himself
                        if (group.groupMembers[j].user === payer._id && !payerPayedForHimself) {
                            newGroupMembers.push({
                                user: group.groupMembers[j].user,
                                balance: group.groupMembers[j].balance - amount
                            })
                        }
                        // the current group member didnt participate in the bill, so just copy without changes
                        else if (!memberParticipated) {
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
                    // save changes to the modified group in db
                    this.updateGroup(newGroup)
                } else {
                    // this group was unchanged
                    newGroups.push(group)
                }
            }

            // update the front end
            setState('groups', newGroups)

        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * get all bills from the server.
     * @param setter: callback function that gets sent all the bills when db operations are finished.
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

        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * Deletes the bill
     * @param bill The bill to delete.
     */
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

            const groups = getState('groups')

            const newGroups = []

            // go though each group and copy them into newGroups
            for (let i = 0; i < groups.length; i ++) {

                const group = groups[i]

                // current group is the one that the bill was deleted from. we must now update it to remove bill reference.
                if (group._id === bill.group) {

                    // must update balances for each group member since bill was deleted
                    let newGroupMembers = []
                    const payment = +(bill.amount/bill.payees.length)

                    // go through all the group members
                    for (let j = 0; j < group.groupMembers.length; j ++) {

                        // whether or not the current group member participated in the bill
                        let memberParticipated = false
                        let payerPayedForHimself = false

                        // go through all the payees in the bill
                        for (let k = 0; k < bill.payees.length; k ++) {

                            // current group member was a payee in the bill
                            if (bill.payees[k] === group.groupMembers[j].user) {

                                // current group member was a payee AND a payer (so he payed for himself)
                                if (group.groupMembers[j].user === bill.payer) {
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance - payment + bill.amount
                                    })
                                    payerPayedForHimself = true
                                } else {
                                    // current group member was merely a payee, update balances
                                    newGroupMembers.push({
                                        user: group.groupMembers[j].user,
                                        balance: group.groupMembers[j].balance - payment
                                    })
                                }
                                memberParticipated = true
                            }
                        }

                        // group member was a payer who did not pay for himself
                        if (group.groupMembers[j].user === bill.payer && !payerPayedForHimself) {
                            newGroupMembers.push({
                                user: group.groupMembers[j].user,
                                balance: group.groupMembers[j].balance + bill.amount
                            })
                        }
                        // member did not participate, so just copy without changes
                        else if (!memberParticipated) {
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
                    // update the changes in the db
                    this.updateGroup(newGroup)
                } else {
                    // the bill was not for this group, copy without changes
                    newGroups.push(group)
                }
            }
            // update front end
            setState('groups', newGroups)
        }).catch((error) => {
            console.log(error);
        })
    }
}