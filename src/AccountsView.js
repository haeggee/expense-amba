import React, { useContext } from "react";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { CustomButton } from "./GUI/Theme"
import AccountsCard from "./GUI/AccountsCard"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid"
import { CustomHeader } from "./GUI/Header"
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getState, subscribe, setState } from "statezero"
import ServerInterface from "./ServerInterface";

// themes and styles class
const themes = makeStyles({
	editbutton: {
		marginLeft: '00px',
		marginTop: '40px',
	},
	donebutton: {
		marginLeft: '20px',
		marginTop: '40px',
	}
});


/**
 * View that shows account info for the user.
 */
export function Accountsview(props) {
	const className = themes()
	let history = useHistory();

	// get current user
	const [user, setUser] = React.useState(getState('user'))

	// admin should not see this page
	if (user && user.username === 'admin') {
		history.push('/admin')
	}

	const [values, setValues] = React.useState({
		editable: false,
		editButtonText: "Edit"
	});

	// values for textfields
	const [username, setUsername] = React.useState(user ? user.username : "")
	const [name, setName] = React.useState(user ? user.name : "")
	const [email, setEmail] = React.useState(user ? user.email : "")
	const [password, setPassword] = React.useState("")


	// set user if state changes
	subscribe((newUser) => {
		if (newUser) {
			setUser(newUser);
			setUsername(newUser.username)
			setName(newUser.name)
			setEmail(newUser.email)
			setPassword("")
		}
	}, "user");

	const handleEditClick = () => {
		if (values.editable === false) {
			setValues({ editable: true, editButtonText: "Save" })
		} else {
			// server call
			ServerInterface.modifyUser(user._id, username, name, email, password,
				(success) => {
					if (success) {
						// make another call to server to get modified
						// user object s.t. global state of user (and username, ...)
						// is coherent with database
						ServerInterface.getUserById(user._id)
						setValues({ editable: false, editButtonText: "Edit" })
					} else {
						alert("Modifying the account failed")
					}
				})
		}
	};

	const handleDoneClick = () => {
		history.push('/overview')
	};

	function onNameChange(event) {
		setName(event.target.value)
	}

	function onUserNameChange(event) {
		setUsername(event.target.value)
	}

	function onPasswordChange(event) {
		setPassword(event.target.value)
	}

	function onEmailChange(event) {
		setEmail(event.target.value)
	}

	return (
		<div>
			{/* Dont use the CustomHeader because it has a button for user to go to accounts screen. This IS the accounts screen! */}
			<CustomHeader />

			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '100vh' }}>


				<h2>Account settings</h2>
				<AccountsCard title="Username" value={username} editable={values.editable} onChange={onUserNameChange} />
				<AccountsCard title="Name" value={name} editable={values.editable} onChange={onNameChange} />
				<AccountsCard title="Email" value={email} editable={values.editable} onChange={onEmailChange} />
				<AccountsCard title="Password" value={password} type="password" editable={values.editable} onChange={onPasswordChange} />

				<Box flexDirection="row">
					<CustomButton className={className.editbutton} onClick={handleEditClick}>{values.editButtonText}</CustomButton>
					<CustomButton className={className.donebutton} onClick={handleDoneClick}>Cancel</CustomButton>
				</Box>

			</Grid>
		</div>
	);
}

/*
class Accountsview extends React.Component {
	render() {
		const buttonstyle = cardStyle()
		return (
			<div>
				<EmptyHeader />
				<CustomCard prompt="Username" readonly={false}/>
				<CustomCard prompt="Name" readonly={false}/>
				<CustomCard prompt="Email" readonly={false}/>
				<CustomCard prompt="Password" readonly={false}/>
				<br/>
				<CustomButton margins={40} className={buttonstyle.card}>Edit</CustomButton>
			</div>
		);
	}
}
*/
export default Accountsview;
