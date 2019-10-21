import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const cardStyle = makeStyles({
  card: {
	marginLeft: 40,
	marginRight: 40,
	marginTop: 20
  },
});

export function CustomCard(props) {
	const classes = cardStyle();
	const prompt = props.prompt
	const readonly = props.readonly
	
	
	if (readonly == true) {
		return (
		<Card className={classes.card} raised="true">
			<CardContent>
				<h4>{ prompt }</h4>
				<TextField disabled={true} variant="outlined"/>
			</CardContent>
		</Card>
		)
	} else {
		return (
		<Card className={classes.card} raised="true">
			<CardContent>
				<h4>{ prompt }</h4>
				<TextField disabled={false} variant="outlined"/>
			</CardContent>
		</Card>
		)
	}
}


export default CustomCard;

