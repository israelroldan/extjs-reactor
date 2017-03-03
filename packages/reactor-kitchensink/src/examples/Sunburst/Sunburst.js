import React, { Component } from 'react';
import { Panel, Tree, D3_Sunburst } from '@extjs/reactor/modern';

Ext.require(['Ext.util.Format']);

export default class Sunburst extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        defaultRootText: 'd3',
        fields: [
            'name',
            'path',
            'size',
            {
                name: 'leaf',
                calculate: function (data) {
                    return data.root ? false : !data.children;
                }
            },
            {
                name: 'text',
                calculate: function (data) {
                    return data.name;
                }
            }
        ],
        proxy: {
            type: 'ajax',
            url: 'data/tree/tree.json'
        },
        idProperty: 'path'
    })

    onTooltip = (component, tooltip, node) => {
        const record = node.data,
            size = record.get('size'),
            length = record.childNodes.length;

        tooltip.setTitle(record.get('text'));
        tooltip.setHtml(size ? 
            Ext.util.Format.fileSize(size) :
            length + ' file' + (length === 1 ? '' : 's') + ' inside.'
        );
    }

    onSelectionChange = (field, selection) => {
        if(Ext.isArray(selection)) selection = selection[0];
        this.setState({selection});
    }

    state = {
        selection: null
    }

    render() {
        const { selection } = this.state;

        return (
            <Panel shadow layout={{ type: 'hbox', align: 'stretch' }}>
                <Tree
                    width={230}
                    title="Folders"
                    store={this.store}
                    selection={selection}
                    onSelect={this.onSelectionChange}
                />
                <D3_Sunburst
                    flex={1}
                    padding={20}
                    store={this.store}
                    selection={selection}
                    tooltip={{ renderer: this.onTooltip }}
                    onSelectionChange={this.onSelectionChange}
                />
            </Panel>
        )
    }
}