import React from 'react';
import { Container } from '@material-ui/core';

export function BillList(props) {
    const { group, value, index } = props;
    return (
        <Container hidden={index !== value}>
            Bills
        </Container>)

}


export default BillList;
