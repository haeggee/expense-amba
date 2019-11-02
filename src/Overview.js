import React from 'react';
import './App.css';
import { CustomButton} from "./GUI/Theme";
import PaymentDialog from "./GUI/PaymentDialog";
import CreateGroupDialog from "./GUI/CreateGroupDialog"
import GroupList from './GroupList';
import { Box, Typography, AppBar, Tabs, Tab, Paper, Grid, Divider, ListItem, Container, Card, Button, Menu, MenuItem, makeStyles }
    from '@material-ui/core';
import Balances from './Balances';
import BillList from './BillList';
import Bill from './Bills';
import User from './User';
import Group from './Group';
import {CustomHeader} from "./GUI/Header"


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
  },
  addButton: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

/**  
 * Returns a string of all the members of a group.
 * @param {group} the group object
 * @param {currentUser} The user that is using this app that is a part of this group. We assume a group has at least one member.
*/
const groupMembersString = function (group, currentUser) {
  let text = "You"
  
  for (let i = 0; i < group.groupMembers.length; i++) {
    // all usernames are unique, so we can use them to compare users
    if (currentUser.username != group.groupMembers[i].username) {
      // only add to string if this is not the current user
      text += ", " + group.groupMembers[i].name;
    }
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
  const members = [new User("Alice`s username", "password", "Alice", "Alice.gmail.com"), new User("Bob`s username", "password", "Bob", "Bob.gmail.com"), new User("Jame`s username", "password", "James", "James.gmail.com"),
  new User("Maria`s username", "password", "Maria", "Maria.gmail.com"), new User("Thoma`s username", "password", "Thomas", "Thomas.gmail.com"), new User("Jennifer`s username", "password", "Jennifer", "Jennifer.gmail.com")]
  const billsGroup1 =
      [new Bill(0, "Uber", 20.0, new Date('2019-10-01'), members[0], members),
      new Bill(1, "Dinner", 35.0, new Date('2019-10-12'), members[1], [members[0], members[1], members[2]]),
      new Bill(2, "Movie tickets", 15.0, new Date('2019-10-25'), members[4], [members[4], members[0], members[5]])]
  let groups = [new Group(0, "Family", members, billsGroup1), new Group(1, "TO", [members[0], members[2], members[3], members[4], members[5]]), new Group(2, "Team 42", [members[0], members[1]])]

  // Let this be the current user.
  const user = members[0]

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

  // indicates whether or not to open the create group dialog popup
  const [openGroup, setOpenGroup] = React.useState(false);

  /* 
	Handles whenever create group button is clicked to open dialog to make payment.
	*/
  const openGroupDialog = () => {
    setOpenGroup(true)
  };

	/* 
	Handles closing dialog when Dialog requests it.
	*/
  const closeGroupDialog = () => {
    setOpenGroup(false)
  };

  // function that should be notified when user creates a new group in the create group dialog
  function onGroupCreated(group) {
    groups.push(group);
    setGroups(groups);
    setSelectedIndex(groups.length - 1);
  }

  const [currentGroups, setGroups] = React.useState(groups);

  /*
  index of the current group
  */
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  /* Handles whenever another group is clicked */

  const handleListItemClick = (event, index) => {
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
                  groups={currentGroups}
                  groupID={selectedIndex}
                  handleListItemClick={handleListItemClick}
                />
                <Divider />
                <ListItem className={classes.addButton}>
                  <CustomButton clickHandler={openGroupDialog}>Create new group</CustomButton>
                </ListItem>
              </Paper>
            </Grid>

            {/* right Grid that shows the overview and diagram */}

            <Grid item xs={8}>
              <Paper className={classes.paperGroupOverview}>
                <AppBar className={classes.AppBar}>
                  <Typography variant="h6" className={classes.title}>
                    <strong>{currentGroups[selectedIndex].name}</strong>
                  </Typography>
                  <Typography variant="subtitle1" className={classes.subtitle}>
                    <em>Members:</em> {groupMembersString(currentGroups[selectedIndex], user)}
                  </Typography>
                </AppBar>

                <Box display="flex" flexDirection="row-reverse">
                  <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Balances" {...a11yProps(0)} />
                    <Tab label="Bills" {...a11yProps(1)} />
                  </Tabs>
                </Box>

                <Balances
                  group={currentGroups[selectedIndex]}
                  value={tabIndex}
                  index={0}
                />

                <BillList
                  group={currentGroups[selectedIndex]}
                  value={tabIndex}
                  index={1}
                />

                <Container className={classes.addButton}>
                  <CustomButton clickHandler={openPaymentsDialog}>Add another payment</CustomButton>
                </Container>

                {/* Pass in handler that closes Dialog when the Dialog requests it. */}
                <PaymentDialog
                  open={openPayments}
                  closeHandler={closePaymentsDialog}
                  group={currentGroups[selectedIndex]}
                  currentUser={user} />
                <CreateGroupDialog
                  open={openGroup}
                  closeHandler={closeGroupDialog}
                  users={members}
                  currentUser={user}
                  groupCreatedListener={onGroupCreated}
                />
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
export default Overview;
