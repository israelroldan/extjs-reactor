import React, { Component } from 'react';
import { Container } from '@extjs/ext-react';
import { Cartesian } from '@extjs/ext-react-charts';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

export default class Stacked extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    })

    state = {
        theme: 'default',
        numRecords: 7
    }

    changeTheme = theme => this.setState({ theme })

    refreshData = () => {
        this.store.loadData(createData(this.state.numRecords));
    }

    toggleZoomOnPan = (zoomOnPan) => {
        this.refs.chart.getInteraction('panzoom').setZoomOnPan(zoomOnPan);
    }

    onStackedToggle = button => {
        this.refs.chart.getSeries()[0].setStacked(button.getValue() === 0);
        this.refs.chart.redraw();
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onRefreshClick={this.refreshData}
                    onThemeChange={this.changeTheme}
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    onStackGroup={this.onStackedToggle}
                    theme={theme}
                />
                <Cartesian
                    shadow
                    ref="chart"
                    store={this.store}
                    theme={theme}
                    insetPadding="20 20 10 10"
                    legend={{
                        type: 'sprite',
                        position: 'bottom'
                    }}
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
                    }]}
                    series={[{
                        type: 'bar',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                        title: ['Apples', 'Oranges', 'Bananas', 'Plums', 'Mangos', 'Pears'],
                        stacked: true,
                        style: {
                            minGapWidth: 15
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6']
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: 'name'
                    }]}
                />
            </Container>
        )
    }
}