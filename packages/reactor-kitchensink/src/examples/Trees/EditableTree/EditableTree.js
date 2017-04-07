import React, { Component } from 'react';
import { Tree, TreeColumn, TextColumn } from '@extjs/reactor/modern';
import store from './Store.js';

export default class EditableTreeExample extends Component {

    render(){
        return (
            <Tree
                title="Editable Tree"
                height={400}
                width={600}
                plugins={[{type:'grideditable'}]}
                store={store}
            >
                <TreeColumn 
                    text="Name"
                    dataIndex="text"
                    flex={1}
                    editable
                />
                <TextColumn
                    text="Class Name"
                    dataIndex="className"
                    flex={1}
                    editable
                />
            </Tree>
        )
    }
}