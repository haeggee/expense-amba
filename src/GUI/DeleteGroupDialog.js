import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
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
    card: {
        marginLeft: 40,
        marginRight: 40,
    },
    box: {
        margin: theme.spacing(4),
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    }
}));


/**
 * Animation for opening dialog.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteGroupDialog(props) {
    const classes = useStyles();

    const open = props.open;
    // Handler to notify when it is time to close the dialog.
    const closeHandler = props.closeHandler;

    // current group
    const group = props.group
    // group delete handler
    const deleteGroup = props.deleteGroup

    return (
        <div>
            <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={closeHandler}
                TransitionComponent={Transition} scroll='body'>
                <AppBar className={classes.appBar}>

                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Are you sure you want to delete the group <em>{group.name}</em>?</Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.box}>   
                    <Button onClick={deleteGroup}>Confirm</Button>
            
                    <Button onClick={closeHandler}>Cancel</Button>
                </div>

            </Dialog>
        </div>
    );
}
