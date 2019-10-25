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

const useStyles = makeStyles(theme => ({
        gridcontainer: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    }));
            
	
export function Overview (props) {

    // openPayments indicates whether or not to open the payments dialog popup
   
    const [openPayments, setopenPayments] = React.useState(false);
    
    // list of current members of the systems, here we should get the data from the server later
    
    const members = [{name: "Alice"}, {name: "Bob"}, {name: "James"}]

    // groups as a state variable for the list, will later be fetched from server

    const [groups, setGroups] = React.useState(
            [{name: 'Family',
              groupMembers: members},
             {name: 'Team 42',
              groupMembers: [members[0], members[1]]}
            ]);
	
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

    // the styles for the components    
	const classes = useStyles();

	return (
			<div>
				<CustomHeader />
                <div className={classes.gridcontainer}>
                <Grid container spacing = {2}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <h3>Your groups</h3>
                            <GroupList
                                groups={groups}
                            />    
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <h3>Overview</h3>
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
