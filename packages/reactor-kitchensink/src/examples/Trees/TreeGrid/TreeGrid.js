import React, { Component } from 'react';
import { NumberColumn } from '@extjs/ext-react';
import { Tree, TreeColumn } from '@extjs/ext-react-treegrid';
import root from './data';

export default class TreeGridExample extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root
    })

    render() {
        return (
            <Tree title="Tree Grid" store={this.store} shadow>
                <TreeColumn text="Name" dataIndex="text" width="200"/>
                <NumberColumn  text="# Items" dataIndex="numItems" width="100" align="center" format="0,0"/>
            </Tree>
        )
    }

}