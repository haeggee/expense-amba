import React, { useContext } from "react"
import "./App.css";
import { CustomButton } from "./GUI/Theme";
import PaymentDialog from "./GUI/PaymentDialog";
import CreateGroupDialog from "./GUI/CreateGroupDialog"
import GroupList from './GroupList';
import { Fab, Box, Typography, AppBar, Tabs, Tab, Paper, Grid, Divider, ListItem, Container, Card, Button, makeStyles }
  from '@material-ui/core';
import Balances from './Balances';
import BillList from './BillList';
import { CustomHeader } from "./GUI/Header"
import AddIcon from '@material-ui/icons/Add'
import CreateAddMemberDialog from './GUI/AddMemberDialog';
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteGroupDialog from './GUI/DeleteGroupDialog'
import ServerInterface from './ServerInterface'
import { getState, subscribe } from "statezero"
import { useHistory } from 'react-router-dom'

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
 * Returns list of user names of all the users in this group.
 * @param group The group.
 * @param allUsers List of all users.
 */
const getGroupMembersUsernames = function(group, allUsers) {
  let members = []
  if (allUsers === undefined) {return []}
  for (let i = 0; i < group.groupMembers.length; i++) {
    for (let j = 0; j < allUsers.length; j ++) {
      if (group.groupMembers[i].user === allUsers[j]._id) {
        members.push(allUsers[j])
      }
    }
  }
  return members
}

/**
 * Returns a string of all the members of a group.
 *
 * @param group the group object
 * @param currentUser The user that is using this app that is a part of this group. We assume a group has at least one member.
 * @param allUsers List of all users.
 */
