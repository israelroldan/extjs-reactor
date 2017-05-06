import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { ChartNavigator } from '@extjs/ext-react-charts';
import createData from './createData';
import ChartToolbar from '../ChartToolbar';

Ext.require([
    'Ext.chart.series.Line',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Time',
    'Ext.chart.navigator.Container'
]);

export default class NavigatorExample extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: [ 'x', 'sin', 'cos' ],
        data: createData()
    });

    state = {
        theme: 'default'
    };

    changeTheme = theme => this.setState({ theme })

    toggleZoomOnPan = (zoomOnPan) => {
        this.getChart().getInteraction('panzoom').setZoomOnPan(zoomOnPan);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            this.getChart().setTheme(this.state.theme);
        }
    }

    getChart() {
        return this.refs.navigator.getChart()
    }

    categoryRenderer = (axis, value) => Math.round(value * 180 / Math.PI)

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    theme={theme}
                />
                <ChartNavigator
                    shadow
                    ref="navigator"
                    navigator={{ axis: 'bottom' }}
                    chart={{
                        xtype: 'cartesian',
                        reference: 'chart',
                        insetPadding: '20 10 10 10',
                        platformConfig: {
                            phone: {
                                insetPadding: '10 5 0 0'
                            }
                        },
                        interactions: {
                            type: 'panzoom',
                            zoomOnPanGesture: false,
                            axes: {
                                left: {
                                    allowPan: false,
                                    allowZoom: false
                                }
                            }
                        },
                        legend: {
                            type: 'sprite'
                        },
                        store: this.store,
                        axes: [{
                            type: 'numeric',
                            position: 'left',
                            grid: true
                        }, {
                            id: 'bottom',
                            type: 'category',
                            position: 'bottom',
                            grid: true,
                            renderer: this.categoryRenderer,
                            label: {
                                rotation: {
                                    degrees: -90
                                }
                            }
                        }],
                        series: [{
                            type: 'line',
                            title: 'sin',
                            xField: 'x',
                            yField: 'sin',
                            marker: {
                                type: 'triangle',
                                fx: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            highlight: {
                                scaling: 2
                            }
                        }, {
                            type: 'line',
                            title: 'cos',
                            xField: 'x',
                            yField: 'cos',
                            marker: {
                                type: 'cross',
                                fx: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            highlight: {
                                scaling: 2
                            }
                        }],
                    }}
                />
            </Container>
        )
    }
}