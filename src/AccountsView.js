import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from './GUI/HeaderComponent';
import Button from "@material-ui/core/button";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import {CustomButton, EmptyHeader} from "./GUI/Theme";
import AccountsCard from "./GUI/AccountsCard"
import Box from "@material-ui/core/box";

// themes and styles class
const themes = makeStyles({
	buttons: {
		marginLeft: '40px',
		marginTop: '40px',
	},
});

/*
View that shows account info for the user.
*/
export function Accountsview(props) {
	const className = themes()
	
	return (
		<div>
			<EmptyHeader />
			<AccountsCard prompt="Username" readonly={false}/>
			<AccountsCard prompt="Name" readonly={false}/>
			<AccountsCard prompt="Email" readonly={false}/>
			<AccountsCard prompt="Password" readonly={false}/>
			
			<Box flexDirection="row">
				<CustomButton className={className.buttons}>Edit</CustomButton>
				<CustomButton className={className.buttons}>Done</CustomButton>
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
