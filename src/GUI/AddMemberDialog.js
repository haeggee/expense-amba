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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CustomButton } from "./Theme";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ServerInterface from '../ServerInterface';

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

}));


/**
 * Animation for opening dialog.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Contents for this dialog.
 */
function DialogContents(props) {
    const users = props.users;
    const classes = useStyles();

    const closeHandler = props.closeHandler;

    // current group
    const group = props.group;
    const addNewMemberHandler = props.addNewMemberHandler
    
    // get members that are not in the group already
    const filteredUsers = users.filter(user => {
        if(user.username === 'admin') {
            return false;
        }
        for (let i = 0; i < group.groupMembers.length; i++) {
            if (group.groupMembers[i].user === user._id) {
                return false;
            }
        }
        return true;
    })
    /**
     * Adds Members to group
     */
    const addMembers = function () {
        if (members.length !== 0) {
            addNewMemberHandler(members, group)
            closeHandler();
        } else {
            setError(true);
            setErrorMessage("Pick at least 1 member to add")
        }
    }

    // list of users in the group
    const [members, setMembers] = React.useState([]);


    // check for invalid input
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleMembersChange = event => {
        setMembers(event.target.value);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    if (filteredUsers.length !== 0) {
        return (
            <Card className={classes.card}>

                <CardContent>
                    <h4>Members</h4>
                    <form autoComplete="off">
                        <FormControl error={error} className={classes.formControl} style={{ width: "100%" }}>
                            <InputLabel htmlFor="select-multiple-chip">Click to add users</InputLabel>
                            <Select
                                multiple
                                value={members}
                                onChange={handleMembersChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            <Chip key={value.username} label={value.name} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}>
                                {filteredUsers.map(function (user) {
                                    return (<MenuItem key={user.username} value={user}>{user.username}</MenuItem>)
                                })}
                            </Select>

                            <FormHelperText id="my-helper-text">{errorMessage}</FormHelperText>
                        </FormControl>

                    </form>
                </CardContent>
                <CardContent>
                    <CustomButton onClick={addMembers}>Accept</CustomButton>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography align="center">All users in the system are in your group already.</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default function CreateAddMemberDialog(props) {
    const classes = useStyles();

    const users = props.users;
    const open = props.open;
    // Handler to notify when it is time to close the dialog.
    const closeHandler = props.closeHandler;

    // the current group
    const group = props.group;
    const addNewMemberHandler = props.addNewMemberHandler

    return (
        <div>
            <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={closeHandler}
                TransitionComponent={Transition} scroll='body'>
                <AppBar className={classes.appBar}>

                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Add members to: <em>{group.name}</em></Typography>
                        <Button color="inherit" onClick={closeHandler}>
                            Cancel
						</Button>
                    </Toolbar>
                </AppBar>

                <DialogContents users={users} group={group} closeHandler={closeHandler} addNewMemberHandler={addNewMemberHandler}/>

            </Dialog>
        </div>
    );
}
