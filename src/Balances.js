import React from 'react';
import ExpenseDiagram from './ExpenseDiagram';
import { Container } from '@material-ui/core';


export function Balances(props) {
    const { group, value, index } = props;
     return (
        <Container role="tabpanel" hidden={index !== value}>
            Balances
        </Container>
    )
}


export default Balances;
