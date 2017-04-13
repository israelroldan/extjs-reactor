import React, { Component } from 'react';
import { Cartesian, Panel } from '@extjs/ext-react';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class BasicColumnChartExample extends Component {

    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: [
            'month',
            'high',
            'low',
            {
                name: 'highF',
                calculate: function (data) {
                    return data.high * 1.8 + 32;
                }
            },
            {
                name: 'lowF',
                calculate: function (data) {
                    return data.low * 1.8 + 32;
                }
            }
        ]
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData());
    }

    changeTheme = theme => this.setState({ theme })

    toggleZoomOnPan = (zoomOnPan) => {
        this.refs.chart.getInteraction('panzoom').setZoomOnPan(zoomOnPan);
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Cartesian
                    ref="chart"
                    insetPadding="50 10 0 10"
                    platformConfig={{
                        desktop: {
                            insetPadding: '50 40 20 40'
                        }
                    }}
                    store={this.store}
                    theme={theme}
                    interactions={[{
                        type: 'itemedit',
                        tooltip: {
                            renderer: this.onEditTipRender
                        },
                        renderer: this.onColumnEdit
                    }, {
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
                    }]}
                    series={{
                        type: 'bar',
                        xField: 'month',
                        yField: 'highF',
                        style: {
                            minGapWidth: 15
                        },
                        highlight: {
                            strokeStyle: 'black',
                            fillStyle: 'gold'
                        },
                        label: {
                            field: 'highF',
                            display: 'insideEnd',
                            renderer: value => value.toFixed(1)
                        }
                    }}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        minimum: 30,
                        titleMargin: 20,
                        title: {
                            text: 'Temperature in °F'
                        },
                        listeners: {
                            rangechange: this.onAxisRangeChange
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        visibleRange: [0, 0.5],
                        platformConfig: {
                            desktop: {
                                visibleRange: [0, 1]
                            }
                        }
                    }]}
                    sprites={{
                        type: 'text',
                        text: 'Redwood City Climate Data',
                        fontSize: 22,
                        width: 100,
                        height: 30,
                        x: 30, // the sprite x position
                        y: 30  // the sprite y position
                    }}
                    onAfterRender={this.onAfterRender}
                    onBeginItemEdit={this.onBeginItemEdit}
                    onEndItemEdit={this.onEndItemEdit}
                />
            </Panel>            
        )
    }

    onAxisRangeChange = (axis, range) => {
        var chart = axis.getChart(),
            store = chart.getStore(),
            sum = 0,
            mean;

        store.each(function (rec) {
            sum += rec.get('highF');
        });

        mean = sum / store.getCount();

        axis.setLimits({
            value: mean,
            line: {
                title: {
                    text: 'Average high: ' + mean.toFixed(2) + '°F'
                },
                lineDash: [2,2]
            }
        });
    }

    itemAnimationDuration = 0

    onColumnEdit = (chart, data) => {
        var threshold = 65,
            delta = 20,
            yValue = data.target.yValue,
            coldness;

        if (yValue < threshold) {
            coldness = Ext.Number.constrain((threshold - yValue) / delta, 0, 1);
            return {
                fillStyle: 'rgba(133, 231, 252, ' + coldness.toString() + ')'
            };
        } else {
            return {
                fillStyle: 'none'
            };
        }
    }

    // Disable item's animaton for editing.
    onBeginItemEdit = (chart, interaction, item) => {
        var itemsMarker = item.sprite.getMarker(item.category),
            fx = itemsMarker.getTemplate().fx; // animation modifier

        this.itemAnimationDuration = fx.getDuration();
        fx.setDuration(0);
    }

    // Restore item's animation when editing is done.
    onEndItemEdit = (chart, interaction, item, target) => {
        var itemsMarker = item.sprite.getMarker(item.category),
            fx = itemsMarker.getTemplate().fx;

        fx.setDuration(this.itemAnimationDuration);
    }

    // The 'target' here is an object that contains information
    // about the target value when the drag operation on the column ends.
    onEditTipRender = (tooltip, item, target, e) => {
        tooltip.setHtml('Temperature °F: ' + target.yValue.toFixed(1));
    }

    onAfterRender = () => {
        var me = this,
            chart = me.refs.chart,
            axis = chart.getAxis(0),
            store = chart.getStore();

        function onAxisRangeChange() {
            me.onAxisRangeChange(axis);
        }

        store.on({
            datachanged: onAxisRangeChange,
            update: onAxisRangeChange
        });

        Ext.Viewport.on('orientationchange', me.updateChartTitle, me);
        me.updateChartTitle();
    }
}