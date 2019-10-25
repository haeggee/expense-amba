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

const useStyles = makeStyles(theme => ({
        gridcontainer: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },

        // the style for the left grouplist paper
        paperGroupList: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        // the style for the expense diagram paper
        paperGroupOverview: {
           padding: theme.spacing(2),
           color: theme.palette.text.secondary,
        }
    }));
            
	
export function Overview (props) {

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

   
    // list of current members of the systems, here we should get the data from the server later
    
    const members = [{name: "Alice"}, {name: "Bob"}, {name: "James"}]

    // groups as a state variable for the list, will later be fetched from server
    // TODO: figure out how to represent expenses and who owes whom
    const [groups, setGroups] = React.useState(
            [{name: 'Family',
              index: 0,
              groupMembers: members},
             {name: 'Team 42',
              index: 1,
              groupMembers: [members[0], members[1]]}
            ]);

	/*
     index of the current group
    */
    const [selectedIndex, setSelectedIndex] = React.useState(0); 
	
    /* Handles whenever another group is clicked */
    
    const handeListITemClick = (event, index) => {
       setSelectedIndex(index);
    };

    // the styles for the components    
	const classes = useStyles();

	return (
			<div>
				<CustomHeader />
                <div className={classes.gridcontainer}>
                <Grid container spacing = {2}>
                    <Grid item xs={4}>
                        <Paper className={classes.paperGroupList}>
                            <h3>Your groups</h3>
                            <GroupList
                                groups={groups}
                                index={selectedIndex}
                                handeListITemClick={handeListITemClick}
                             />
                            <Divider/>
                        <ListItem>
                            <CustomButton>Create new group</CustomButton>
                        </ListItem>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paperGroupOverview}>
                            <h3>{groups[selectedIndex].name} - Overview</h3>
                            <ExpenseDiagram
                                group={groups[selectedIndex]}
                            />
                            
                            {/* position this button anywhere you want.
                                It also doesnt matter where you put the dialog because it is fullscreen.*/}
			            	<CustomButton clickHandler={openPaymentsDialog}>Add another payment</CustomButton>
			            	{/* Pass in handler that closes Dialog when the Dialog requests it. */}
			            	<PaymentDialog open={openPayments} closeHandler={closePaymentsDialog} />
                        </Paper>
                    </Grid>
                </Grid>                
				</div>
			</div>
		);

	
}
export default Overview;
