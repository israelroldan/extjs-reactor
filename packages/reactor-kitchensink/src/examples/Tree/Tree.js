import React from 'react';
import { Tree } from '@extjs/reactor/modern';
import data from './data';

Ext.require('Ext.app.ViewModel');

export default function TreeExample() {
    const store = Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: data
    })

    return (
        <Tree
            width={350}
            height={400}
            store={store}
            shadow={true}
        />
    )
}