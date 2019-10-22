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
import theme from "./Theme";
import {ThemeProvider} from "@material-ui/core/styles"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

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
		marginTop: 20
	},
}));

/*
Animation for opening dialog.
*/
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
		</Card>
	)
}

function PayPerson(props) {
	const index = props.index
	const value = props.value
	return (
		<Card className={useStyles().card} role="tabpanel" raised="true" hidden={value !== index}>
			<CardContent>
				<h4>Payment Amount</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<h4>Payment to</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<h4>Memo</h4>
				<TextField fullWidth variant="outlined" />
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
	
	let open = props.open
	// Handler to notify when it is time to close the dialog.
	let closeHandler = props.closeHandler
	
	// which tab we are on
	const [value, setValue] = React.useState(0);

	// what to do when user clicks on new tab
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    return (
	<div>
		<Dialog fullScreen open={open} onClose={closeHandler} TransitionComponent={Transition}>
			<ThemeProvider theme={theme}>
				<AppBar className={classes.appBar}>
				
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Make Payment
						</Typography>
						<Button color="inherit" onClick={closeHandler}>
							Cancel
						</Button>
					</Toolbar>
					
					<Tabs centered value={value} onChange={handleChange} >
						<Tab label="Bill payment" {...a11yProps(0)}/>
						<Tab label="Payment to" {...a11yProps(1)}/>
					</Tabs>
						
				</AppBar>
				
			</ThemeProvider>
			
			<PayBill value={value} index={0}/>
			<PayPerson value={value} index={1}/>
			
		</Dialog>
	</div>
    );
}