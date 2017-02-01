import React from 'react';
import { TitleBar, TabPanel, Panel, Component, Container, Toolbar, Button, List, SearchField } from '@extjs/reactor/modern';
import { highlightBlock } from 'highlightjs';
import code from './code';

require('highlightjs/styles/atom-one-light.css');

export default class Layout extends React.Component {
    
    constructor() {
        super();
        this.codePanels = [];
        this.navStore = Ext.create('Ext.data.Store', {
            data: Object.keys(code).map(entry => {
                return { name: entry, path: '/' + entry };
            })
        });
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }
    
    highlightCode() {
        for (let el of this.refs.examples.el.query('.code')) {
            highlightBlock(el);
        }
    }

    filterNav(field, value) {
        this.navStore.clearFilter();
        this.navStore.filterBy(record => value === '' || record.get('name').toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    render() {
        const { router, children, location } = this.props;
        const files = code[location.pathname.slice(1)];

        return (
            <Panel layout={{type: 'hbox', align: 'stretch'}} bodyPadding="0">
                <TitleBar docked="top">
                    <div className="ext-sencha"/>
                    Ext JS Reactor Kitchen Sink
                </TitleBar>
                <List
                    width={250}
                    store={this.navStore}
                    itemTpl="{name}"
                    onSelect={(select, record) => router.push(record.get('path'))}
                    shadow={true}
                    selection={this.navStore.findRecord('path', location.pathname)}
                    emptyText="No items found."
                >
                    <SearchField ref="search" docked="top" onChange={this.filterNav.bind(this)} style="padding: 5px" placeHolder="Filter..."/>
                </List>
                <Container layout="fit" margin="20" flex={4}>{ children }</Container>
                { files && (
                    <TabPanel 
                        flex={3}
                        bodyPadding="0"
                        shadow={true}
                        ref="examples"
                    >
                        { files.map((file, i) => (
                            <Panel 
                                key={i}
                                scrollable={true}
                                title={file.file}
                                layout="fit"
                                html={'<pre><code class="code jsx">' + file.content.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>'}
                            />
                        ))}
                    </TabPanel>
                )}
            </Panel>
        );
    }
}

