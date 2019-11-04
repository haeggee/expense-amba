import React, { useState, useEffect } from 'react'
import './App.css'
import HomeWhiteMat from "./GUI/HomeWhiteMat"
import theme from "./GUI/Theme"
import Grid from "@material-ui/core/Grid"
import { Box, CardContent, Fade, Grow, Slide, Typography } from "@material-ui/core"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card"
import { CustomHeader } from "./GUI/Header"
import Footer from "./GUI/Footer"

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
        height: '30vh',
        alignContent: 'center'
    },
    container: {
        width: '100vw',
        direction: 'row',
        marginBottom: '5vh',
    },
    grow: {
        transformOrigin: '0 0 0'
    },
    displayText: {
        position: 'absolute',
        right: '13%',
        top: '25%'
    },
    gridclass: {
        alignContent: 'center'
    }
}))


function Home(props) {
    const classes = useStyle(theme)
    const firstRowOffset = 20
    const secondRowOffset = 60

    return (
        <ThemeProvider theme={theme}>
            <header>
                <CustomHeader />
            </header>
            <div className={classes.homePic}>

                <img width={'100%'} alt={"Home illustration"} src={require("./GUI/imgs/home-illustration.jpg")} />
                <HomeWhiteMat />
                <div className={classes.logo}>
                    <Slide direction={"right"} mountOnEnter in={true} timeout={700}>
                        <img src={require("./GUI/imgs/logo.svg")} alt={"Logo"} />
                    </Slide>
                </div>
                <Fade in={true} timeout={2000}>
                    <Box fontFamily={'Verdana'}
                        fontSize={"h2.fontSize"}
                        color={theme.palette.common.white}
                        className={classes.displayText}>
                        The breeze <br />
                        of your social life.
                    </Box>
                </Fade>
            </div>

            <GridContainer >
                <GrowGrid item displayOffset={firstRowOffset} timeout={1000}>
                    <StyledCard className={classes.paper}>
                        <Typography className={classes.headline} variant={"h5"}>
                            - Never forget a bill -
                        </Typography>
                        <Typography variant={"body1"}>
                            AMBA helps you to keep track of everything with everybody.
                        </Typography>
                    </StyledCard>
                </GrowGrid>
                <GrowGrid item displayOffset={firstRowOffset} timeout={2000}>
                    <StyledCard className={classes.paper}>
                        <Typography variant={"h5"}>
                            - Connect with your friends -
                        </Typography>
                        <Typography variant={"body1"}>
                            Create a group and add the people that you share bills with.
                        </Typography>
                    </StyledCard>
                </GrowGrid>
            </GridContainer>
            <GridContainer>
                <GrowGrid item displayOffset={secondRowOffset} timeout={1000}>
                    <StyledCard className={classes.paper}>
                        <Typography className={classes.headline} variant={"h5"}>
                            - Have an overview of your expenses -
                        </Typography>
                        <Typography variant={"body1"}>
                            Easily check the balance of everyone in each of your group.
                        </Typography>
                    </StyledCard>
                </GrowGrid>
                <GrowGrid item displayOffset={secondRowOffset} timeout={2000}>
                    <StyledCard className={classes.paper}>
                        <Typography className={classes.headline} variant={"h5"}>
                            - No bill is lost -
                        </Typography>
                        <Typography variant={"body1"}>
                            See all bills paid by you and your friends.
                        </Typography>
                    </StyledCard>
                </GrowGrid>
            </GridContainer>
            <Footer />
        </ThemeProvider>
    )
}

function GridContainer(props) {
    const classes = useStyle(theme)
    return (
        <Grid container
            alignContent={"flex-start"}
            alignItems="center"
            direction={"row"}
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
