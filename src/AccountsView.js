import React from 'react';
import './App.css';
import Header from './GUI/HeaderComponent';
import ButtonComponent from "./GUI/ButtonComponent";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import {CustomButton, EmptyHeader} from "./GUI/Theme";
import CustomCard from "./GUI/CustomCard"

class Accountsview extends React.Component {
	render() {
		return (
			<div>
				<EmptyHeader />
				<CustomCard prompt="Username" readonly={false}/>
				<CustomCard prompt="Name" readonly={false}/>
				<CustomCard prompt="Email" readonly={false}/>
				<CustomCard prompt="Password" readonly={false}/>
			</div>
		);
	}
}
export default Accountsview;
