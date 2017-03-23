import React from 'react';
import { Container, Panel, FormPanel, TextField } from '@extjs/reactor/modern';

export default function FormLayoutExample() {
    return (
        <Container layout="vbox" padding={10}>
            <Panel shadow ui="instructions" margin="0 0 30 0">
                <div>
                    A <b>form</b> layout renders a single column of form fields, all with the same label width. 
                    The default behavior is to size all labels to the width of the label with the longest 
                    text, but the width of the labels can also be configured.
                </div>
            </Panel>
            <div style={styles.heading}>labelTextAlign="left" (default)</div>
            <FormPanel layout="form" shadow margin="0 0 30 0">
                <TextField label="First Name" labelTextAlign="left"/>
                <TextField label="Last Name" labelTextAlign="left"/>
                <TextField label="Bank Account Number" labelTextAlign="left"/>
            </FormPanel>       
            <div style={styles.heading}>labelTextAlign="right"</div>
            <FormPanel layout="form" shadow>
                <TextField label="First Name" labelTextAlign="right"/>
                <TextField label="Last Name" labelTextAlign="right"/>
                <TextField label="Bank Account Number" labelTextAlign="right"/>
            </FormPanel>       
        </Container> 
    )
}

const styles = {
    heading: {
        fontSize: '14px',
        fontFamily: 'Menlo, Courier',
        margin: '10px 0 10px 0'
    }
}