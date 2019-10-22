import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import LogoComponent from "./LogoComponent";
import React from "react";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";

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
        }
    },
    typography: {
        fontFamily: [
            "Arial",
            "Open Sans",
            "Mistral",
            "Verdana"
        ].join(','),
    },
    mixins: {
        toolbar:{
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
    if (props.loggedIn === false) {
        buttonText = 'Register/Login'
    }
    else {
        buttonText = 'My Account'
    }

    console.log(props.loggedIn);
    console.log(buttonText);
    return(
        <ThemeProvider theme={theme}>
            <AppBar position={'static'} style={{flexGrow: 1}}>
                <Toolbar>
                    <SvgIcon>
                        {LogoComponent()}
                    </SvgIcon>
                    <Typography style={{flexGrow: 1}}>
                        <Box fontFamily={'mistral'} fontSize={'h4.fontSize'} marginLeft={'10px'}>
                            AM.BA
                        </Box>
                    </Typography>
                    <CustomButton> {buttonText} </CustomButton>
                </Toolbar>
            </AppBar>
        </ThemeProvider>

    )
}

/*
Same as above but without any buttons.
*/
export function EmptyHeader() {

    return(
        <ThemeProvider theme={theme}>
            <AppBar position={'static'} style={{flexGrow: 1}}>
                <Toolbar>
                    <SvgIcon>
                        {LogoComponent()}
                    </SvgIcon>
                    <Typography style={{flexGrow: 1}}>
                        <Box fontFamily={'mistral'} fontSize={'h4.fontSize'} marginLeft={'10px'}>
                            AM.BA
                        </Box>
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

/*
This is the default button to use for the project.
Sample usage: <CustomButton> Text on the Button </CustomButton>
Classname can also be added to provide margins, padding, etc.
To do so do <CustomButton className={the-class-name}>
 */
export function CustomButton(props) {
	const className = props.className
	console.log(className)
    return(
        
		<ThemeProvider theme={theme} >
			<Button variant={"contained"} color={"primary"} className={className} style={{textTransform: 'none'}}>
				{props.children}
			</Button>
		</ThemeProvider>
        
    )
}

export default theme;