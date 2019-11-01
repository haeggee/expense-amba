import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    heading: {
        // more style to be added here
    }
}))

export function BillList(props) {
    const classes = useStyles();
    const { group, value, index } = props;
    return (
        <Container className={classes.container} hidden={index !== value}>
            {group.bills.map((bill) => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                        >
                            <Typography className={classes.heading}>
                                {bill.title}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography> {bill.title}, {bill.amount}, {bill.date.toString()}, {bill.payer.username}, payees implemented shortly</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
        </Container>)

}


export default BillList;
