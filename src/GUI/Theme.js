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
    }

});

export function CustomHeader(props) {

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
                    <CustomButton>Login/Register</CustomButton>
                </Toolbar>
            </AppBar>
        </ThemeProvider>

    )
}

export function CustomButton(props) {

    return(
        <div>
            <ThemeProvider theme={theme} >
                <Button variant={"contained"} color={"primary"}>
                    {props.children}
                </Button>
            </ThemeProvider>
        </div>
    )
}

export default theme;