import React from 'react';
import './App.css';
import Header from './GUI/HeaderComponent';
import ButtonComponent from "./GUI/ButtonComponent";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import {CustomButton, CustomHeader} from "./GUI/Theme";
import PaymentDialog from "./GUI/PaymentDialog";


class Overview extends React.Component {
	
	state = {
		// whether or not to open the payments dialog popup
		openPayments: false
	};
	
	/* 
	Handles whenever payment button is clicked to open dialog to make payment.
	*/
	openPaymentsDialog = () => {
		this.setState({
			openPayments: true
		})
	};
	
	/* 
	Handles closing dialog when Dialog requests it.
	*/
	closePaymentsDialog = () => {
		this.setState({
			openPayments: false
		})
	};
	
	render() {
		return (
			<div>
				<CustomHeader />
				
				{/* position this button anywhere you want. It also doesnt matter where you put the dialog because it is fullscreen.*/}
				<CustomButton clickHandler={this.openPaymentsDialog}>Make payment</CustomButton>
				{/* Pass in handler that closes Dialog when the Dialog requests it. */}
				<PaymentDialog open={this.state.openPayments} closeHandler={this.closePaymentsDialog} />
			</div>
		);

	}
}
export default Overview;
