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
import { CustomButton} from "./Theme";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { InputAdornment } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {CustomHeader} from "./Header"
import Box from "@material-ui/core/Box";


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
	const currentIndex = props.currentIndex
	const classes = useStyles()
  const groupMembers = props.groupMembers
  const currentUser = props.currentUser
  const group = props.group

  // handler that should be notified when user wants to pay a bill
  const createBillHandler = props.createBillHandler

  const closeHandler = props.closeHandler

	const [billValues, setBillValues] = React.useState({
		title: '',
		amount: '',
	})

	const handleBillChange = prop => event => {
		setBillValues({ ...setBillValues, [prop]: event.target.value });
	}

  const [title, setTitle] = React.useState("")

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const [amount, setAmount] = React.useState('')

  const handleAmountChange = event => {
    setAmount(event.target.value)
  }

	const [selectedDate, setSelectedDate] = React.useState(new Date())

	const handleDateChange = event => {
		setSelectedDate(event.target.value);
	}

  // list of users in this bill
  const [members, setMembers] = React.useState([]);

	const handleMembersChange = event => {
		setMembers(event.target.value);
	};

  // Create the new bill with given info
  function acceptButtonPressed() {
    const billMembers = members;
    billMembers.push(currentUser);
    console.log(group)
    createBillHandler(group, title, amount, billMembers, selectedDate);
    closeHandler();
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

	return (
		<Card className={classes.card} role="tabpanel" hidden={currentIndex !== index}>
			<CardContent>
				<h4>Title</h4>
				<TextField fullWidth variant="outlined"
					 onChange={handleTitleChange} />
			</CardContent>
			<CardContent>
				<h4>Payment Amount</h4>

				<TextField fullwidth variant="outlined"
					type='number' onChange={handleAmountChange}
					InputProps={{
						startAdornment: <InputAdornment position="start">CAD$</InputAdornment>,
					}} />

			</CardContent>
      <CardContent>
				<h4>Participants</h4>
				<form autoComplete="off">
					<FormControl className={classes.formControl}style={{width:"100%"}}>
            <InputLabel htmlFor="select-multiple-chip">Click to add users</InputLabel>
            <Select
              multiple
              value={members}
              onChange={handleMembersChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value.username} label={value.name} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}>
              {groupMembers.map(function(user) {
                if (user.username != currentUser.username) {
                  return (<MenuItem key={user.username} value={user}>{user.username}</MenuItem>)
                }
              })}
            </Select>
          </FormControl>
				</form>

			</CardContent>
			<CardContent>
				<h4>Date</h4>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						inputVariant="outlined"
						fullWidth
						variant="inline"
						format="MM/dd/yyyy"
						margin="normal"
						value={selectedDate}
						onChange={handleDateChange}
						maxDate={new Date()}
					/>
				</MuiPickersUtilsProvider>
			</CardContent>

			<CardContent>
				<CustomButton onClick={acceptButtonPressed}>Accept</CustomButton>
			</CardContent>
		</Card>
	)
}

/*
Tab for paying person. Has Autocomplete features to select people.
*/
function PayPerson(props) {
	const index = props.index
	const currentIndex = props.currentIndex
	const groupMembers = props.groupMembers
	const classes = useStyles()

  // the current user that is logged in
  const user = props.currentUser;

	// When user selects person from the menu, display it on the text input.
	const [name, setName] = React.useState('');
	//open and close menu
	const [open, setOpen] = React.useState(false);
	// amount input
	const [amount, setAmount] = React.useState(undefined);

	// state of label of name input
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
    if (inputLabel.current.offsetWidth > 0) {
		  setLabelWidth(inputLabel.current.offsetWidth);
    }
    // temporary fix for when first time label pops up, width is set to 0
    else {
       setLabelWidth(42);
    }
	}, []);

	// date for payment

	const [selectedDate, setSelectedDate] = React.useState(new Date())

	const handleDateChange = date => {
		setSelectedDate(date);
	}
	const handleAmountChange = event => {
		setAmount(event.target.value);
	}
	const handleNameChange = event => {
		setName(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Card className={classes.card} role="tabpanel" hidden={currentIndex !== index}>
			<CardContent>
				<h4>Payment Amount</h4>
				<TextField fullWidth variant="outlined"
					type='number' value={amount} onChange={handleAmountChange}
					InputProps={{
						startAdornment: <InputAdornment position="start">CAD$</InputAdornment>,
					}} />
			</CardContent>
			<CardContent>
				<h4>Payment to</h4>

				<form autoComplete="off">

					<FormControl
						variant="outlined" fullWidth>


						<InputLabel ref={inputLabel}
							htmlFor="select-outlined">Name</InputLabel>
						<Select
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={name}
							onChange={handleNameChange}
							id="select-outlined"
							labelWidth={labelWidth}
						>

							{groupMembers.map(function(member) {
                if (user.username != member.username) {
                  return (<MenuItem value={member.name}>{member.name}</MenuItem>)
                }
              })}

						</Select>
					</FormControl>
				</form>
			</CardContent>
			<CardContent>
				<h4>Memo</h4>
				<TextField fullWidth variant="outlined" />
			</CardContent>
			<CardContent>
				<h4>Date</h4>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						inputVariant="outlined"
						fullWidth
						variant="inline"
						format="MM//dd/yyyy"
						margin="normal"
						value={selectedDate}
						onChange={handleDateChange}
						maxDate={new Date()}
					/>
				</MuiPickersUtilsProvider>
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

	const open = props.open;
	// Handler to notify when it is time to close the dialog.
	const closeHandler = props.closeHandler;

  // handler to notify when user wants to pay a bill
  const createBillHandler = props.createBillHandler

	// which tab we are on
	const [tabIndex, setTabIndex] = React.useState(0);

	// what to do when user clicks on new tab
	const handleChange = (event, newTabIndex) => {
		setTabIndex(newTabIndex);
	};
	// what group we are looking at
	const group = props.group;

  // the current user that is logged in
  const user = props.currentUser;

	return (
		<div>
			<Dialog maxWidth="md" fullWidth={true} open={open} onClose={closeHandler}
			TransitionComponent={Transition} scroll='body'>
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
						<Tab label="Bill payment" {...a11yProps(0)} />
						<Tab label="Payment to" {...a11yProps(1)} />
					</Tabs>

				</AppBar>

				<PayBill currentIndex={tabIndex} index={0} createBillHandler={createBillHandler} group={group} groupMembers={group.groupMembers} currentUser={user} closeHandler={closeHandler} />
				<PayPerson currentIndex={tabIndex} index={1} groupMembers={group.groupMembers} currentUser={user} closeHandler={closeHandler} />

			</Dialog>
		</div>
	);
}
