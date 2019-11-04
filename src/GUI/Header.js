import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CustomButton } from "./Theme";
import { useHistory } from "react-router-dom";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Sedgwick Ave"]
  }
});

const useStyle = makeStyles(() => ({
  absolute: {
    position: "absolute"
  },
  headerLogo: {
    marginBottom: '5px'
  }
}));

/**
 * This is the Header component that relies on global state
 *
 * @change now no attribute is needed. just do <CustomHeader/>
 */
export function CustomHeader(props) {
  const classes = useStyle();
  let history = useHistory();

  return (
    <AppBar position={"static"}>
      <Toolbar>
        <img className={classes.headerLogo} height={30} alt={'logo'} src={require('./imgs/logo.svg')} />
        <Box
          fontFamily={"mistral"}
          fontSize={"h4.fontSize"}
          marginLeft={"10px"}
          flexGrow={1}
        >
          AM.BA
        </Box>
        <UserContext.Consumer>
          {value => {
            return (
              <Link
                to={value.userName ? "/overview" : "/"}
                className={classes.absolute}
              >
                <Box width={120} height={40} />
              </Link>
            );
          }}
        </UserContext.Consumer>
        <UserContext.Consumer>
          {value => {
            if (value.userName) {
              const buttonAccount = (
                <CustomButton
                  onClick={() => {
                    history.push("/accountsview");
                  }}
                >
                  Account
                  </CustomButton>
              )
              const buttonLogout = (
                <CustomButton
                  onClick={() => {
                    value.userLogin(undefined);
                    history.push("/");
                  }}
                >
                  Logout
                  </CustomButton>
              )
              if (history.location.pathname === '/accountsview' || history.location.pathname === '/admin') {
                return (
                  <div>
                    {buttonLogout}
                  </div>
                )
              }
              else {
                return (
                  <div>
                    {buttonAccount}
                    {buttonLogout}
                  </div>
                )
              }
            } else {
              if (history.location.pathname === '/login') {
                return <div />
              }
              else {
                return (
                  <CustomButton
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Register/Login
                    </CustomButton>
                );
              }
            }
          }}
        </UserContext.Consumer>
      </Toolbar>
    </AppBar>
  );
}