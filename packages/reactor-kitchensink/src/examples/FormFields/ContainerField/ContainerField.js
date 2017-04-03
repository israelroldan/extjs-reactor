import React, { Component } from 'react';
import { ContainerField, FormPanel, RadioField, Container, Panel, CheckBoxField } from '@extjs/reactor/modern';

export default class ContainerFieldExample extends Component {

    render() {
        return (
            <Container layout="vbox" padding="10">
                <Panel ui="instructions" margin="0 0 20 0" maxWidth="500" shadow>
                    <div><b>ContainerField</b> allows you to apply a single label to multiple fields. This is especially useful for groups of checkboxes, radio buttons, and other compound fields.</div>
                </Panel>
                <FormPanel layout="form" shadow defaults={{labelAlign: 'left', labelTextAlign: 'right'}}>
                    <ContainerField label="Class" layout="hbox">
                        <RadioField boxLabel="Compact" name="priority"/>
                        <RadioField boxLabel="Mid-size" name="priority"/>
                        <RadioField boxLabel="SUV" name="priority"/>
                    </ContainerField>
                    <ContainerField label="Options" layout="hbox">
                        <CheckBoxField boxLabel="A/C"/>
                        <CheckBoxField boxLabel="Leather"/>
                        <CheckBoxField boxLabel="Nav"/>
                    </ContainerField>
                </FormPanel>
            </Container>
        )
    }

}