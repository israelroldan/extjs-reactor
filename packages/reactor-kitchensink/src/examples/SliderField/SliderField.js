import React, { Component } from 'react';
import { FormPanel, SliderField } from '@extjs/reactor/modern';

export default class SliderFieldExample extends Component {

    state = {
        singleValue: 20,
        multipleValue: [10, 70]
    };

    onSingleChange = (field, value) => {
        this.setState({ singleValue: value });
    }

    onMultipleChange = (field, value) => {
        this.setState({ multipleValue: value });
    }

    render() {
        const { singleValue, multipleValue } = this.state;

        return (
            <FormPanel shadow>
                <SliderField 
                    onChange={this.onSingleChange}
                    label="Single Thumb"
                    value={singleValue}
                />
                <div style={{marginBottom: '20px'}}>Value: {singleValue}</div>
                <SliderField 
                    onChange={this.onMultipleChange}
                    label="Multiple Thumbs"
                    values={multipleValue}
                />
                <div>Values: {multipleValue.join(', ')}</div>
            </FormPanel>
        )
    }

}