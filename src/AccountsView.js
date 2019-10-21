import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Header from './GUI/HeaderComponent';
import Button from "@material-ui/core/button";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import {CustomButton, EmptyHeader} from "./GUI/Theme";
import CustomCard from "./GUI/CustomCard"

// themes and styles class
const themes = makeStyles({
	buttons: {
		margin: '40px',
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
			<CustomCard prompt="Username" readonly={false}/>
			<CustomCard prompt="Name" readonly={false}/>
			<CustomCard prompt="Email" readonly={false}/>
			<CustomCard prompt="Password" readonly={false}/>
			
			<CustomButton className={className.buttons}>Edit</CustomButton>
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
