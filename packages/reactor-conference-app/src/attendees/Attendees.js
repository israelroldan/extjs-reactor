import React, { Component } from 'react';
import WorldMap from './WorldMap';
import { Container } from '@extjs/reactor/modern';
import AppBar from '../AppBar';

export default class Attendees extends Component {

    onSceneSetup = (svg, scene) => {
        if(svg.panZoom) {
            svg.panZoom.scale(0.5, 0.5);
        }
    }

    render() {
        return (
            <Container>
                <WorldMap
                    store={{
                        autoLoad: true,
                        fields: [{ name: 'cnt', type: 'number'}, 'Work_Country'],
                        proxy: {
                            type: 'ajax',
                            url: 'resources/countries.json',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }
                    }}
                    colorAxis={{
                        scale: {
                            type: 'log',
                            range: ['#99ccff', '#0050a1']
                        },
                        field: 'cnt'
                    }}
                    mapAxis={{
                        field: 'Work_Country',
                        hidden: !Ext.platformTags.phone
                    }}
                    interactions={Ext.platformTags.phone ? {
                        type: 'panzoom',
                        zoom: {
                            extent: [0.3, 3],
                            doubleTap: false
                        }
                    } : null}
                    legend={{
                        docked: 'right',
                        items: {
                            count: 5,
                            slice: [1],
                            reverse: true,
                            size: {
                                x: 40,
                                y: 20
                            }
                        }
                    }}
                    onScenesetup={this.onSceneSetup}
                />
            </Container>
        )
    }
}