import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import theme from "./Theme";
import {ThemeProvider} from "@material-ui/core/styles"

/*
Some styles for this part only
*/
const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

/*
Animation for opening dialog.
*/
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaymentDialog(props) {
	const classes = useStyles();
	
	let open = props.open
	// Handler to notify when it is time to close the dialog.
	let closeHandler = props.closeHandler

    return (
	<div>
		<Dialog fullScreen open={open} onClose={closeHandler} TransitionComponent={Transition}>
			<ThemeProvider theme={theme}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Make Payment
						</Typography>
						<Button color="inherit" onClick={closeHandler}>
							Cancel
						</Button>
					</Toolbar>
				</AppBar>
			</ThemeProvider>
			
		</Dialog>
	</div>
    );
}