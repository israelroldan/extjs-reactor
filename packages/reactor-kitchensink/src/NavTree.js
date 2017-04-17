import React, { Component } from 'react';
import { Panel, SearchField, Toolbar, TreeList } from '@extjs/ext-react';

export default class NavTree extends Component {

    constructor(props) {
        super();
        addNameToNode(props.store.getRoot());
    }

    filterNav = (field, value) => {
        const { store } = this.props;
        this.filterRegex = new RegExp(`(${Ext.String.escapeRegex(value)})`, 'i');
        store.filterBy(record => this.containsMatches(record));
    }

    containsMatches(node) {
        const found = node.name.match(this.filterRegex) || node.childNodes.some(child => this.containsMatches(child));
        if (found) node.expand();
        node.data.text = node.name.replace(this.filterRegex, '<span style="color:#2196F3;font-weight:bold">$1</span>')
        return found;
    }

    render() {
        const { onSelectionChange, width, store, selection } = this.props;

        if (selection) selection.parentNode.expand();

        return (
            <Panel scrollable="y" width={width} shadow style={{zIndex: 1}}>
                <SearchField flex={1} docked="top" style={{backgroundColor: '#fafafa', padding: '5px' }} onChange={this.filterNav} />
                <TreeList
                    ui="component-tree"
                    store={store}
                    expanderFirst={false}
                    expanderOnly={false}
                    onSelectionChange={onSelectionChange}
                    selection={selection}
                />
            </Panel>        
        )
    }

}

function addNameToNode(node) {
    node.name = node.data.text;
    node.childNodes.forEach(addNameToNode);
}