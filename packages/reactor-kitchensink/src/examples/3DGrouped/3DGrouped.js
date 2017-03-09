import React, { Component } from 'react';
import { Panel, Cartesian } from '@extjs/reactor/modern';
import ChartToolbar from '../Charts/ChartToolbar';

export default class Grouped extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['quarter', '2013', '2014'],
        data: [
            { quarter: 'Q1', 2013: 42000, 2014: 68000},
            { quarter: 'Q2', 2013: 50000, 2014: 85000},
            { quarter: 'Q3', 2013: 53000, 2014: 72000},
            { quarter: 'Q4', 2013: 63000, 2014: 89000}
        ]
    })

    onResize = () => {
        const chart = this.refs.chart,
            width = chart.getSize().width,
            surface = chart.getSurface('chart');

        surface.get('title').setAttributes({ x: width / 2 });
        surface.get('subtitle').setAttributes({ x: width / 2 });
        surface.renderFrame();
    }

    onAxisLabelRender = (axis, label, layoutContext) => {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        const value = layoutContext.renderer(label) / 1000;
        return value === 0 ? '$0' : Ext.util.Format.number(value, '$0K');
    }

    render() {
        return (
            <Panel shadow layout="fit">
                <ChartToolbar downloadChartRef={this.refs.chart}/>
                <Cartesian
                    ref="chart"
                    store={this.store}
                    onResize={this.onResize}
                    theme="Muted"
                    insetPadding="70 40 0 10"
                    interactions="itemhighlight"
                    animation={{ duration: 200 }}
                    legend={{ type: 'sprite' }}
                    sprites={[{
                        type: 'text',
                        id: 'title',
                        text: 'Sales in Last Two Years',
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        y: 30
                    }, {
                        type: 'text',
                        id: 'subtitle',
                        text: 'Quarter-wise comparison',
                        textAlign: 'center',
                        fontSize: 16,
                        y: 50
                    }]}
                    axes={[{
                        type: 'numeric3d',
                        position: 'left',
                        fields: ['2013', '2014'],
                        grid: true,
                        title: 'Sales in USD',
                        renderer: this.onAxisLabelRender
                    }, {
                        type: 'category3d',
                        position: 'bottom',
                        fields: 'quarter',
                        title: 'Quarter',
                        grid: true
                    }]}
                    series={[{
                        type: 'bar3d',
                        stacked: false,
                        title: ['Previous Year', 'Current Year'],
                        xField: 'quarter',
                        yField: ['2013', '2014'],
                        label: {
                            field: ['2013', '2014'],
                            display: 'insideEnd',
                            renderer: value => Ext.util.Format.number(value / 1000, '$0K')
                        },
                        highlight: true
                    }]}
                />
            </Panel>
        )
    }
}