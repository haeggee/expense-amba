import User from "./User"
import Group from "./Group"
import Bill from "./Bills"

import { setState, setEmptyState } from "./actions/helpers";
import {getState} from "statezero/src"


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

    static userLogin(username, password) {
        console.log("testing")
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
                console.log('user found')
                return res.json();
            } else {
                alert('Username and password combination incorrect')
                return null;
            }
        }).then((json) => {
            setState("user", json)
        }).catch((error) => {
            console.log(error);
        })
    }

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
     * create a group in db and set state
     * @param name
     * @param users :An array of users to be added to the group.
     *               Current user will be automatically added if not in the array
     */
    static requestGroupCreation(name, users){
        const url = '/group'
        const currUser = getState('user')
        if (!users.find(user => user._id === currUser._id)){
            users.push(currUser)
        }
        const data = { name: name, users: users }
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
            const groups = getState('groups')
            groups.push(json)
            setState('groups', groups)
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * add a list of users to the group and set state
     * @param users
     * @param group
     */
    static addUsersToGroup(users, group){
        const url = '/group'
        const currUser = getState('user')
        const data = { addUsers: users }
        const request = new Request(url, {
            method: 'patch',
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
            const groups = getState('groups')
            groups.push(json)
            setState('groups', groups)
        }).catch((error) => {
            console.log(error);
        })
    }

    /**
     * get all users from the server.
     * Note that users will only contain 'username' and 'name' fields for security reasons
     * @param setter: callback function
     */
    static getAllUsers(setter){
        const url = '/users'
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
                alert('Cannot fetch all users.')
                return null;
            }
        }).then((json) => {
            setter(json)
        }).catch((error) => {
            console.log(error);
        })
    }

    static requestBillCreation(group, title, amount, date, payer, payees) {

        const url = "/bill"

        const data = {title: title, amount: amount, date: date, payerID: payer, payeeIDs: payees, group: group}
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
                alert('Bill creation failed. Please try again.')
                return null;
            }
        }).then((json) => {
            const groups = getState('groups')
            const index = groups.indexOf(group)
            groups[index].bills.push(json)
            setState('groups', groups)
        }).catch((error) => {
            console.log(error);
        })
    }

    static requestBillDeletion(bill) {
        const url = "/bill"

        const data = {id: bill._id}
        const request = new Request(url, {
            method: 'delete',
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
                alert('Bill creation failed. Please try again.')
                return null;
            }
        }).then((json) => {
        }).catch((error) => {
            console.log(error);
        })
    }
}