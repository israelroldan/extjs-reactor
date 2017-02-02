
import React, { Component } from 'react';
import { SliderField, Gauge, Panel } from '@extjs/reactor/modern';

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
            <Panel shadow={true} layout="vbox">
                <SliderField label="Value" onChange={this.updateGauges.bind(this)} value={value}/>
                <Gauge flex={1} value={value}/>
                <Gauge flex={1} value={value} ui="green" trackStart={180} trackLength={360}/>
            </Panel>
        )
    }

}