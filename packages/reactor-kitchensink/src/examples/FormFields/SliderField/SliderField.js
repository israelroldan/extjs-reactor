import React, { Component } from 'react';
import { Container, FormPanel, SliderField } from '@extjs/ext-react';

export default class SliderFieldExample extends Component {

    state = {
        singleValue: 20,
        liveUpdateValue: 60,
        multipleValue: [10, 70]
    };

    onSingleChange = (field, value) => {
        this.setState({ singleValue: value });
    }

    onMultipleChange = (field, value) => {
        this.setState({ multipleValue: value });
    }

    onLiveUpdateChange = (field, value) => {
        this.setState({ liveUpdateValue: value });
    }

    render() {
        const { singleValue, multipleValue, liveUpdateValue } = this.state;

        return (
            <FormPanel shadow width="300">
                <SliderField 
                    onChange={this.onSingleChange}
                    label="Single Thumb"
                    value={singleValue}
                />
                <div style={{marginBottom: '20px'}}>Value: {singleValue}</div>
                <SliderField 
                    onChange={this.onLiveUpdateChange}
                    label="Live Update"
                    value={liveUpdateValue}
                    liveUpdate
                />
                <div style={{marginBottom: '20px'}}>Value: {liveUpdateValue}</div>
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