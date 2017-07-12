import React, { Component } from 'react';
import { Container, DatePanel } from '@extjs/ext-react';

export default class BasicDatePanelExample extends Component {

    render() {
        return (
            <Container padding={Ext.os.is.Phone ? 0 : 10} layout="fit">
                <DatePanel shadow/>
            </Container>
        )
    }
}