import React, {useContext} from "react"
import "./App.css";
import { CustomButton } from "./GUI/Theme";
import PaymentDialog from "./GUI/PaymentDialog";
import CreateGroupDialog from "./GUI/CreateGroupDialog"
import GroupList from './GroupList';
import { Fab, Box, Typography, AppBar, Tabs, Tab, Paper, Grid, Divider, ListItem, Container, Card, Button, makeStyles }
  from '@material-ui/core';
import Balances from './Balances';
import BillList from './BillList';
import Bill from './Bills';
import { CustomHeader } from "./GUI/Header"
import AddIcon from '@material-ui/icons/Add'
import CreateAddMemberDialog from './GUI/AddMemberDialog';
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteGroupDialog from './GUI/DeleteGroupDialog'
import ServerInterface from './ServerInterface'
import {UserContext} from "./UserContext"

const useStyles = makeStyles(theme => ({
  gridcontainer: {
    flexGrow: 1,
    padding: theme.spacing(2),
    minHeight: 750,
    background: "#FFFFFF"
  },

  // the style for the left grouplist paper
  paperGroupList: {
    color: theme.palette.text.secondary,
    background: "#FFFFFF"
  },
  // the style for the expense diagram paper
  paperGroupOverview: {
    // color: theme.palette.text.secondary,
    background: "#FFFFFF"
  },
  AppBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flex: 1
  },
  subtitle: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    flex: 1
  },
  addButton: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  deleteButton: {
    margin: theme.spacing(1),
    color: theme.palette.secondary.main
  }
}));


/**
 * Returns a string of all the members of a group.
 * @param {group} the group object
 * @param {currentUser} The user that is using this app that is a part of this group. We assume a group has at least one member.
 */
const groupMembersString = function (group, currentUser) {
  let text = "You";

  for (let i = 0; i < group.groupMembers.length; i++) {
    // all usernames are unique, so we can use them to compare users
    if (currentUser.username !== group.groupMembers[i].user.username) {
      // only add to string if this is not the current user
      text += ", " + group.groupMembers[i].user.name;
    }
  }
  return text;
};

/**
 * Generates a unique id for a bill.
 * @param {group} The group that the current user is in.
 */
const generateBillID = function (group) {
  let id = 0;
  for (let i = 0; i < group.bills.length; i++) {
    if (group.bills[i].billID <= id) {
      id = group.bills[i].billID + 1;
    }
  }
  return id;
}


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

/**
 * Everything in the Overview goes in here.
 */
