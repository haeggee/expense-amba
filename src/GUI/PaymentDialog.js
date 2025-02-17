import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { CustomButton } from "./Theme";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { InputAdornment } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Box from "@material-ui/core/Box";
import FormHelperText from '@material-ui/core/FormHelperText'

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
	leftComponent: {
		width: "40%",
		marginRight: 20,
	},
	rightComponent: {
		width: "40%"
	},
	field: {
		width: '90%',
		marginTop: theme.spacing(0)
	}
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

	const [title, setTitle] = React.useState("")
	const [titleError, setTitleError] = React.useState(false)
	const [titleErrorMessage, setTitleErrorMessage] = React.useState("")

	const handleTitleChange = event => {
		setTitle(event.target.value)
	}

	const [amount, setAmount] = React.useState(0)
	const [amountError, setAmountError] = React.useState(false)
	const [amountErrorMessage, setAmountErrorMessage] = React.useState("")

	const handleAmountChange = event => {
		setAmount(event.target.value)
	}

	const [selectedDate, setSelectedDate] = React.useState(new Date())

	const handleDateChange = date => {
		setSelectedDate(date);
	}

	// list of users in this bill
	const [members, setMembers] = React.useState([]);

	const [membersError, setMembersError] = React.useState(false)
	const [membersErrorMessage, setMemberErrorsMessage] = React.useState("")

	const handleMembersChange = event => {
		setMembers(event.target.value);
	};

	// Gets the number of decimal places in the number
	function getDecimalPlaces(number) {
		let e = 1, places = 0;
		while (Math.round(number * e) / e !== +number) {
			e *= 10
			places++
			if (places > 2) {
				return places
			}
		}
		return places
	}

	// Create the new bill with given info
	function acceptButtonPressed() {
		let otherUserIncluded = false;
		for (let i = 0; i < members.length; i++) {
			if (members[i].username !== currentUser.username) {
				otherUserIncluded = true;
			}
		}
		if (title.length !== 0 && amount > 0 && otherUserIncluded && getDecimalPlaces(amount / members.length) <= 2) {
			const billMembers = members;
			createBillHandler(group, title, amount, billMembers, selectedDate);
			closeHandler();
		} else {
			setTitleError(false);
			setTitleErrorMessage("")
			setAmountError(false);
			setAmountErrorMessage("")
			setMembersError(false);
			setMemberErrorsMessage("")

			if (title.length === 0) {
				setTitleError(true);
				setTitleErrorMessage("Title must have at least 1 character")
			}
			if (amount === 0) {
				setAmountError(true);
				setAmountErrorMessage("Value must be greater than 0")
			}
			if (!otherUserIncluded) {
				setMembersError(true);
				setMemberErrorsMessage("Must include at least one other user")
			} else if (getDecimalPlaces(amount) > 2) {
				setAmountError(true);
				setAmountErrorMessage("Not a valid amount of money")
			} else if (getDecimalPlaces(amount / members.length) > 2) {
				// Cant evenly divide up the amount
				setAmountError(true);
				setAmountErrorMessage("Can't evenly divide up that amount of money with that many people")
			}
		}
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
				<Grid container>
					<Grid item xs={6}>
						<h4>Title</h4>
						<TextField error={titleError}
							className={classes.field} variant="outlined"
							onChange={handleTitleChange} placeholder="Enter title for the bill"
							helperText={titleErrorMessage} />
					</Grid>
					<Grid item xs={6} >
						<h4>Date</h4>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								inputVariant="outlined"
								className={classes.field}
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								value={selectedDate}
								onChange={handleDateChange}
								maxDate={new Date()}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
				</Grid>
			</CardContent>
			<CardContent>
				<Grid container>
					<Grid item xs={6}>
						<h4>Payment Amount</h4>

						<TextField error={amountError}
							className={classes.field} variant="outlined"
							type='number' onChange={handleAmountChange}
							helperText={amountErrorMessage}
							InputProps={{
								startAdornment: <InputAdornment position="start">CAD$</InputAdornment>,
							}} />

					</Grid>
					<Grid item xs={6}>
						<h4>Participants</h4>
						<form autoComplete="off">
							<FormControl error={membersError} className={classes.field}>
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
									<MenuItem key={currentUser.username} value={currentUser}>You</MenuItem>
									{groupMembers.map(function (member) {
										if (member.username !== currentUser.username) {
											return (<MenuItem key={member.username} value={member}>{member.username}</MenuItem>)
										}
									})}
								</Select>

								<FormHelperText id="my-helper-text">{membersErrorMessage}</FormHelperText>
							</FormControl>
						</form>
					</Grid>
				</Grid>
			</CardContent>
			<br />

			<CardContent>
				<CustomButton onClick={acceptButtonPressed}>Accept</CustomButton>
			</CardContent>
		</Card>
	)
}

