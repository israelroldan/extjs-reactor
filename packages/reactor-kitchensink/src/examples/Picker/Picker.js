import React, { Component } from 'react';
import { Container, Picker, Button } from '@extjs/reactor/modern';

export default class PickerExample extends Component {

    showPicker() {
        this.refs.picker.show();
    }

    render() {
        return (
            <Container>
                <Button ui="action" handler={this.showPicker.bind(this)}>Show Picker</Button>
                <Picker 
                    ref="picker"
                    slots={[
                        {
                            name: 'limit_speed',
                            title: 'Speed',
                            data: [
                                {text: '50 KB/s', value: 50},
                                {text: '100 KB/s', value: 100},
                                {text: '200 KB/s', value: 200},
                                {text: '300 KB/s', value: 300}
                            ]
                        }
                    ]}
                />
            </Container>
        )
    }
    
}