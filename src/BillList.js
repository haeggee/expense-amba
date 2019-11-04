import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Button, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ServerInterface from "./ServerInterface"

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

export function BillList(props) {
    const classes = useStyles();
    const { group, value, index } = props;

    const [changed, setChanged] = useState(false)

    const deleteBillHandler = bill => {
        return () => {
            ServerInterface.requestBillDeletion(bill)
            setChanged(!changed)
        }
    }
    return (
        <div className={classes.container} hidden={index !== value}>
            {group.bills.length !== 0 ? group.bills.map((bill) => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                        >
                            <Typography className={classes.firstheading}>
                                {bill.title} <br/>
                                <span className={classes.subtitle}>paid by: <strong>{bill.payer.name}</strong></span>
                            </Typography>
                            <Typography className={classes.secondheading}>
                                CAD${bill.amount} <br/>
                                <span className={classes.subtitle}>{bill.date.toDateString()}</span>
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Divider />
                            <Typography className={classes.description}> Paid for: {/*bill.toPayeesString()*/} </Typography>
                            <ul>{bill.payees.map((payee, index) => {
                                return (
                                    <li>
                                        {payee.name}: CAD${(bill.amount / bill.payees.length).toFixed(2)}
                                    </li>
                                )
                            })}
                            </ul>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button onClick={deleteBillHandler(bill)} color="primary"> Delete </Button>
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
