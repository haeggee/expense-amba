import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import LogoComponent from "./LogoComponent";
import React, { useState } from "react"
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom"

/*
    This is defines major colors/fonts we are using in this project.
 */
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#344B72',
            light: '#E7EEF7',
            contrastText: '#FFFFFF'
        },
        common: {
            red: '#FF7C9B',
            grey: '#B5B5B5',
            white: '#FFFFFF',
            blue: '#156EC0'
        },
        background: {
            paper: '#FFFFFF'
        },
        text: {
            primary: '#000000',
            third: '#5d87cf'
        }
    },
    typography: {
        fontFamily: [
            "Open Sans",
            "Arial",
            "Mistral",
            "Verdana"
        ].join(','),
    },
    mixins: {
        toolbar: {
            minHeight: 40
        }
    }

});


/*
    This is the header element that will appear in all web pages.
    Sample usage: <CustomHeader loggedIn={false} /> when user haven't logged in.
                    loggedIn is default to be true.

 */
export function CustomHeader(props) {
    let buttonText;
    let flag;

    if (props.loggedIn === false) {
        buttonText = 'Register/Login';
        flag = false
    }
    else {
        buttonText = 'My Account';
        flag = true
    }

    let [loggedIn, setLoggedIn] = useState(flag)

    return (
        <AppBar position={'static'} flexGrow={1}>
            <Toolbar>
                <SvgIcon>
                    {LogoComponent()}
                </SvgIcon>
                <Box fontFamily={'mistral'} fontSize={'h4.fontSize'} marginLeft={'10px'} flexGrow={1}>
                    AM.BA
                    </Box>
                <Link to={loggedIn ? '/overview' : '/'} style={{ position: 'absolute' }}>
                    <Box
                        width={120}
                        height={40}
                    />
                </Link>
                <CustomButton> {buttonText} </CustomButton>
            </Toolbar>
        </AppBar>

    )
}

/*
Same as above but without any buttons.
*/
export function EmptyHeader() {

    return(
        <AppBar position={'static'} flexGrow={1}>
            <Toolbar>
                <SvgIcon>
                    {LogoComponent()}
                </SvgIcon>
                <Box fontFamily={'mistral'} fontSize={'h4.fontSize'} marginLeft={'10px'} flexGrow={1}>
                    AM.BA
                </Box>
                
                
            </Toolbar>
        </AppBar>
    )
}

/*
This is the default button to use for the project.
Sample usage: <CustomButton> Text on the Button </CustomButton>
Classname can also be added to provide margins, padding, etc.
To do so do <CustomButton className={the-class-name}>
Click handlers can also be assigned via setting clickHandler={}
 */
export function CustomButton(props) {
    const className = props.className
    const clickHandler = props.clickHandler

    return (

        <Button {...props} variant={"contained"} color={"primary"} className={className} onClick={clickHandler} style={{ textTransform: 'none' }}>
            {props.children}
        </Button>

    )
}

export default theme;
