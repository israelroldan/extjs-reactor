import React, { Component } from 'react';
import { Cartesian, Panel } from '@extjs/reactor/modern';
import data from './data';
import ChartToolbar from '../Charts/ChartToolbar';

Ext.require([
    'Ext.chart.series.Line',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Time'
]);

export default class BasicScatterChartExample extends Component {
    
    store = Ext.create('Ext.data.Store', {
        data
    });

    state = {
        theme: 'default'
    };

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') })
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Cartesian
                    insetPadding="40 40 60 40"
                    store={this.store}
                    theme={theme}
                    series={{
                        type: 'line',
                        xField: 'time',
                        yField: 'value'
                    }}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: 'value',
                        title: 'USD to Euro'
                    }, {
                        type: 'time',
                        dateFormat: 'Y-m-d',
                        position: 'bottom',
                        fields: 'time',
                        title: 'Date'
                    }]}
                />
            </Panel>
        )
    }
}