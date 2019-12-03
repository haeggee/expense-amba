import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

// Style for Card.
const cardStyle = makeStyles({
  card: {
	marginLeft: 40,
	marginRight: 40,
	marginTop: 20,
	width: '50%'
  },
});

/*
 *A custom card that has a text prompt/title, as well as a TextField to enter in information.
 */
export function AccountsCard(props) {
	const classes = cardStyle();
	const title = props.title
	const editable = props.editable
	const value = props.value
	const type = props.type
	const onChange = props.onChange
	
	return (
		<Card className={classes.card} raised={true}>
			<CardContent>
				<h4>{ title }</h4>
				<TextField disabled={!editable} type={type} fullWidth defaultValue={value} variant="outlined" onChange={onChange}/>
			</CardContent>
		</Card>
	)
}


export default AccountsCard;

