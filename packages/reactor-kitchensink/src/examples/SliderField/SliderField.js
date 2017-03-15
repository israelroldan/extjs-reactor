import React, { Component } from 'react';
import { Container, FormPanel, SliderField } from '@extjs/reactor/modern';

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
            <Container layout="center">
                <FormPanel shadow width="300">
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
            </Container>
        )
    }

}