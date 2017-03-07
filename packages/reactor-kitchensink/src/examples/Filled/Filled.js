import React, { Component } from 'react';
import { Panel, Polar } from '@extjs/reactor/modern';
import ChartToolbar from '../Charts/ChartToolbar';
import generateData from './generateData';

export default class Filled extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    });

    state = {
        numRecords: 15,
        theme: 'default'
    }

    refreshData = () => {
        this.store.loadData(generateData(this.state.numRecords));
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') });
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refreshData}
                    theme={theme}
                />
                <Polar
                    interactions="rotate"
                    legend={{ type: 'sprite' }}
                    store={this.store}
                    theme={theme}
                    series={[{
                        type: 'radar',
                        title: 'G1',
                        xField: 'id',
                        yField: 'g1',
                        style: {
                            lineWidth: 4,
                            fillOpacity: 0.3
                        }
                    }, {
                        type: 'radar',
                        title: 'G2',
                        xField: 'id',
                        yField: 'g2',
                        style: {
                            lineWidth: 4,
                            fillOpacity: 0.3
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'radial',
                        fields: ['g1', 'g2'],
                        grid: true,
                        style: {
                            estStepSize: 20
                        },
                        limits: {
                            value: 500,
                            line: {
                                strokeStyle: 'red',
                                lineDash: [6, 3],
                                title: {
                                    text: 'Limit #1'
                                }
                            }
                        }
                    }, {
                        type: 'category',
                        position: 'angular',
                        margin: 20,
                        fields: 'id',
                        grid: true,
                        style: {
                            estStepSize: 2
                        },
                        limits: [{
                            value: 12,
                            line: {
                                strokeStyle: 'green',
                                lineWidth: 3,
                                lineDash: [6, 3],
                                title: {
                                    text: 'Limit #2',
                                    fontSize: 14
                                }
                            }
                        }, {
                            value: 7,
                            line: {
                                strokeStyle: 'green',
                                lineWidth: 3
                            }
                        }]
                    }]}
                />
            </Panel>
        )
    }

}