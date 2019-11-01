import React, { useState, useEffect } from 'react'
import './App.css'
import HomeWhiteMat from "./GUI/HomeWhiteMat"
import LogoComponent from "./GUI/LogoComponent"
import HomeDisplayText from "./GUI/HomeDisplayText"
import theme, { CustomHeader, CustomButton } from "./GUI/Theme"
import Grid from "@material-ui/core/Grid"
import { CardContent, CardHeader, Fade, Grow, Paper, Slide, Typography } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"

const useStyle = makeStyles(theme => ({
    homePic: {
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
    },
    logo: {
        position: 'absolute',
        left: '20%',
        top: '20%',
        width: '20%'
    },
    card: {
        width: '30vw',
        height: '30vh'
    },
    container: {
        width: '100vw',
        direction: 'row',
        marginBottom: '5vh'
    },
    grow: {
        transformOrigin: '0 0 0'
    }
}))


function Home() {
    const classes = useStyle(theme)
    const firstRowOffset = 20
    const secondRowOffset = 60

    return (
        <ThemeProvider theme={theme}>
            <header>
                <CustomHeader loggedIn={false} />
            </header>
            <div className={classes.homePic}>

                <img width={'100%'} alt={"Home illustration"} src={require("./GUI/imgs/home-illustration.jpg")} />
                <HomeWhiteMat />
                <div className={classes.logo}>
                    <Slide direction={"right"} mountOnEnter in={true} timeout={700}>
                        {LogoComponent()}
                    </Slide>
                </div>
                <Fade in={true} timeout={2000}>
                    {HomeDisplayText()}
                </Fade>
            </div>

            <GridContainer>
                <GrowGrid item displayOffset={firstRowOffset} timeout={1000}>
                    <StyledCard className={classes.paper}>
                        <Typography variant={"h5"}>
                            Never forget a bill
                        </Typography>
                        <Typography variant={"p"}>
                            AMBA helps you to keep track of everything with everybody.
                        </Typography>
                    </StyledCard>
                </GrowGrid>
                <GrowGrid item displayOffset={firstRowOffset} timeout={2000}>
                    <StyledCard className={classes.paper}>
                        box 1
                    </StyledCard>
                </GrowGrid>
            </GridContainer>
            <GridContainer>
                <GrowGrid item displayOffset={secondRowOffset} timeout={1000}>
                    <StyledCard className={classes.paper}>
                        box 1
                    </StyledCard>
                </GrowGrid>
                <GrowGrid item displayOffset={secondRowOffset} timeout={2000}>
                    <StyledCard className={classes.paper}>
                        box 1
                    </StyledCard>
                </GrowGrid>
            </GridContainer>
        </ThemeProvider>
    )
}

function GridContainer(props) {
    const classes = useStyle(theme)
    return (
        <Grid container
            alignContent={"flex-start"}
            direction={'row'}
            justify={"center"}
            spacing={10}
            className={classes.container}>
            {props.children}
        </Grid>
    )
}

function GrowGrid(props) {
    const classes = useStyle(theme)
    const { displayOffset, timeout } = props

    const [show, setShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', event => {
            const y = window.pageYOffset
            const vh = window.innerHeight / 100
            if (y >= displayOffset * vh) {
                setShow(true)
            }
        })
    })

    return (
        <Grow in={show} className={classes.grow} timeout={timeout}>
            <Grid item>
                {props.children}
            </Grid>
        </Grow>
    )
}

function StyledCard(props) {
    const classes = useStyle(theme)
    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.card}>
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}



export default Home
