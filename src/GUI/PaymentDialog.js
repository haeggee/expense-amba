import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {CustomButton, CustomHeader} from "./Theme";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


/*
Some styles for this part only
*/
const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	card: {
		marginLeft: 40,
		marginRight: 40,
	},
	
}));


/*
Animation for opening dialog.
*/
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/*
Tab for paying bills.
*/
function PayBill(props) {
	const index = props.index
	const value = props.value
	return (
		<Card className={useStyles().card} role="tabpanel" raised="true" hidden={value !== index}>
			<CardContent>
				<h4>Payment Amount</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<h4>Date</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<h4>Memo</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<CustomButton >Accept</CustomButton>
			</CardContent>
		</Card>
	)
}

/*
Tab for paying person. Has Autocomplete features to select people.
*/
function PayPerson(props) {
	const index = props.index
	const v = props.value
	
	// When user selects person from the menu, display it on the text input.
    const [name, setName] = React.useState('');
	//open and close menu
    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        setName(event.target.value);
    };

    const handleClose = () => {
		setOpen(false);
    };

    const handleOpen = () => {
		setOpen(true);
    };
	
	return (
		<Card className={useStyles().card} role="tabpanel" raised="true" hidden={v !== index}>
			<CardContent>
				<h4>Payment Amount</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<h4>Payment to</h4>
				
				<form autoComplete="off">

					<FormControl fullWidth>
						<InputLabel htmlFor="demo-controlled-open-select">Name</InputLabel>
						<Select
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={name}
							onChange={handleChange}
							inputProps={{
							name: 'name',
							id: 'demo-controlled-open-select',
						}}>
							<MenuItem value=""><em>None</em></MenuItem>
							<MenuItem value={1}>Joe</MenuItem>
							<MenuItem value={2}>Bob</MenuItem>
							<MenuItem value={3}>ad</MenuItem>
						</Select>
					</FormControl>
				</form>
				
			</CardContent>
			<CardContent>
				<h4>Memo</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<CustomButton >Accept</CustomButton>
			</CardContent>
		</Card>
	)
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`, 'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

export default function PaymentDialog(props) {
	const classes = useStyles();
	
	const open = props.open
	// Handler to notify when it is time to close the dialog.
	const closeHandler = props.closeHandler
	
	// which tab we are on
	const [tabIndex, setTabIndex] = React.useState(0);

	// what to do when user clicks on new tab
	const handleChange = (event, newTabIndex) => {
		setTabIndex(newTabIndex);
	};
    // what group we are looking at
    const group = props.group;

    return (
	<div>
		<Dialog maxWidth="md" fullWidth={true} open={open} onClose={closeHandler} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
				
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Add a payment for: <em>{group.name}</em>
						</Typography>
						<Button color="inherit" onClick={closeHandler}>
							Cancel
						</Button>
					</Toolbar>
					
					<Tabs centered value={tabIndex} onChange={handleChange} >
						<Tab label="Bill payment" {...a11yProps(0)}/>
						<Tab label="Payment to" {...a11yProps(1)}/>
					</Tabs>
						
				</AppBar>
				
			
			<PayBill value={tabIndex} index={0}/>
			<PayPerson value={tabIndex} index={1}/>
			
		</Dialog>
	</div>
    );
}
