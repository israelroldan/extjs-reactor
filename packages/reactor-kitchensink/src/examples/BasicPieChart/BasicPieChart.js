import React, { Component } from 'react';
import { Polar, Panel } from '@extjs/reactor/modern';
import createData from './createData';
import ChartToolbar from '../Charts/ChartToolbar';

Ext.require([
    'Ext.chart.series.Pie'
]);

export default class BasicPieChartExample extends Component {
    
    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name'],
    });

    state = {
        theme: 'default'
    };

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') })
    }

    refresh = () => {
        this.store.loadData(createData(5));
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Polar
                    innerPadding={Ext.os.is.Desktop ? 40 : 10}
                    store={this.store}
                    theme={theme}
                    interactions={[
                        'rotate',
                        'itemhighlight'
                    ]}
                    legend={{
                        position: 'right',
                        verticalWidth: 70
                    }}
                    series={[{
                        type: 'pie',
                        xField: 'g1',
                        label: {
                            field: 'name'
                        },
                        donut: 30,
                        highlightCfg: {
                            margin: 20
                        },
                        style: {
                            stroke: 'white',
                            miterLimit: 10,
                            lineCap: 'miter',
                            lineWidth: 2
                        }
                    }]}
                />
            </Panel>
        )
    }
}