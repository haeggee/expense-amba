import React from "react"
import {Typography} from "@material-ui/core"
import {ThemeProvider} from "@material-ui/core/styles"
import theme, {CustomButton} from "./GUI/Theme"
import {CustomHeader} from "./GUI/Header"

export default function LoginPage(props) {
    return (
        <ThemeProvider theme={theme}>
            <CustomHeader/>
            <Typography>
                To be developed.
            </Typography>
        </ThemeProvider>

    )
}