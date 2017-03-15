import React, { Component } from 'react';
import { Container } from '@extjs/reactor/modern';

export default class RippleExample extends React.Component {

    render() {
        return (
            <Container scrollable layout="center">
                <Container layout="vbox">
                    <div 
                        onClick={event => Ext.fly(event.target).ripple({ event })} 
                        style={styles.rippleTarget}
                    >I ripple when clicked.</div>

                    <Container 
                        style={styles.rippleTarget}
                        ripple={{ }}
                        margin="30 0 0 0"
                    >Any ExtReact component can also have a ripple.</Container>
                </Container>
            </Container>
        )
    }

}

const styles = {
    rippleTarget: {
        position: 'relative', // this is required for ripples to be properly constrained to the target element
        height: '150px',
        width: '300px', 
        lineHeight: '150px',                       
        textAlign: 'center',
        backgroundColor: 'white',
        cursor: 'pointer',
        whiteSpace: 'wrap',
        border: '2px dashed #D0D0D0'
    }
}