export function Overview(props) {

  // Let this be the current user.
  const value = useContext(UserContext)
  const user = value.user // current user
  const members = ServerInterface.getAllUsers()

  // openDeleteGroup indicates whether or not to open the delete group dialog

  const [openDeleteGroup, setOpenDeleteGroup] = React.useState(false);

  /* 
	Handles whenever delete group button is clicked to open dialog
	*/
  const openDeleteGroupDialog = () => {
    setOpenDeleteGroup(true)
  };

	/* 
	Handles closing dialog when Dialog requests it.
	*/
  const closeDeleteGroupDialog = () => {
    setOpenDeleteGroup(false)
  };

  const deleteCurrentGroup = () => {
    // console.log(groups)
    currentGroups.splice(selectedIndex, 1);
    // since the groupid identifies the highlight in in the list, update ids
    for (let i = 0; i < currentGroups.length; i++) {
      currentGroups[i].groupID = i;
    }
    setSelectedIndex(0);
    console.log(currentGroups)
    closeDeleteGroupDialog();
  }
  // openPayments indicates whether or not to open the payments dialog popup

  const [openPayments, setopenPayments] = React.useState(false);

  /* 
	Handles whenever payment button is clicked to open dialog to make payment.
	*/
  const openPaymentsDialog = () => {
    setopenPayments(true);
  };

  /* 
	Handles closing dialog when Dialog requests it.
	*/
  const closePaymentsDialog = () => {
    setopenPayments(false);
  };

  // indicates whether or not to open the create group dialog popup
  const [openGroup, setOpenGroup] = React.useState(false);

  /* 
	Handles whenever create group button is clicked to open dialog to make payment.
	*/
  const openGroupDialog = () => {
    setOpenGroup(true);
  };

  /* 
	Handles closing dialog when Dialog requests it.
	*/
  const closeGroupDialog = () => {
    setOpenGroup(false);
  };

  // indicates whether or not to open the create group dialog popup
  const [openAddMembers, setOpenAddMembers] = React.useState(false);

  /* 
	Handles whenever create group button is clicked to open dialog to make payment.
	*/
  const openAddMembersDialog = () => {
    setOpenAddMembers(true)
  };

	/* 
	Handles closing dialog when Dialog requests it.
	*/
  const closeAddMembersDialog = () => {
    setOpenAddMembers(false)
  };


  // function that should be notified when user creates a new group in the create group dialog
  function onGroupCreated(group) {
    const newGroups = currentGroups;
    setGroups(newGroups);

    setSelectedIndex(newGroups.length - 1);
	console.log(group)
  }

  /**
   * Function that should be notified when user wants a new bill to be created with this information.
   * @param {group} The group this bill should be created in.
   * @param {title} The title of the bill.
   * @param {amount} The total amount of the bill.
   * @param {members} The people involved in this bill. 
   * @param {date} The date this bill is created on. 
   */
  function createBillHandler(group, title, amount, members, date) {

    // amount each member has to pay to current user (the + converts this to a integer)
    const owed = +(amount / (members.length)).toFixed(2)

    for (let i = 0; i < group.groupMembers.length; i++) {

	  // this debtor is the user
	  if (group.groupMembers[i].user.username === user.username) {
		// user participated
		if (members.includes(user)) {
			// subtract owed because he doesnt have to owe money to himself
			group.groupMembers[i].debt -= (+amount - owed);
		} else {
			// user is not paying for himself
			group.groupMembers[i].debt -= (+amount);
		}
	  } else {
		if (members.includes(group.groupMembers[i])) {
		  group.groupMembers[i].debt += owed;
		}
	  }
    }

    // now create the bill
    const bill = new Bill(generateBillID(group), title, amount, date, user, members);

    // add bill to group
    group.bills.push(bill);
    // console.log(currentGroups)
  }

  /**
   * Handler that pays people.
   * Creates Bill doing so.
   */
  function payPersonHandler(group, title, amount, members, date) {
    createBillHandler(group, title, amount, members, date);
  }

  const [currentGroups, setGroups] = React.useState(user.groups);

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
                  <CustomButton onClick={openGroupDialog}>
                    Create new group
                  </CustomButton>
                </ListItem>
              </Paper>
            </Grid>

            {/* right Grid that shows the overview and diagram */}

            <Grid item xs={8}>
              <Paper className={classes.paperGroupOverview}>
                <AppBar className={classes.AppBar}>
                  <Grid container>
                    <Grid item xs={10}
                    ><Typography variant="h6" className={classes.title}>
                        <strong>{currentGroups[selectedIndex].name}</strong>
                      </Typography>
                      <Typography variant="subtitle1" className={classes.subtitle}>
                        <em>Members:</em> {groupMembersString(currentGroups[selectedIndex], user)}
                        <Box component="span" m={1}>
                          <Fab display="flex" flexDirection="row-reverse" size="small" color="third"
                            aria-label="add" onClick={openAddMembersDialog}>
                            <AddIcon />
                          </Fab>
                        </Box>
                      </Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Button className={classes.deleteButton} startIcon={<DeleteIcon />} onClick={openDeleteGroupDialog}> Delete </Button>
                    </Grid>
                  </Grid>
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
                  <CustomButton onClick={openPaymentsDialog}>
                    Add another payment
                  </CustomButton>
                </Container>

                {/* Pass in handler that closes Dialog when the Dialog requests it. */}
                <PaymentDialog
                  open={openPayments}
                  closeHandler={closePaymentsDialog}
                  group={currentGroups[selectedIndex]}
                  currentUser={user}
                  createBillHandler={createBillHandler}
                  payPersonHandler={payPersonHandler}
                />
                <CreateGroupDialog
                  open={openGroup}
                  closeHandler={closeGroupDialog}
                  users={members}
                  currentUser={user}
                  groups={currentGroups}
                  groupCreatedListener={onGroupCreated}
                />
                <CreateAddMemberDialog
                  open={openAddMembers}
                  closeHandler={closeAddMembersDialog}
                  users={members}
                  group={currentGroups[selectedIndex]}
                />
                <DeleteGroupDialog
                  open={openDeleteGroup}
                  closeHandler={closeDeleteGroupDialog}
                  deleteGroup={deleteCurrentGroup}
                  group={currentGroups[selectedIndex]} />
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
export default Overview;
