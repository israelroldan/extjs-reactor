
import React, { Component } from 'react';
import { SliderField, Gauge, FormPanel } from '@extjs/reactor/modern';

export default class GaugeExample extends Component {

    constructor() {
        super();
        this.state = {
            value: 40
        }
    }

    updateGauges(slider, value) {
        this.setState({ value })
    }

    render() {
        const { value } = this.state;

        return (
            <FormPanel shadow layout="vbox">
                <SliderField label="Value" onChange={this.updateGauges.bind(this)} value={value}/>
                <Gauge flex={1} value={value} height="200" width="200"/>
                <Gauge flex={1} value={value} ui="green" trackStart={180} trackLength={360} height="200" width="200"/>
            </FormPanel>
        )
    }

}