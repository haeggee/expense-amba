import User from "./User"
import Group from "./Group"
import Bill from "./Bills"

import { setState } from "./actions/helpers";


export default class ServerInterface {

    static userList = [new User("Alice`s username", "password", "Alice", "Alice.gmail.com"),
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
        const url = 'http://localhost:3001/users'
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
                console.log('user found')
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


    static getUserGroupsByUserName(username) {
        const user = this.getUserByUsername(username)
        return user.groups
    }

    static getAllUsers() {
        return this.userList
    }

    static getAllGroups() {
        return this.groupList
    }

    static addUser(user) {
        this.userList.push(user)
    }

    static addGroup(group) {
        this.groupList.push(group)
    }

    static numGroups() {
        return this.groupList.length
    }

    static requestBillCreation(group, title, amount, date, payer, payees) {
        this._largestBillID++
        const bill = new Bill(this._largestBillID, title, amount, date, payer, payees, group)
        group.addBill(bill)
        return bill
    }

    static requestBillDeletion(bill) {
        bill.group.removeBill(bill)
    }

}