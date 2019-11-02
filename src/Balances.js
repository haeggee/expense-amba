import React from 'react';
import ExpenseDiagram from './ExpenseDiagram';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
}))


export function Balances(props) {
    const { group, value, index } = props;
    const classes = useStyles();
    return (
        <div className={classes.container} role="tabpanel" hidden={index !== value}>
            {group.bills !== undefined ? 'TODO'
                : <Container>
                    <Typography variant="body1">
                        No bills yet. Be the first to add one!
        </Typography>
                </Container>}
        </div>
    )
}


export default Balances;
