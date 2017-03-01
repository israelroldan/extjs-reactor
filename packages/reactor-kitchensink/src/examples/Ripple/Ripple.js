import React, { Component } from 'react';
import { Container } from '@extjs/reactor/modern';

export default class RippleExample extends React.Component {

    render() {
        return (
            <Container>
                <div onClick={e => Ext.fly(e.target).ripple()}>Click Me</div>
            </Container>
        )
    }

}