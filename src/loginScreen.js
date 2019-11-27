import React, { useContext } from "react";
import "./App.css";
import { Box, makeStyles, Divider } from "@material-ui/core";
import { CustomHeader } from "./GUI/Header";
import { CustomButton } from "./GUI/Theme";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import User from './User';
import Footer from './GUI/Footer';
import { Typography } from '@material-ui/core';
// getState is used to get the value of a state path
import { getState, subscribe } from "statezero";

// Style sheet
const useStyles = makeStyles(theme => ({
  textField: {
    margin: 0,
    marginBottom: 5,
    padding: 0,
    width: 500
  },
  buttonLogin: {
    width: 150,
    marginTop: 50,
    marginBottom: 100
  },

  gridClassLeft: {
    textAlign: "center",
    borderRight: 1
  },
  gridClass: {
    textAlign: "center"
  }
}));


/**
 * Login screen.
 */
export function LoginScreen(props) {

  //Data for page and user context
  const classes = useStyles();
  let history = useHistory()
  const [userList, setUserList] = React.useState({
    userListA: []
  });

  const [error, setError] = React.useState({
    errorText: ""
  })

  const [params, setParams] = React.useState({
    loginUsername: "",
    loginPassword: "",
    signUpUsername: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpName: ""
  });

  const contextValue = useContext(UserContext)

  //Relevant functions for the page
  const _onLoginUsernameClick = e => {
    let b = params.loginPassword;
    let c = params.signUpUsername;
    let d = params.signUpEmail;
    let f = params.signUpPassword;
    let g = params.signUpName;
    setParams({
      loginUsername: e.target.value,
      loginPassword: b,
      signUpUsername: c,
      signUpEmail: d,
      signUpPassword: f,
      signUpName: g
    });
  };

  const _onLoginPasswordClick = e => {
    let a = params.loginUsername;
    let c = params.signUpUsername;
    let d = params.signUpEmail;
    let f = params.signUpPassword;
    let g = params.signUpName;
    setParams({
      loginUsername: a,
      loginPassword: e.target.value,
      signUpUsername: c,
      signUpEmail: d,
      signUpPassword: f,
      signUpName: g
    });
  };

  const _onSignUpUsernameClick = e => {
    let a = params.loginUsername;
    let b = params.loginPassword;
    let d = params.signUpEmail;
    let f = params.signUpPassword;
    let g = params.signUpName;
    setParams({
      loginUsername: a,
      loginPassword: b,
      signUpUsername: e.target.value,
      signUpEmail: d,
      signUpPassword: f,
      signUpName: g
    });
  };

  const _onSignUpPasswordClick = e => {
    let a = params.loginUsername;
    let b = params.loginPassword;
    let c = params.signUpUsername;
    let d = params.signUpEmail;
    let g = params.signUpName;
    setParams({
      loginUsername: a,
      loginPassword: b,
      signUpUsername: c,
      signUpEmail: d,
      signUpPassword: e.target.value,
      signUpName: g
    });
  };

  const _onSignUpEmailClick = e => {
    let a = params.loginUsername;
    let b = params.loginPassword;
    let c = params.signUpUsername;
    let f = params.signUpPassword;
    let g = params.signUpName;
    setParams({
      loginUsername: a,
      loginPassword: b,
      signUpUsername: c,
      signUpEmail: e.target.value,
      signUpPassword: f,
      signUpName: g
    });
  };

  const _onSignUpNameClick = e => {
    let a = params.loginUsername;
    let b = params.loginPassword;
    let c = params.signUpUsername;
    let d = params.signUpEmail;
    let f = params.signUpPassword;
    setParams({
      loginUsername: a,
      loginPassword: b,
      signUpUsername: c,
      signUpEmail: d,
      signUpPassword: f,
      signUpName: e.target.value
    });
  }

  const _handleSignClick = () => {
    // call server to try to login
    contextValue.userLogin(params.loginUsername, params.loginPassword);
    // check if state changes and redirect if successful login
    subscribe((nextState, prevState) => {
      if (nextState) { // checks if now a user exists
        history.push('/overview')
      }
    }, "user")


    // Get the listof usernames/admins and passwords from server to check
    // Requires server call
    // setError({ errorText: 'User and password combination not correct' })
    // if (params.loginUsername === "user" && params.loginPassword === "user") {
    //   contextValue.userLogin("Alice`s username")
    //   history.push("/overview");
    // } else if (
    //   params.loginUsername === "admin" &&
    //   params.loginPassword === "admin"
    // ) {
    //   contextValue.userLogin(params.loginUsername)
    //   history.push("/admin");
    // }

    // else {
    //   let userFound = null
    //   var i;
    //   let myList = userList.userListA;

    //   for (i = 0; i < myList.length; i++) {

    //     if (params.loginUsername === myList[i].username) {
    //       userFound = myList[i]
    //     }
    //   }
    //   if (userFound == null) {
    //     setError({ errorText: 'No such user exists' })
    //     return
    //   }
    //   if (params.loginPassword !== userFound.password) {
    //     setError({ errorText: 'Incorrect Password' })
    //   }
    // }
  };

  const _handleRegisterClick = () => {
    // Functionality to be added: Once clicked, it appends info to user database from server
    //Requires server call
    let newList = userList.userListA;
    newList.push(new User(params.signUpUsername, params.signUpPassword, params.signUpName, params.signUpEmail))
    setUserList({ userListA: newList })
  };

  //returned DOM
  return (
    <div>
      <CustomHeader />
      <Grid
        container
        spacing={5}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={4} className={classes.gridClassLeft}>
          <h2>First Time User</h2>
          <Divider />
          <br />
          <h4> User Name </h4>
          <TextField
            id="outlined-helperText"
            label="User Name"
            className={classes.textField}
            onChange={_onSignUpUsernameClick}
            helperText=""
            margin="normal"
            variant="outlined"
          />
          <br />
          <h4> Name </h4>
          <TextField
            id="outlined-helperText"
            label="Name"
            className={classes.textField}
            onChange={_onSignUpNameClick}
            helperText=""
            margin="normal"
            variant="outlined"
          />
          <br />
          <h4> Email </h4>
          <TextField
            id="outlined-helperText"
            label="Email"
            className={classes.textField}
            onChange={_onSignUpEmailClick}
            helperText=""
            margin="normal"
            variant="outlined"
          />
          <h4> Password </h4>
          <TextField
            id="outlined-helperText"
            label="Password"
            type="password"
            className={classes.textField}
            onChange={_onSignUpPasswordClick}
            helperText=""
            margin="normal"
            variant="outlined"
          />
          <Box>
            <CustomButton
              className={classes.buttonLogin}
              onClick={_handleRegisterClick}
            >
              Register Now
            </CustomButton>
          </Box>
        </Grid>

        <Grid item xs={1}>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item xs={4} className={classes.gridClass}>
          <h2>Already have an account?</h2>
          <Divider />
          <br />
          <h4> Username </h4>
          <TextField
            id="outlined-helperText"
            label="User Name"
            className={classes.textField}
            onChange={_onLoginUsernameClick}
            helperText=""
            margin="normal"
            variant="outlined"
          />

          <h4> Password </h4>
          <TextField
            id="outlined-helperText"
            label="Password"
            type="password"
            className={classes.textField}
            onChange={_onLoginPasswordClick}
            helperText=""
            margin="normal"
            variant="outlined"
          />
          <br />
          <Box>
            <CustomButton
              className={classes.buttonLogin}
              onClick={_handleSignClick}
            >
              Sign In
            </CustomButton>
          </Box>
          <Typography color='error'>
            {error.errorText}
          </Typography>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default LoginScreen;
