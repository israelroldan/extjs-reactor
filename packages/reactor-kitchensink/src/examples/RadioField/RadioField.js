import React from 'react';
import { FormPanel, RadioField, FieldSet } from '@extjs/reactor/modern';

const radioProps = {
    name: 'color',
    labelAlign: 'right',
    labelWidth: 'auto'
};

export default function RadioFieldExample() {
    return (
        <FormPanel shadow>
            <FieldSet title="Favorite Color" layout={{type: 'vbox', align: 'left'}}>
                <RadioField {...radioProps} label="Red" value="red"/>
                <RadioField {...radioProps} label="Blue" value="blue"/>
                <RadioField {...radioProps} label="Green" value="green"/>
                <RadioField {...radioProps} label="Purple" value="purple"/>
            </FieldSet>
        </FormPanel>
    )
}