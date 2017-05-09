import React, {Component} from 'react';
import { TabPanel, Container } from '@extjs/ext-react';
import { Tree } from '@extjs/ext-react-treegrid';
import store from './Store';

export default class TreeDecorationsExample extends Component {

    defaults = {
        rootVisible:false,
        shadow: true,
        store:store
    }

    render(){
        return(
            <TabPanel>
                <Container layout="fit" title="Row Lines">
                    <Tree 
                        {...this.defaults}
                        header={false}
                        rowLines
                    />
                </Container>
                <Container layout="fit" title="Single Expand">
                    <Tree 
                        {...this.defaults}
                        header={false}
                        singleExpand
                    />
                </Container>
            </TabPanel>
        )
    }
}