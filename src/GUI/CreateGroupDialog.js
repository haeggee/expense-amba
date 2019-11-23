import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import {CustomButton} from "./Theme"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Group from '../Group'
import ServerInterface from "../ServerInterface"

// import Autocomplete from '@material-ui/lab/Autocomplete'
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
    formControl: {
        color: theme.palette.text.primary
    },
    dialogPaper: {
        animated: 'false'
    }
}))


/**
 * Animation for opening dialog.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


/**
 * Contents for this dialog.
 */
function DialogContents(props) {
    const users = props.users
    const classes = useStyles()

    // the current user that is logged in
    const currentUser = props.currentUser

    const groupCreatedListener = props.groupCreatedListener

    const closeHandler = props.closeHandler

    /**
     * Creates a new group with the info the user entered.
     */
    const createGroup = function () {
        if (name.length !== 0 && members.length !== 0) {
            let groupID = ServerInterface.getNextGroupID()
            //Add current user to the group
            const groupUsers = [currentUser, ...members]
            // create group with bills array initially empty.
            const group = new Group(groupID, name, groupUsers, [])

            groupCreatedListener(group)
            closeHandler()
        }
        setNameError(true)
        setNameErrorText("Name must be at least 1 Character")
        setNoMembersError(true)
        setNoMembersText("Enter at least 1 member")
        if (members.length !== 0) {
            setNoMembersError(false)
            setNoMembersText("")
        }
        if (name.length !== 0) {
            setNameError(false)
            setNameErrorText("")
        }
    }

    // list of users in the group
    const [members, setMembers] = React.useState([])
    // When user selects person from the menu, display it on the text input.
    const [name, setName] = React.useState([])
    // boolean to set if error message for name
    const [nameError, setNameError] = React.useState(false)
    const [nameErrorText, setNameErrorText] = React.useState("")

    // boolean to set if error message for empty group
    const [noMembersError, setNoMembersError] = React.useState(false)
    const [noMembersText, setNoMembersText] = React.useState("")

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleMembersChange = event => {
        setMembers(event.target.value)
    }

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    return (
        <Card className={classes.card}>

            <CardContent>
                <h4>Group Name</h4>
                <TextField fullWidth variant="outlined"
                           placeholder="Name" onChange={handleNameChange}
                           error={nameError} helperText={nameErrorText}/>
            </CardContent>
            <CardContent>
                <h4>Users in this group with you</h4>
                <form autoComplete="off">
                    <FormControl error={noMembersError} className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="select-multiple-chip">Click to add users</InputLabel>
                        <Select
                            multiple
                            value={members}
                            onChange={handleMembersChange}
                            input={<Input id="select-multiple-chip"/>}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value.username} label={value.name} className={classes.chip}/>
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}>
                            {users.map(function (user) {
                                if (user.username !== currentUser.username) {
                                    return (<MenuItem key={user.username} value={user}>{user.username}</MenuItem>)
                                }
                            })}
                        </Select>

                        <FormHelperText id="my-helper-text">{noMembersText}</FormHelperText>
                    </FormControl>
                    {/* Somehow autocomplete feature shows list behind the dialog. commented out

          <Autocomplete
            multiple
            options={filteredUsers}
            getOptionLabel={user => user.username}
            defaultValue={[]}
            input={<Input id="select-multiple-chip" />}
            value={members}
            onChange={handleMembersChange}
            filterSelectedOptions
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Users"
                placeholder="Username"
                margin="normal"
                fullWidth
              />
            )}
          /> */}
                </form>
            </CardContent>
            <CardContent>
                <CustomButton onClick={createGroup}>Accept</CustomButton>
            </CardContent>
        </Card>
    )
}


export default function CreateGroupDialog(props) {
    const classes = useStyles()

    const users = props.users
    const open = props.open
    // Handler to notify when it is time to close the dialog.
    const closeHandler = props.closeHandler

    // handler that should get notified when we create a group
    const groupCreatedListener = props.groupCreatedListener

    // the current user that is logged in
    const user = props.currentUser

    // all the groups currently in the system
    const groups = props.groups

    return (
        <div>
            <Dialog className={classes.dialogPaper} maxWidth="md" fullWidth={true} open={open} onClose={closeHandler}
                    TransitionComponent={Transition} scroll='body'>
                <AppBar className={classes.appBar}>

                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Create a new group</Typography>
                        <Button color="inherit" onClick={closeHandler}>
                            Cancel
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContents className={classes.dialogPaper} users={users} currentUser={user}
                                groupCreatedListener={groupCreatedListener}
                                closeHandler={closeHandler}/>

            </Dialog>
        </div>
    )
}
