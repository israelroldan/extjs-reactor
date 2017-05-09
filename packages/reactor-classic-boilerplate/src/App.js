import * as React from 'react';
import { Component } from 'react';
import { reactify } from '@extjs/reactor';

import { Panel, TabPanel } from '@extjs/reactor/classic';


export default class App extends Component {
    constructor(p, c) {
        super(p, c)
        this.state = {
            focus: 3,
            items: [
                {id: 0, text: 'example'},
                {id: 1, text: 'example'},
                {id: 2, text: 'example'},
                {id: 3, text: 'example'}
            ]
        }
    }

    switchFocus(nextPanel) {
        this.setState({focus: nextPanel ? `tab${nextPanel.config.itemId}` : null})
    }

    closeItem(id) {
        this.setState(state => ({items: state.items.filter(item => item.id !== id)}))
    }

    render() {
        return (
            <Panel>
                <TabPanel activeTab={this.state.focus}
                          onBeforeTabChange={(tabPanel, nextPanel) => this.switchFocus(nextPanel)}>
                    {this.state.items.map(item => (
                        <Panel key={item.id}
                               title={item.text}
                               itemId={`tab${item.id}`}
                               closable={true}
                               layout="fit"
                               onBeforeClose={() => {
                                   this.closeItem(item.id)
                                   return false
                               }}
                        >
                            <Panel>{item.text}</Panel>
                            <Panel>{item.text}</Panel>
                        </Panel>
                    ))}
                </TabPanel>
            </Panel>
        )
    }
}

