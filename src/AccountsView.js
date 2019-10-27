import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from './GUI/HeaderComponent';
import Button from "@material-ui/core/Button";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import {CustomButton, CustomHeader, EmptyHeader} from "./GUI/Theme"
import AccountsCard from "./GUI/AccountsCard"
import Box from "@material-ui/core/Box";

// themes and styles class
const themes = makeStyles({
	editbutton: {
		marginLeft: '40px',
		marginTop: '40px',
	},
	donebutton: {
		marginLeft: '20px',
		marginTop: '40px',
	},
});


/*
View that shows account info for the user.
*/
export function Accountsview(props) {
	const className = themes()
	
	const [values, setValues] = React.useState({
		editable: false,
		editButtonText: "Edit"
	});
	
	const handleEditClick = () => {
		if (values.editable === false) {
			setValues({editable: true, editButtonText: "Save"})
		} else {
			setValues({editable: false, editButtonText: "Edit"})
		}
	};
	

	return (
		<div>
			<CustomHeader loggedIn={true} />
			<AccountsCard title="Username" value="n00bm@ster69" editable={values.editable}/>
			<AccountsCard title="Name" value="Donald Trump" editable={values.editable}/>
			<AccountsCard title="Email" value="DJT@gmail.com" editable={values.editable}/>
			<AccountsCard title="Password" value="password" type="password" editable={values.editable}/>
			
			<Box flexDirection="row">
				<CustomButton className={className.editbutton} clickHandler={handleEditClick}>{values.editButtonText}</CustomButton>
				<CustomButton className={className.donebutton} >Done</CustomButton>
			</Box>
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
