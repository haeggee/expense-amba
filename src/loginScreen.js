import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./GUI/HeaderComponent";
import Button from "@material-ui/core/Button";
import LogoComponent from "./GUI/LogoComponent";
import InputComponent from "./GUI/InputComponent";
import { CustomButton, CustomHeader, EmptyHeader } from "./GUI/Header";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

// Themes and styles - Need to implement

/*
View that shows account info for the user.
*/
export function loginScreen(props) {
  // const className = themes()

  // const [values, setValues] = React.useState({
  // 	editable: false,
  // 	editButtonText: "Edit"
  // });

  // const handleEditClick = () => {
  // 	if (values.editable === false) {
  // 		setValues({ editable: true, editButtonText: "Save" })
  // 	} else {
  // 		setValues({ editable: false, editButtonText: "Edit" })
  // 	}
  // };

  return (
    <div>
      {/* Dont use the CustomHeader because it has a button for user to go to accounts screen. This IS the accounts screen! */}
      <EmptyHeader />

      {/* <Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '100vh' }}>
				
				
				<h2>Account settings</h2>
				<AccountsCard title="Username" value="n00bm@ster69" editable={values.editable} />
				<AccountsCard title="Name" value="Donald Trump" editable={values.editable} />
				<AccountsCard title="Email" value="DJT@gmail.com" editable={values.editable} />
				<AccountsCard title="Password" value="password" type="password" editable={values.editable} />

				<Box flexDirection="row">
					<CustomButton className={className.editbutton} clickHandler={handleEditClick}>{values.editButtonText}</CustomButton>
					<CustomButton className={className.donebutton} >Done</CustomButton>
				</Box>
				
			</Grid>  */}
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
export default loginScreen;
