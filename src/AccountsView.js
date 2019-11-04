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

	const contextValue = useContext(UserContext)
	const user = contextValue.user

	const [values, setValues] = React.useState({
		editable: false,
		editButtonText: "Edit"
	});

	const handleEditClick = () => {
		if (values.editable === false) {
			setValues({ editable: true, editButtonText: "Save" })
		} else {
			setValues({ editable: false, editButtonText: "Edit" })
		}
	};

	const handleDoneClick = () => {
		history.push('/overview')
	};

	function onNameChange(event) {
		user.name = event.target.value
	}

	function onUserNameChange(event) {
		user.username = event.target.value
	}

	function onPasswordChange(event) {
		user.password = event.target.value
	}

	function onEmailChange(event) {
		user.email = event.target.value
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
				<AccountsCard title="Username" value={user.username} editable={values.editable} onChange={onUserNameChange} />
				<AccountsCard title="Name" value={user.name} editable={values.editable} onChange={onNameChange} />
				<AccountsCard title="Email" value={user.email} editable={values.editable} onChange={onEmailChange} />
				<AccountsCard title="Password" value={user.password} type="password" editable={values.editable} onChange={onPasswordChange} />

				<Box flexDirection="row">
					<CustomButton className={className.editbutton} onClick={handleEditClick}>{values.editButtonText}</CustomButton>
					<CustomButton className={className.donebutton} onClick={handleDoneClick}>Done</CustomButton>
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
