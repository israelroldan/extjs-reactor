import React, { Component } from 'react';
import { Tree, TreeColumn } from '@extjs/ext-react';
import store from './Store';

export default class CellEditingTreeExample extends Component {

    render(){
        return (
            <Tree 
                title="Cell Editing Tree"
                height={400}
                width={600}
                store={store}
                plugins={[
                    {type:'gridcellediting'}
                ]}
            >
                <TreeColumn
                    text="Name"
                    dataIndex="text"
                    flex="1"
                    editable
                />
            </Tree>
        )
    }
}