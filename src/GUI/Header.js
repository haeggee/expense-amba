/*
    This is the header element that will appear in all web pages.
    Sample usage: <CustomHeader loggedIn={false} /> when user haven't logged in.
                    loggedIn is default to be true.

 */
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import SvgIcon from "@material-ui/core/SvgIcon"
import LogoComponent from "./LogoComponent"
import Box from "@material-ui/core/Box"
import React from "react"
import {Link} from "react-router-dom"
import {UserContext} from "../UserContext"
import makeStyles from "@material-ui/core/styles/makeStyles"
import {CustomButton} from "./Theme"
import {useHistory} from "react-router-dom"

const useStyle = makeStyles(()=>({
    absolute: {
        position: 'absolute'
    }
}))

export function CustomHeader(props) {
    const classes = useStyle()
    let history = useHistory()

    return (
        <AppBar position={'static'} flexGrow={1}>
            <Toolbar>
                <SvgIcon>
                    {LogoComponent()}
                </SvgIcon>
                <Box fontFamily={'mistral'} fontSize={'h4.fontSize'} marginLeft={'10px'} flexGrow={1}>
                    AM.BA
                </Box>
                <UserContext.Consumer>
                    {value => {
                        const link = (
                            <Link to={value.userName ? '/overview' : '/'} className={classes.absolute}>
                                <Box
                                    width={120}
                                    height={40}
                                />
                            </Link>
                        )
                        let buttons = (
                            <CustomButton onClick={()=>{history.push('/overview')}}>
                                Register/Login
                            </CustomButton>
                            )
                    }}
                </UserContext.Consumer>
            </Toolbar>
        </AppBar>
    )
}



/*
Same as above but without any buttons.
*/
export function EmptyHeader() {

    return (
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