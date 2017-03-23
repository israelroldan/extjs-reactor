import React, { Component } from 'react';
import { Panel, Cartesian } from '@extjs/reactor/modern';
import ChartToolbar from '../../ChartToolbar';
import storeData from './storeData';

export default class Spline extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['theta', 'sin', 'cos', 'tan'],
        data: storeData
    })

    state = {
        theme: 'default'
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') });
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar onThemeChange={this.changeTheme} theme={theme}/>
                <Cartesian
                    store={this.store}
                    theme={theme}
                    insetPadding="20 20 0 0"
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        title: 'Sin (Theta)',
                        grid: true,
                        fields: 'sin',
                        label: {
                            renderer: (axis, label) => Ext.util.Format.number(label, '0.00')
                        }
                    }, {
                        type: 'numeric',
                        position: 'bottom',
                        title: 'Theta',
                        grid: true,
                        fields: 'theta',
                        label: {
                            textPadding: 0,
                            rotate: {
                                degrees: -45
                            }
                        }
                    }]}
                    series={[{
                        type: 'line',
                        xField: 'theta',
                        yField: 'sin',
                        smooth: true,
                        highlight: true,
                        showMarkers: false
                    }]}
                />
            </Panel>
        )
    }
}