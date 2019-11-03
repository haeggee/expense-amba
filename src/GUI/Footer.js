import React from "react"
import {Box, makeStyles, Paper, Typography} from "@material-ui/core"
import theme from "./Theme"

const useStyle = makeStyles(theme => ({
    footer: {
        background: theme.palette.primary.main,
        borderRadius: 0,
        height: '20vh',
        flexDirection: 'column-reverse',
        display: 'flex'
    },
    text: {
        alignSelf: 'flex-end',
        margin: '10px'
    }
}))

export default function Footer(props) {
    const classes = useStyle(theme)
    return(
        <Paper className={classes.footer}>
            <Typography variant={"body2"} color={"textSecondary"} className={classes.text}>
                © UofT CSC309 2019 fall term project team 42.
            </Typography>
        </Paper>
    )
}