import React, { Component } from 'react';
import { Polar, Panel } from '@extjs/reactor/modern';
import data from './data';
import ChartToolbar from '../Charts/ChartToolbar';

Ext.require([
    'Ext.chart.series.Scatter',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
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
            <Panel shadow height={560} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Polar
                    insetPadding="40 40 60 40"
                    store={this.store}
                    theme={theme}
                    interactions={[
                        'rotate'
                    ]}
                    sprites={[{
                        type: 'text',
                        text: 'Radar Charts - Basic',
                        fontSize: 22,
                        width: 100,
                        height: 30,
                        x: 12, // the sprite x position
                        y: 30  // the sprite y position
                    }, {
                        type: 'text',
                        text: 'Data: Browser Stats 2012 - Internet Explorer',
                        fontSize: 10,
                        x: 12,
                        y: 480
                    }, {
                        type: 'text',
                        text: 'Source: http://www.w3schools.com/',
                        fontSize: 10,
                        x: 12,
                        y: 495
                    }]}
                    series={[{
                        type: 'radar',
                        angleField: 'month',
                        radiusField: 'data1',
                        style: {
                            opacity: 0.80
                        },
                        highlight: {
                            fillStyle: '#000',
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'radial',
                        fields: 'data1',
                        renderer: 'onAxisLabelRender',
                        grid: true,
                        minimum: 0,
                        maximum: 25,
                        majorTickSteps: 4
                    }, {
                        type: 'category',
                        position: 'angular',
                        grid: true
                    }]}
                />
            </Panel>
        )
    }
}