import React from 'react';
import { ViewPort, TitleBar, TabPanel, Panel, Component, Container, Toolbar, Button, List, TreeList, SearchField } from '@extjs/reactor/modern';
import hljs, { highlightBlock } from 'highlightjs';
import code from './code';
import examples from './examples';

// JSX syntax highlighting
import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
hljs.registerLanguage('js', H_js);

export default class Layout extends React.Component {
    
    constructor() {
        super();
        this.codePanels = [];

        this.navTreeStore = Ext.create('Ext.data.TreeStore', {
            rootVisible: true,
            root: examples
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

    onNavChange(node) {
        if (!node.isLeaf()) return;
        const { router, location } = this.props;
        const path = `/${node.get('text')}`;
        
        if (location.pathname !== path) {
            router.push(path)
        }
    }

    render() {
        const { router, children, location } = this.props;
        const key = location.pathname.slice(1);
        const files = code[key];
        const docsMode = location.query.mode === 'docs';
        const selectedNode = this.navTreeStore.getNodeById(key);
        const component = selectedNode && selectedNode.get('component');

        return (
            <Container layout={{type: 'hbox', align: 'stretch'}} cls="main-background">
                { !docsMode && (
                    <Container layout="fit" flex={4}>
                        <TitleBar docked="top">
                            <div className="ext-sencha"/>
                            Ext JS Reactor Kitchen Sink
                        </TitleBar>
                        <Container layout={{type: 'hbox', align: 'stretch'}} flex={1}>
                            <Container scrollable="y">
                                <TreeList
                                    ui="component-tree"
                                    style={{backgroundColor: 'white'}}
                                    width={250}
                                    store={this.navTreeStore}
                                    expanderFirst={false}
                                    expanderOnly={false}
                                    shadow
                                    onSelectionChange={(tree, record) => this.onNavChange(record)}
                                    selection={selectedNode}
                                />
                            </Container>
                            <Container layout="fit" flex={1} margin={30}>{ component && React.createElement(component) }</Container>
                        </Container>
                    </Container>
                )}
                { files && (
                    <TabPanel 
                        tabBar={{hidden: docsMode && files.length === 1 }}
                        title="Code"
                        flex={2}
                        bodyPadding="0"
                        shadow={true}
                        ref="examples"
                        style={{backgroundColor: '#282c34'}}
                    >
                        { files.map((file, i) => (
                            <Container 
                                key={i}
                                scrollable={true}
                                title={file.file}
                                layout="fit"
                                style={{backgroundColor: '#282c34'}}
                                html={'<pre><code class="code js xml">' + file.content.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>'}
                            />
                        ))}
                    </TabPanel>
                )}
            </Container>
        );
    }
}

