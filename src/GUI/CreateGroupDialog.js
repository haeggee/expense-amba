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
import { CustomButton, CustomHeader } from "./Theme";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { InputAdornment } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

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
Contents for this dialog.
*/
function DialogContents(props) {
	const index = props.index;
	const users = props.users;
	const classes = useStyles();

  // the current user that is logged in
  const currentUser = props.currentUser;

	// When user selects person from the menu, display it on the text input.
	const [name, setName] = React.useState([]);
	//open and close menu
	const [open, setOpen] = React.useState(false);
	// amount input
	const [amount, setAmount] = React.useState(null);
  
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
		<Card className={classes.card}>
		
      <CardContent>
        <h4>Group Name</h4>
        <TextField fullWidth variant="outlined" placeholder="Name" />
			</CardContent>
			<CardContent>
				<h4>Users in this group with you</h4>
				<form autoComplete="off">
					<FormControl className={classes.formControl}style={{width:"100%"}}>
            <InputLabel htmlFor="select-multiple-chip">Click to add users</InputLabel>
            <Select
              multiple
              value={name}
              onChange={handleNameChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value.username} label={value.name} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}>
              {users.map(function(user) {
                if (user.username != currentUser.username) {
                  return (<MenuItem key={user.username} value={user}>{user.username}</MenuItem>)
                }
              })}
            </Select>
          </FormControl>
				</form>
			</CardContent>
			<CardContent>
				<CustomButton >Accept</CustomButton>
			</CardContent>
		</Card>
	)
}

export default function CreateGroupDialog(props) {
	const classes = useStyles();

  const users = props.users;
	const open = props.open;
	// Handler to notify when it is time to close the dialog.
	const closeHandler = props.closeHandler;

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
						<Typography variant="h6" className={classes.title}>Create a new group</Typography>
						<Button color="inherit" onClick={closeHandler}>
							Cancel
						</Button>
					</Toolbar>
				</AppBar>

				<DialogContents users={users} currentUser={user} />

			</Dialog>
		</div>
	);
}
