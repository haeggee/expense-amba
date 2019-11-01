import React from 'react';
import './App.css';
import { CustomButton, CustomHeader } from "./GUI/Theme";
import PaymentDialog from "./GUI/PaymentDialog";
import GroupList from './GroupList';
import { Box, Typography, AppBar, Tabs, Tab, Paper, Grid, Divider, ListItem, Container, Card, Button, Menu, MenuItem, makeStyles }
    from '@material-ui/core';
import Balances from './Balances';
import BillList from './BillList';
import User from './User'
import Group from './Group'


const useStyles = makeStyles(theme => ({
    gridcontainer: {
        flexGrow: 1,
        padding: theme.spacing(2),
        minHeight: 750,
        background: '#FFFFFF'
    },

    // the style for the left grouplist paper
    paperGroupList: {
        color: theme.palette.text.secondary,
        background: '#FFFFFF'
    },
    // the style for the expense diagram paper
    paperGroupOverview: {
        // color: theme.palette.text.secondary,
        background: '#FFFFFF'
    },
    AppBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        flex: 1,
    },
    subtitle: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(3),
        flex: 1
    }
}));

const groupMembersString = function (group) {
    let text = group.groupMembers[0].name;
    for (let i = 1; i < group.groupMembers.length; i++) {
        text += ", " + group.groupMembers[i].name;
    }
    return text;
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`, 'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}


export function Overview(props) {
    /* MOCK DATA ----------------------------*/
	
	/*
    // list of current members of the systems, here we should get the data from the server later

    const members = [{ name: "Alice" }, { name: "Bob" }, { name: "James" }, { name: "Maria" }, { name: "Thomas" },
    { name: "Jennifer" }]

    const billsGroup1 = [{ title: 'Uber', amount: 15, date: new Date('2019-10-01'), from: members[0], to: members }]


    // groups as a state variable for the list, will later be fetched from server
    // TODO: figure out how to represent expenses and who owes whom
    const [groups, setGroups] = React.useState(
        [{
            name: 'Family',
            index: 0,
            groupMembers: members
        },
        {
            name: 'TO',
            index: 1,
            groupMembers: [members[2], members[3], members[4], members[5]]
        },
        {
            name: 'Team 42',
            index: 2,
            groupMembers: [members[0], members[1]]
        }
        ]);

	*/
	
	// A possible way of implementing it?
	const members = [new User("Alice", "password", "Alice", "Alice.gmail.com"), new User("Bob", "password", "Bob", "Bob.gmail.com"), new User("James", "password", "James", "James.gmail.com"),
	new User("Maria", "password", "Maria", "Maria.gmail.com"), new User("Thomas", "password", "Thomas", "Thomas.gmail.com"), new User("Jennifer", "password", "Jennifer", "Jennifer.gmail.com")]
	
	const groups = [new Group(0, "Family", members), new Group(1, "TO", [members[2], members[3], members[4], members[5]]), new Group(2, "Team 42", [members[0], members[1]])]

    /* END OF MOCK DATA ----------------------*/

    // openPayments indicates whether or not to open the payments dialog popup

    const [openPayments, setopenPayments] = React.useState(false);

    /* 
	Handles whenever payment button is clicked to open dialog to make payment.
	*/
    const openPaymentsDialog = () => {
        setopenPayments(true)
    };

	/* 
	Handles closing dialog when Dialog requests it.
	*/
    const closePaymentsDialog = () => {
        setopenPayments(false)
    };

    /*
index of the current group
*/
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    /* Handles whenever another group is clicked */

    const handeListItemClick = (event, index) => {
        setSelectedIndex(index);
    };



    // which tab we are on
    const [tabIndex, setTabIndex] = React.useState(0);

    // what to do when user clicks on new tab
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    // the styles for the components    
    const classes = useStyles();

    return (
        <div>
            <CustomHeader />
            <Container maxWidth="lg">
                <Card className={classes.gridcontainer}>
                    <Grid container spacing={2}>


                        {/*left Grid that shows the grouplist*/}
                        <Grid item xs={4}>
                            <Paper className={classes.paperGroupList}>
                                <AppBar className={classes.AppBar}>
                                    <Typography variant="h6" className={classes.title}>
                                        <strong>Your groups</strong>
                                </Typography>
                                </AppBar>
                                <GroupList
                                    groups={groups}
                                    groupID={selectedIndex}
                                    handeListItemClick={handeListItemClick}
                                />
                                <Divider />
                                <ListItem>
                                    <CustomButton>Create new group</CustomButton>
                                </ListItem>
                            </Paper>
                        </Grid>


                        {/* right Grid that shows the overview and diagram */}


                        <Grid item xs={8}>
                            <Paper className={classes.paperGroupOverview}>
                                <AppBar className={classes.AppBar}>
                                    <Typography variant="h6" className={classes.title}>
                                        <strong>{groups[selectedIndex].name}</strong>
                                    </Typography>
                                    <Typography variant="subtitle1" className={classes.subtitle}>
                                            <em>Members:</em> {groupMembersString(groups[selectedIndex])}
                                    </Typography>

                                </AppBar>
                                <Box display="flex" flexDirection="row-reverse">
                                    <Tabs value={tabIndex} onChange={handleTabChange}>
                                        <Tab label="Balances" {...a11yProps(0)} />
                                        <Tab label="Bills" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>

                                <Balances
                                    group={groups[selectedIndex]}
                                    value={tabIndex}
                                    index={0}
                                />

                                <BillList
                                    group={groups[selectedIndex]}
                                    value={tabIndex}
                                    index={1}
                                />

                                <CustomButton clickHandler={openPaymentsDialog}>Add another payment</CustomButton>
                                {/* Pass in handler that closes Dialog when the Dialog requests it. */}
                                <PaymentDialog
                                    open={openPayments}
                                    closeHandler={closePaymentsDialog}
                                    group={groups[selectedIndex]} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </div>
    );


}
export default Overview;