/**
 * Tab for paying person. Has Autocomplete features to select people.
 */
function PayPerson(props) {
	const index = props.index
	const currentIndex = props.currentIndex
	const groupMembers = props.groupMembers
	const classes = useStyles()
	const closeHandler = props.closeHandler
	const payPersonHandler = props.payPersonHandler
	const group = props.group

	// the current user that is logged in
	const user = props.currentUser;

	// When user selects person from the menu, display it on the text input.
	const [name, setName] = React.useState(undefined);
	const [nameError, setNameError] = React.useState(false)
	const [nameErrorMessage, setNameErrorMessage] = React.useState("")
	//open and close menu
	const [open, setOpen] = React.useState(false);
	// amount input
	const [amount, setAmount] = React.useState(undefined);

	const [amountError, setAmountError] = React.useState(false)
	const [amountErrorMessage, setAmountErrorMessage] = React.useState("")

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

	// Create the new bill with given info
	function acceptButtonPressed() {
		if (name !== undefined && amount > 0) {
			payPersonHandler(group, "Reimbursement from " + user.name + " to " + name.name, amount, [name], selectedDate);
			closeHandler();
		} else {
			setAmountError(true);
			setAmountErrorMessage("Value must be greater than 0")
			setNameError(true)
			setNameErrorMessage("Must pick one member")
			if (name !== undefined) {
				setNameError(false)
				setNameErrorMessage("")
			}
			if (amount > 0) {
				setAmountError(false);
				setAmountErrorMessage("")
			}
		}
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
				<Box flexDirection="row">

					<h4>Payment amount</h4>
					<TextField error={amountError}
						variant="outlined" className={classes.leftComponent}
						type='number' value={amount} onChange={handleAmountChange}
						helperText={amountErrorMessage}
						InputProps={{
							startAdornment: <InputAdornment position="start">CAD$</InputAdornment>,
						}} />

					<FormControl error={nameError} className={classes.rightComponent} variant="outlined">
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
							renderValue={
								function (selected) {
									return (<Chip key={selected.username} label={selected.name} className={classes.chip} />)
								}
							}
							MenuProps={MenuProps}
						>

							{groupMembers.map(function (member) {
								if (user.username !== member.username) {
									return (<MenuItem value={member}>{member.username}</MenuItem>)
								}
							})}
						</Select>
						<FormHelperText id="my-helper-text">{nameErrorMessage}</FormHelperText>
							
					</FormControl>
				</Box>
			</CardContent>

			<CardContent>
				<CustomButton onClick={acceptButtonPressed}>Accept</CustomButton>
			</CardContent>
		</Card>
	)
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`, 'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

/**
 * Dialog containing two tabs; one for paying bill, one for paying person.
 */
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

	// group members of the group
	const members = props.groupMembers

	// the current user that is logged in
	const user = props.currentUser;

	const payPersonHandler = props.payPersonHandler

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

				<PayBill currentIndex={tabIndex} index={0} createBillHandler={createBillHandler} group={group} groupMembers={members} currentUser={user} closeHandler={closeHandler} />
				<PayPerson currentIndex={tabIndex} index={1} groupMembers={members} group={group} currentUser={user} payPersonHandler={payPersonHandler} closeHandler={closeHandler} />

			</Dialog>
		</div>
	);
}
