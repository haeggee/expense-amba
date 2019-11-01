import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Container, List, ListItemText, ListItem, Button, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
    return (
        <div className={classes.container} hidden={index !== value}>
            {group.bills !== undefined ? group.bills.map((bill) => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                        >
                            <Typography className={classes.firstheading}>
                                {bill.title}
                                <div className={classes.subtitle}>paid by: <strong>{bill.payer.name}</strong></div>
                            </Typography>
                            <Typography className={classes.secondheading}>
                                CAD${bill.amount}
                                <div className={classes.subtitle}>{bill.date.toDateString()}</div>
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Divider />
                            <Typography className={classes.description}> Paid for: {/*bill.toPayeesString()*/} </Typography>
                            <List>{bill.payees.map((payee) => {
                                return (
                                    <ListItem>
                                        <ListItemText>
                                            {payee.name}: CAD${(bill.amount / bill.payees.length).toFixed(2)}
                                        </ListItemText>
                                    </ListItem>
                                )
                            })}
                            </List>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button> Edit </Button>
                            <Button color="primary"> Delete </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                )
            }) : <Container>
                    <Typography variant="body1">
                        No bills yet. Be the first to add one!
                </Typography>
                </Container>
            }
        </div>)

}


export default BillList;
