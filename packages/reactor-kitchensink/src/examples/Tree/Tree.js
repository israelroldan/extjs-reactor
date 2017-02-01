import React, { Component } from 'react';
import { Tree } from '@extjs/reactor/modern';
import data from './data';

Ext.require('Ext.app.ViewModel');

export default class TreeExample extends Component {

    constructor() {
        super();
        this.store = Ext.create('Ext.data.TreeStore', {
            rootVisible: true,
            root: data
        })
    }

    render() {
        return (
            <Tree
                width={350}
                height={400}
                store={this.store}
                shadow={true}
            />
        )
    }
}