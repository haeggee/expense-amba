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
import { getState, subscribe } from "statezero"
import { useHistory } from "react-router-dom";
import ServerInterface from "./ServerInterface";


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

    // if user is logged in but not admin, redirect to overview 

    if (currentUser && currentUser.username !== 'admin') {
        history.push('/overview')
    }

    const [userList, setUserList] = React.useState([])

    // get all users beside admin to have local check before making server call
    if (userList.length === 0) {
        ServerInterface.getAllUsers((users) => {
            setUserList(users.filter((el) => el.username !== "admin"))
        })
    }

    // error messages
    const [UserErrorText, setUserErrorText] = React.useState({ a: "" })
    const [UserModifyText, setUserModifyText] = React.useState({ a: "" })

    const [userClicked, setuserClicked] = React.useState({ username: "" });

    const [modifyUsername, setModifyUsername] = React.useState("")
    const [modifyName, setModifyName] = React.useState("")
    const [modifyMail, setModifyMail] = React.useState("")
    const [modifyPassword, setModifyPassword] = React.useState("")

    // Functions handling clicks
    const _handleUserClick = e => {
        // console.log(userList)
        let givenUsername = userClicked.username
        let id = null;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === givenUsername) {
                id = userList[i]._id
            }
        }
        if (id != null) {
            ServerInterface.deleteUser(id, (success) => {
                if (success) {
                    setUserErrorText({ a: "Deleted the User" })
                    setUserModifyText({ a: "" })
                    // delete user from the local userlist
                    setUserList(userList.filter(user => user.username !== givenUsername))
                } else {
                    setUserErrorText({ a: "Deleting the user failed" })
                    setUserModifyText({ a: "" })
                }
            })
        }
        else {
            setUserErrorText({ a: "The user doesn't exist" })
            setUserModifyText({ a: "" })
        }
    }


    const _handleModifyClick = e => {
        let id = null;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username === modifyUsername) {
                id = userList[i]._id
            }
        }
        ServerInterface.modifyUser(id, modifyUsername, modifyName, modifyMail, modifyPassword,
            (success) => {
                if (success) {
                    setUserModifyText({ a: "Modified the User" })
                    setUserErrorText({ a: "" })
                } else {
                    setUserModifyText({ a: "Modifying the user failed" })
                    setUserErrorText({ a: "" })
                }
            })
    }

    const DeleteTextHandler = e => {
        setuserClicked({ username: e.target.value })
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
                        <h3>Modify an account</h3>
                        <Divider />
                        <br />
                        <h4 className={styles.alignLeft}> User Name</h4>
                        <TextField fullWidth variant="outlined"
                            value={modifyUsername} onChange={e => setModifyUsername(e.target.value)} />
                        <h4 className={styles.alignLeft}> Set Name</h4>
                        <TextField fullWidth label="Name" variant="outlined"
                            value={modifyName} onChange={e => setModifyName(e.target.value)} />
                        <h4 className={styles.alignLeft}> Set Email</h4>
                        <TextField fullWidth label="Email" variant="outlined"
                            value={modifyMail} onChange={e => setModifyMail(e.target.value)} />
                        <h4 className={styles.alignLeft}> Set Password</h4>
                        <TextField fullWidth label="Password" variant="outlined"
                            value={modifyPassword} onChange={e => setModifyPassword(e.target.value)} />
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