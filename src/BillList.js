import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Button, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ServerInterface from "./ServerInterface"
const date = require('date-and-time')

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    firstheading: {
        // more style to be added here
        flexBasis: '80%',
        color: theme.palette.text.third,
        fontWeight: 'bold'
    },
    secondheading: {
        flexBasis: '20%',
    },
    subtitle: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.primary,
        fontWeight: 'normal'
    },
    description: {
        fontSize: theme.typography.pxToRem(14)
    }
}))

/**
 * A drop down menu containing the list of Bills. User can expand this to view more info about the bill.
 */
export function BillList(props) {
    const classes = useStyles();
    const { group, value, index, bills , members, deleteBillHandler} = props;

    const [changed, setChanged] = useState(false)

    const deleteBill = billInfo => {
        return () => {
            // get the right bill
            for (let i = 0; i <  bills.length; i ++) {
                if (bills[i]._id === billInfo._id) {
                    deleteBillHandler(bills[i])
                    setChanged(!changed)
                }
            }
        }
    }

    /*
       const deleteBillHandler = bill => {
           return () => {
              ServerInterface.requestBillDeletion(bill, () => {
                   setChanged(!changed)
               })
              ServerInterface.requestBillDeletion(bill)
           }
       }*/

    let billsInfo = []
    if (bills !== undefined) {
        // only keep the bills that are a part of this group
        for (let i = 0; i < group.bills.length; i++) {
            for (let j = 0; j < bills.length; j++) {

                // found the bill with the id we are looking for
                if (bills[j]._id === group.bills[i]) {

                    const newDate = date.format(new Date(bills[j].date), 'MMM D Y')
                    let newBillInfo = {
                        _id: bills[j]._id,
                        title: bills[j].title,
                        amount: bills[j].amount,
                        group: bills[j].group,
                        date: newDate
                    }

                    // match up with user name and payee names
                    let payees = []
                    for (let k = 0; k < members.length; k ++) {
                        if (members[k]._id === bills[j].payer) {
                            newBillInfo.payer = members[k].name
                        }
                        // check list of payees
                        for (let l = 0; l < bills[j].payees.length; l ++) {
                            if (bills[j].payees[l] === members[k]._id) {
                                payees.push(members[k].name)
                            }
                        }
                    }

                    newBillInfo.payees = payees
                    billsInfo.push(newBillInfo)
                    break
                }
            }
        }
    }

    return (
        <div className={classes.container} hidden={index !== value}>
            {billsInfo.length !== 0 ? billsInfo.map((bill) => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content">
                            <Typography className={classes.firstheading}>
                                {bill.title} <br/>
                                <span className={classes.subtitle}>paid by: <strong>{bill.payer}</strong></span>
                            </Typography>
                            <Typography className={classes.secondheading}>
                                CAD${bill.amount} <br/>
                                <span className={classes.subtitle}>{bill.date.toString()}</span>
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Divider />
                            <Typography className={classes.description}> Paid for: </Typography>
                            <ul>{bill.payees.map((payee, index) => {
                                return (
                                    <li>
                                        {payee}: CAD${(bill.amount / bill.payees.length).toFixed(2)}
                                    </li>
                                )
                            })}
                            </ul>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button onClick={deleteBill(bill)} color="primary"> Delete </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                )
            }) : <Container>
                    <Typography variant="body1">
                        No bills yet. Be the first to add one!
                </Typography>
                </Container>
            }
        </div >)

}


export default BillList;
