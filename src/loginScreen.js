import React from "react";
import "./App.css";
import { Box, makeStyles, Divider, Container } from "@material-ui/core";
import { EmptyHeader } from "./GUI/Header";
import { CustomButton } from "./GUI/Theme";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

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

export function LoginScreen(props) {
  const classes = useStyles();
  let history = useHistory();

  const [values, setValues] = React.useState({
    loginUsername: "",
    loginPassword: "",
    signUpUsername: "",
    signUpEmail: "",
    signUpPassword: ""
  });

  //Relevant functions for the page
  const _onLoginUsernameClick = e => {
    let a = values.loginUsername;
    let b = values.loginPassword;
    let c = values.signUpUsername;
    let d = values.signUpEmail;
    let f = values.signUpPassword;
    setValues({
      loginUsername: e.target.value,
      loginPassword: b,
      signUpUsername: c,
      signUpEmail: d,
      signUpPassword: f
    });
  };

  const _onLoginPasswordClick = e => {
    let a = values.loginUsername;
    let b = values.loginPassword;
    let c = values.signUpUsername;
    let d = values.signUpEmail;
    let f = values.signUpPassword;
    setValues({
      loginUsername: a,
      loginPassword: e.target.value,
      signUpUsername: c,
      signUpEmail: d,
      signUpPassword: f
    });
  };

  const _onSignUpUsernameClick = e => {
    let a = values.loginUsername;
    let b = values.loginPassword;
    let c = values.signUpUsername;
    let d = values.signUpEmail;
    let f = values.signUpPassword;
    setValues({
      loginUsername: a,
      loginPassword: b,
      signUpUsername: e.target.value,
      signUpEmail: d,
      signUpPassword: f
    });
  };

  const _onSignUpPasswordClick = e => {
    let a = values.loginUsername;
    let b = values.loginPassword;
    let c = values.signUpUsername;
    let d = values.signUpEmail;
    let f = values.signUpPassword;
    setValues({
      loginUsername: a,
      loginPassword: b,
      signUpUsername: c,
      signUpEmail: d,
      signUpPassword: e.target.value
    });
  };

  const _onSignUpEmailClick = e => {
    let a = values.loginUsername;
    let b = values.loginPassword;
    let c = values.signUpUsername;
    let d = values.signUpEmail;
    let f = values.signUpPassword;
    setValues({
      loginUsername: a,
      loginPassword: b,
      signUpUsername: c,
      signUpEmail: e.target.value,
      signUpPassword: f
    });
  };

  const _handleSignClick = () => {
    // Get the listof usernames/admins and passwords from server to check
    // Requires server call

    if (values.loginUsername === "user" && values.loginPassword === "user") {
      history.push("/overview");
    } else if (
      values.loginUsername === "admin" &&
      values.loginPassword === "admin"
    ) {
      history.push("/admin");
    }

    //else {
    //Handle functionalities of invalid username, wrong password
    //}
  };

  const _handleRegisterClick = () => {
    // Functionality to be added: Once clicked, it appends info to user database from server
    //Requires server call
  };

  //returned DOM
  return (
    <div>
      <EmptyHeader />
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
          <h4> Username/Email </h4>
          <TextField
            id="outlined-helperText"
            label="User Name/Email"
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
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginScreen;
