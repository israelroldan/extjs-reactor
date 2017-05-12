import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Time',
    'Ext.chart.series.CandleStick',
    'Ext.chart.interactions.Crosshair'
]);

export default class CandlestickChartExample extends Component {

    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['time', 'open', 'high', 'low', 'close']
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData(1000));
    }

    changeTheme = theme => this.setState({ theme })

    toggleZoomOnPan = (zoomOnPan) => {
        this.toggleCrosshair(false);
        this.panzoom.setZoomOnPan(zoomOnPan);
    }

    toggleCrosshair = (crosshair) => {
        this.panzoom.setEnabled(!crosshair);
        this.crosshair.setEnabled(crosshair)
    }

    componentDidMount() {
        const chart = this.refs.chart;
        this.panzoom = chart.getInteraction('panzoom');
        this.crosshair = chart.getInteraction('crosshair');
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    onToggleCrosshair={this.toggleCrosshair}
                    onRefreshClick={this.refresh}
                    theme={theme}
                    onlyMidnight
                />
                <Cartesian
                    shadow
                    ref="chart"
                    store={this.store}
                    theme={theme}
                    interactions={[{
                        type: 'panzoom',
                        axes: {
                            left: {
                                allowPan: false,
                                allowZoom: false
                            },
                            bottom: {
                                allowPan: true,
                                allowZoom: true
                            }
                        }
                    }, {
                        type: 'crosshair',
                        axes: {
                            label: {
                                fillStyle: 'white'
                            },
                            rect: {
                                fillStyle: '#344459',
                                opacity: 0.7,
                                radius: 5
                            }
                        }
                    }]}
                    series={{
                        type: 'candlestick',
                        xField: 'time',
                        openField: 'open',
                        highField: 'high',
                        lowField: 'low',
                        closeField: 'close',
                        style: {
                            barWidth: 10,
                            opacity: 0.9,
                            dropStyle: {
                                fill: 'rgb(237,123,43)',
                                stroke: 'rgb(237,123,43)'
                            },
                            raiseStyle: {
                                fill: 'rgb(55,153,19)',
                                stroke: 'rgb(55,153,19)'
                            }
                        }
                    }}
                    axes={[{
                        type: 'numeric',
                        fields: ['open', 'high', 'low', 'close'],
                        position: 'left',
                        maximum: 1000,
                        minimum: 0
                    }, {
                        type: 'time',
                        fields: ['time'],
                        position: 'bottom',
                        visibleRange: [0, 0.3],
                        style: {
                            axisLine: false
                        }
                    }]}
                />
            </Container>            
        )
    }
}