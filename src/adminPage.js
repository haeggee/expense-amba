import React from "react";
import "./App.css";
import { makeStyles, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CustomHeader } from "./GUI/Header";
import { CustomButton } from "./GUI/Theme";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Footer from "./GUI/Footer";
import { Typography } from '@material-ui/core';
import User from './User';
import Group from './Group';
import { getState } from "statezero"
import { useHistory } from "react-router-dom";


const cardStyle = makeStyles({
    card: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        marginBottom: 40,
        width: '50%',
        alignContent: 'center',
        textAlign: 'center'
    },
    alignLeft: {
        textAlign: 'left'
    },
    buttonStyle: {
        marginTop: 30,
        marginBottom: 10
    },
    field: {
        marginTop: 0,
        width: '100%'
    }
});

export function AdminPage(props) {

    const styles = cardStyle()
    const history = useHistory()
    const currentUser = getState("user")
    // if user is not admin, redirect to home
    if(!currentUser) {
        history.push('/')
    } else if (currentUser.username !== 'admin') {
        history.push('/')
    }

    /* Mock data for users, later requires a server call to get and set users
     from database. Currently defined as local state for front end, so doesnt change the data in actual users
     */

    const user = new User('user', 'user', 'user', 'user')
    const Maria = new User('Maria', 'Maria', 'Maria', 'Maria')
    const James = new User('James', 'James', 'James', 'James')
    const Bob = new User('Bob', 'Bob', 'Bob', 'Bob')
    const Thomas = new User('Thomas', 'Thomas', 'Thomas', 'Thomas')
    const Jennifer = new User('Jennifer', 'Jennifer', 'Jennifer', 'Jennifer')
    const [userList, setUserList] = React.useState([user, Maria, James, Bob, Thomas, Jennifer])

    /* Mock data for groups, later requires a server call to get and set groups
     from database. Currently defined as local state for front end, so doesnt change the data in actual users
     */
    const Family = new Group(1, 'Family', [user, Bob, Maria, James, Thomas, Jennifer], null, null)
    const TO = new Group(2, 'TO', [user, James, Maria, Thomas, Jennifer], null, null)
    const Team42 = new Group(3, 'Team 42', [user, Bob], null, null)
    const [groupList, setGroupList] = React.useState([Family, TO, Team42])


    //other data
    const [UserErrorText, setUserErrorText] = React.useState({ a: "" })
    const [UserModifyText, setUserModifyText] = React.useState({ a: "" })
    const [GroupErrorText, setGroupErrorText] = React.useState({ a: "" })

    const [userClicked, setuserClicked] = React.useState({ username: "" });
    const [groupClicked, setgroupClicked] = React.useState({ groupName: "" });

    // Functions handling clicks
    const _handleUserClick = e => {
        let givenUsername = userClicked.username
        let index = null;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === givenUsername) {
                index = i
            }
        }
        if (index != null) {
            let newUserL = userList.splice(index, 1)
            setUserList(newUserL)
            setUserErrorText({ a: "Deleted the User" })
            setUserModifyText({ a: "" })
            setGroupErrorText({ a: "" })
        }
        else {
            setUserErrorText({ a: "The user doesn't exist" })
            setUserModifyText({ a: "" })
            setGroupErrorText({ a: "" })
        }
    }

    const _handleGroupClick = e => {

        const givenGrpName = groupClicked.groupName
        let index = null;
        for (let i = 0; i < groupList.length; i++) {
            if (groupList[i].name === givenGrpName) {
                index = i
            }
        }
        if (index != null) {
            let newGroupL = groupList.splice(index, 1)
            setGroupList(newGroupL)
            setGroupErrorText({ a: "Deleted the Group" })
            setUserErrorText({ a: "" })
            setUserModifyText({ a: "" })
        }
        else {
            setGroupErrorText({ a: "The group doesn't exist" })
            setUserErrorText({ a: "" })
            setUserModifyText({ a: "" })
        }
    }

    const _handleModifyClick = e => {
        setUserModifyText({ a: "Modified the User" })
        setUserErrorText({ a: "" })
        setGroupErrorText({ a: "" })
        // Functionality to be added - Gets the users by server call and modifies the values
    }

    const DeleteTextHandler = e => {
        setuserClicked({ username: e.target.value })
    }

    const GroupDeleteHandler = e => {
        setgroupClicked({ groupName: e.target.value })
    }

    //Returned DOM
    return (
        <div>
            <CustomHeader />
            <Grid
                container
                maxWidth='lg'
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>


                <h1>Admin Options</h1>
                <Card raised="true" className={styles.card}>
                    <CardContent>
                        <h3>Delete an account</h3>
                        <Divider />

                        <br />
                        <h4 className={styles.alignLeft}> User Name</h4>
                        <TextField fullWidth variant="outlined" onChange={DeleteTextHandler} />
                        <CustomButton className={styles.buttonStyle} onClick={_handleUserClick}>Delete User Account</CustomButton>
                        <Typography color='error'>
                            {UserErrorText.a}
                        </Typography>
                    </CardContent>
                </Card>
                <Card raised="true" className={styles.card}>
                    <CardContent>
                        <h3>Delete a group</h3>
                        <Divider />
                        <br />
                        <h4 className={styles.alignLeft}> Group name</h4>
                        <TextField fullWidth variant="outlined" id={GroupDeleteHandler} />
                        <CustomButton className={styles.buttonStyle} onClick={_handleGroupClick}>Delete Group Account</CustomButton>
                        <Typography color='error'>
                            {GroupErrorText.a}
                        </Typography>
                    </CardContent>
                </Card>
                <Card raised="true" className={styles.card}>
                    <CardContent>
                        <h3>Modify an account</h3>
                        <Divider />
                        <br />
                        <h4 className={styles.alignLeft}> User Name</h4>
                        <TextField fullWidth variant="outlined" />
                        <h4 className={styles.alignLeft}> Set Name</h4>
                        <TextField fullWidth label="Name" variant="outlined" />
                        <h4 className={styles.alignLeft}> Set Email</h4>
                        <TextField fullWidth label="Email" variant="outlined" />
                        <h4 className={styles.alignLeft}> Set Password</h4>
                        <TextField fullWidth label="Password" variant="outlined" />
                        <CustomButton className={styles.buttonStyle} onClick={_handleModifyClick}>Modify User Account</CustomButton>
                        <Typography color='error'>
                            {UserModifyText.a}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Footer />
        </div>

    )
}

export default AdminPage;