const groupMembersString = function (group, currentUser, allUsers) {
  const groupMembers = getGroupMembersUsernames(group, allUsers)
  let text = "You";

  for (let i = 0; i < groupMembers.length; i++) {
    // all usernames are unique, so we can use them to compare users
    if (currentUser.username !== groupMembers[i].username) {
      // only add to string if this is not the current user
      text += ", " + groupMembers[i].name;
    }
  }
  return text;
};


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
  let user = getState('user')
  subscribe((newUser) => { user = newUser }, 'user')

  let history = useHistory();
  if (user && user.username === 'admin') {
    history.push('/admin')
  }

  // all the users in the database
  const [users, setUsers] = React.useState(undefined)

  // all the group members of the currently selected group.
  const [members, setMembers] = React.useState(undefined)

  // all the bills in the database (more efficient to only get bills for a certain group, but this is easier)
  const [bills, setBills] = React.useState(undefined)

  // it appears that this is continuously being called. Making server calls over and over again is not efficient.
  // only do it once. If you uncomment out the if statement below, there is a server call every second, which is not good.
  if (users === undefined) {
    ServerInterface.getAllUsers((result) => {
      setUsers(result)

      // update the people currently in this group
      if (currentGroups.length > 0) {
        // supply result instead of users because setUsers is asynchronous so it may not be set yet
        updateGroupMembers(currentGroups[0], result)
      } else {
        setMembers([])
      }
    })
  }

  // same as above
  if (bills === undefined) {
    setBills([])
    ServerInterface.getAllBills((result) => {
      console.log(result)
      setBills(result)
    })
  }

  /**
   * Updates the group members in this group.
   */
  const updateGroupMembers = (group, users) => {
    // obtain the group members for this new group
    let newMembers = []

    if (users === undefined) {
      setMembers([])
      return
    }

    for (let i = 0; i < group.groupMembers.length; i ++) {
      for (let j = 0; j < users.length; j ++) {
        if (group.groupMembers[i].user === users[j]._id) {
          newMembers.push(users[j])
        }
      }
    }
    setMembers(newMembers)
  }

  const [currentGroups, setGroups] = React.useState(getState('groups'));
  subscribe((groups) => {
    setGroups(groups)
  }, "groups")

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
    // must slice to make shallow copy because currentGroups is read only.
    const newGroups = currentGroups.slice();
    const deletedGroups = newGroups.splice(selectedIndex, 1);

    // since the groupid identifies the highlight in in the list, update ids
    //for (let i = 0; i < newGroups.length; i++) {
      //newGroups[i].groupID = i;
    //}
    ServerInterface.requestGroupDeletion(deletedGroups[0])
    setSelectedIndex(0);
    setGroups(newGroups);
    closeDeleteGroupDialog();
    if (newGroups.length <= 0) {return}
    updateGroupMembers(newGroups[selectedIndex], users)
  };
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
    updateGroupMembers(group, users)
    console.log(group)
  }

  /**
   * Function that should be notified when user wants a new bill to be created with this information.
   * @param {group} The group this bill should be created in.
   * @param {title} The title of the bill.
   * @param {amount} The total amount of the bill.
   * @param {users} The people involved in this bill.
   * @param {date} The date this bill is created on. 
   */
  function createBillHandler(group, title, amount, members, date) {
    ServerInterface.requestBillCreation(group, title, amount, date, user, members)
    ServerInterface.getAllBills((result) => {
      console.log(result)
      setBills(result)
    })
  }

  function deleteBillHandler(bill) {
    console.log("deleting bill")
    ServerInterface.requestBillDeletion(bill)
    let newBills = []
    for (let i = 0; i < bills.length; i ++) {
      if (bill._id !== bills[i]._id) {
        newBills.push(bills[i])
      }
    }
    setBills(newBills)
    // go through groups and delete bill
    let newGroups = []
    for (let i = 0; i < currentGroups.length; i ++) {
      if (bill.group === currentGroups[i]._id) {
        const newGroupBills = []
        // only keep the bills that we didnt delete
        for (let j = 0; j <  currentGroups[i].bills.length; j ++) {
          if (currentGroups[i].bills[j]._id !== bill._id) {
            newGroupBills.push(currentGroups[i].bills[j])
          }
        }
        newGroups.push({
          _id: bill.group,
          name:  currentGroups[i].name,
          bills: newGroupBills
        })
      } else {
        newGroups.push(currentGroups[i])
      }
    }
    setGroups(newGroups)
  }

  /**
   * Handler that pays people.
   * Creates Bill doing so.
   */
  function payPersonHandler(group, title, amount, members, date) {
    createBillHandler(group, title, amount, members, date);
  }

  /**
   * Handler that creates a new group.
   * @param groupID
   * @param name
   * @param groupUsers
   */
  function createGroupHandler(name, groupUsers) {
    let groupID = ServerInterface.getNextGroupID();
    ServerInterface.requestGroupCreation(name, groupUsers);
    // create group with bills array initially empty.
    // const group = new Group(groupID, name, groupUsers, [])
    // onGroupCreated()
  }

  /*
  index of the current group
  */
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  /* Handles whenever another group is clicked */

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (currentGroups.length <= 0) {
      setMembers([])
      return
    }
    updateGroupMembers(currentGroups[index], users)
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
              {currentGroups.length !== 0 ?
                <Paper className={classes.paperGroupOverview}>
                  <AppBar className={classes.AppBar}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="h6" className={classes.title}>
                          <strong>{currentGroups[selectedIndex].name}</strong>
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                          <em>Members:</em> {groupMembersString(currentGroups[selectedIndex], user, users)}
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
                    bills={bills}
                    value={tabIndex}
                    index={1}
                    members={members}
                    deleteBillHandler={deleteBillHandler}
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
                    groupMembers={members}
                  />
                  <CreateAddMemberDialog
                    open={openAddMembers}
                    closeHandler={closeAddMembersDialog}
                    users={users}
                    group={currentGroups[selectedIndex]}
                  />
                  <DeleteGroupDialog
                    open={openDeleteGroup}
                    closeHandler={closeDeleteGroupDialog}
                    deleteGroup={deleteCurrentGroup}
                    group={currentGroups[selectedIndex]} />
                </Paper> :
                <Paper className={classes.paperGroupOverview}>
                  <AppBar className={classes.AppBar}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="h6" className={classes.title}>
                          <strong>You are currently not in any groups.</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </AppBar>
                  <Balances
                    group={null}
                    value={0}
                    index={0}
                  />
                </Paper>}
            </Grid>
            <CreateGroupDialog
              open={openGroup}
              closeHandler={closeGroupDialog}
              users={users}
              currentUser={user}
              groups={currentGroups}
              groupCreatedListener={createGroupHandler}
            />

          </Grid>
        </Card>
      </Container>
    </div>
  );
}
export default Overview;
