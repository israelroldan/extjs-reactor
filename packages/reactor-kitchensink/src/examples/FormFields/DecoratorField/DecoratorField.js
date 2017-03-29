import React, { Component } from 'react';
import { DecoratorField, FormPanel, RadioField, Container } from '@extjs/reactor/modern';

export default class DecoratorFieldExample extends Component {

    render() {
        return (
            <FormPanel layout="form" shadow defaults={{ labelAlign: 'left' }}>
                <Foo label="Priority" layout="hbox">
                    <RadioField boxLabel="Low" name="priority"/>
                    <RadioField boxLabel="Medium" name="priority"/>
                    <RadioField boxLabel="Hight" name="priority"/>
                </Foo>
            </FormPanel>
        )
    }

}