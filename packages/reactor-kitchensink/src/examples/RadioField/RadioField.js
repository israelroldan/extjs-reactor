import React from 'react';
import { FormPanel, RadioField, FieldSet } from '@extjs/reactor/modern';

const radioProps = {
    name: 'color'
};

export default function RadioFieldExample() {
    return (
        <FormPanel shadow>
            <FieldSet title="Favorite Color" layout={{type: 'vbox', align: 'left'}}>
                <RadioField {...radioProps} boxLabel="Red" value="red"/>
                <RadioField {...radioProps} boxLabel="Blue" value="blue"/>
                <RadioField {...radioProps} boxLabel="Green" value="green"/>
                <RadioField {...radioProps} boxLabel="Purple" value="purple"/>
            </FieldSet>
        </FormPanel>
    )
}