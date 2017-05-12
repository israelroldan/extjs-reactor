import React, { Component } from 'react';
import { Tree } from '@extjs/ext-react';
import data from './data';

Ext.require('Ext.app.ViewModel');

export default class TreeExample extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: data
    })

    render() {
        return (
            <Tree store={this.store} shadow/>
        )
    }

}