import React, { Component } from 'react';
import { ContainerField, FormPanel, RadioField, Container, Panel, CheckBoxField, TextField } from '@extjs/ext-react';

export default class ContainerFieldExample extends Component {

    render() {
        return (
            <Container layout="vbox" padding="10" maxWidth="600">
                <Panel ui="instructions" margin="0 0 20 0" shadow>
                    <div><b>ContainerField</b> allows you to apply a single label to multiple fields. This is especially useful for groups of checkboxes, radio buttons, and other compound fields.</div>
                </Panel>
                <FormPanel layout="form" shadow padding="20" defaults={{labelAlign: 'left', labelTextAlign: 'right'}}>
                    <ContainerField label="Name" layout="hbox" defaults={{flex: 1}}>
                        <TextField label="First"/>
                        <TextField label="Middle"/>
                        <TextField label="Last"/>
                    </ContainerField>
                    <ContainerField label="Vehicle Class" layout="vbox">
                        <RadioField boxLabel="Compact" name="priority"/>
                        <RadioField boxLabel="Mid-size" name="priority"/>
                        <RadioField boxLabel="SUV" name="priority"/>
                    </ContainerField>
                    <ContainerField label="Options" layout="vbox">
                        <CheckBoxField boxLabel="A/C"/>
                        <CheckBoxField boxLabel="Leather"/>
                        <CheckBoxField boxLabel="Nav"/>
                    </ContainerField>
                </FormPanel>
            </Container>
        )
    }

}