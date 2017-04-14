import React, {Component} from 'react';
import { TabPanel, Tree} from '@extjs/ext-react';
import store from './Store';

export default class TreeDecorationsExample extends Component {

    defaults = {
        rootVisible:false,
        store:store
    }

    render(){
        return(
            <TabPanel>
                <Tree 
                    {...this.defaults}
                    title="Tree with Row Lines" 
                    rowLines
                />
                <Tree 
                    {...this.defaults}
                    title="Only One Expanded Node"
                    singleExpand
                />
            </TabPanel>
        )
    }
}