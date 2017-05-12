import React, { Component } from 'react';
import { Tree, TreeColumn } from '@extjs/ext-react-treegrid';
import store from './Store';

export default class CellEditingTreeExample extends Component {

    render(){
        return (
            <Tree 
                title="Cell Editing Tree"
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