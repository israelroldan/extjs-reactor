import React from 'react';
import { ViewPort, TitleBar, TabPanel, Panel, Component, Container, Toolbar, Button, List, SearchField } from '@extjs/reactor/modern';
import { highlightBlock } from 'highlightjs';
import code from './code';
import 'highlightjs/styles/atom-one-light.css';

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
                <Container layout={{type: 'hbox', align: 'stretch'}} cls="main-background">
                    <Container layout="fit" flex={4}>
                        <TitleBar docked="top">
                            <div className="ext-sencha"/>
                            Ext JS Reactor Kitchen Sink
                        </TitleBar>
                        <Container layout={{type: 'hbox', align: 'stretch'}} flex={1}>
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
                            <Container layout="fit" flex={1} margin={30}>{ children }</Container>
                        </Container>
                    </Container>
                    { files && (
                        <TabPanel 
                            title="Code"
                            flex={2}
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
                </Container>
        );
    }
}

