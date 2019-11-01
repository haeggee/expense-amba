import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from './GUI/HeaderComponent';
import ButtonComponent from "./GUI/ButtonComponent";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import {CustomButton, CustomHeader} from "./GUI/Theme";
import PaymentDialog from "./GUI/PaymentDialog";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GroupList from './GroupList';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ExpenseDiagram from './ExpenseDiagram';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles(theme => ({
        gridcontainer: {
            flexGrow: 1,
            padding: theme.spacing(2),
            minHeight: 750,
            background: '#FFFFFF'
        },

        // the style for the left grouplist paper
        paperGroupList: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
            background: '#FFFFFF'
        },
        // the style for the expense diagram paper
        paperGroupOverview: {
           padding: theme.spacing(2),
           color: theme.palette.text.secondary,
           background: '#FFFFFF'
        }
    }));
            
const groupMembersString = function(group) {
    let text = group.groupMembers[0].name;
    for (let i = 1; i < group.groupMembers.length; i++) {
        text += ", " + group.groupMembers[i].name;
    }
   return text;
}        
           
export function Overview (props) {
    /* MOCK DATA ----------------------------*/
    // list of current members of the systems, here we should get the data from the server later
    
    const members = [{name: "Alice"}, {name: "Bob"}, {name: "James"}, {name: "Maria"}, {name: "Thomas"},
                     {name: "Jennifer"}]
   
    const billsGroup1 = [{title: 'Uber', amount: 15, date: new Date('2019-10-01'), from: members[0], to: members}]
    console.log(billsGroup1[0].date) 


    // groups as a state variable for the list, will later be fetched from server
    // TODO: figure out how to represent expenses and who owes whom
    const [groups, setGroups] = React.useState(
            [{name: 'Family',
              index: 0,
              groupMembers: members},
             {name: 'TO',
              index: 1,
              groupMembers: [members[2], members[3], members[4], members[5]]},
            {name: 'Team 42',
              index: 2,
              groupMembers: [members[0], members[1]]}
            ]);


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

    /* the following are all functions and variables needed
     * for the menu button to decide between bills or
     * balances overview in the right grid
     *
     */

    const [anchorE1, setAnchorE1] = React.useState(null);
    // indicates whether the overview shows the balances (true) or the bills
    const [balancesOrBills, setBalancesOrBills] = React.useState(true);
    
    // Handles whenever one wants to switch between balances or bills
    const handleMenuClick = event => {
        setAnchorE1(event.currentTarget);
    }
    
    // functions to switch between balances or bills
    const switchToBills = () => {
        setBalancesOrBills(false);
        setAnchorE1(null);
    }

    const switchToBalances = () => {
        setBalancesOrBills(true);
        setAnchorE1(null);
    }
    const closeMenu = () => {
       setAnchorE1(null);
    } 
    // the styles for the components    
	const classes = useStyles();

	return (
			<div>
                <CustomHeader />
                <Container maxWidth="lg">
                    <Card className={classes.gridcontainer}>
                    <Grid container spacing = {2}>
                    
                    
                     {/*left Grid that shows the grouplist*/}
                       <Grid item xs={4}>
                            <Paper className={classes.paperGroupList}>
                                <h3>Your groups</h3>
                                <GroupList
                                    groups={groups}
                                    index={selectedIndex}
                                    handeListItemClick={handeListItemClick}
                               />
                                <Divider/>
                            <ListItem>
                                <CustomButton>Create new group</CustomButton>
                            </ListItem>
                            </Paper>
                        </Grid>
                        
                        
                        {/* right Grid that shows the overview and diagram */}
                        
                               
                        <Grid item xs={8}>
                            <Paper className={classes.paperGroupOverview}>
                                <p><strong>{groups[selectedIndex].name}</strong> - 
                                    <em> {groupMembersString(groups[selectedIndex])} </em>
                                </p>
                               
                                <ExpenseDiagram
                                    group={groups[selectedIndex]}
                                />
                                
                                {/* position this button anywhere you want. */}
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
