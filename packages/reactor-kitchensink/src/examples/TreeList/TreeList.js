import React, { Component } from 'react';
import { Panel, TreeList, Toolbar, SegmentedButton, Button } from '@extjs/reactor/modern';
import data from './data';

export default class TreeListExample extends Component {

    constructor() {
        super();

        this.store = Ext.create('Ext.data.TreeStore', {
            rootVisible: true,
            root: data
        });

        this.state = {
            nav: false,
            micro: false,
            width: undefined
        };
    }

    toggleNav(button, nav) {
        this.setState({ nav });
    }

    toggleMicro(button, micro) {
        this.setState({ 
            micro, 
            nav: micro || this.state.nav,
            width: micro ? 56 : undefined
        });
    }

    render() {
        const { micro, nav, width } = this.state;

        return (
            <Panel title="TreeList" shadow={true} layout="fit">
                <Toolbar docked="top">
                    <SegmentedButton allowMultiple={true}>
                        <Button text="Nav" pressed={nav} onPressedChange={this.toggleNav.bind(this)} disabled={micro}/>
                        <Button text="Micro" pressed={micro} onPressedChange={this.toggleMicro.bind(this)}/>
                    </SegmentedButton>
                </Toolbar>

                <TreeList      
                    ref="tree"  
                    width={width}
                    expanderOnly={false}
                    store={this.store}
                    micro={micro}
                    ui={nav ? 'nav' : null}
                />
            </Panel>
        )
    }
}