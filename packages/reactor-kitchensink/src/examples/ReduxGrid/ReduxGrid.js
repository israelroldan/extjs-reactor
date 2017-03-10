import React, { Component } from 'react';
import { Grid, Toolbar, Container, Button } from '@extjs/reactor/modern';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './data';
import SimpleGrid from './SimpleGrid';
import { reducer } from './reducer';

Ext.require(['Ext.grid.plugin.*']);

const store = createStore(reducer);

export default class GridExample extends Component {

    render() {
        return (
            <Provider store={store}>
                <Container layout="fit">
                    <SimpleGrid />
                </Container>
            </Provider>
        )
    }
}