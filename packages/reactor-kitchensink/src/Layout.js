import React, { Component } from 'react';
import { TitleBar, TabPanel, Panel, Container, Button, NestedList } from '@extjs/reactor/modern';
import hljs, { highlightBlock } from 'highlightjs';
import code from './code';
import examples from './examples';
import NavTree from './NavTree';

// JSX syntax highlighting
import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
hljs.registerLanguage('js', H_js);

function codeClassFor(file)  {
    if (file.endsWith('.css')) {
        return 'css';
    } else {
        return 'js xml'
    }
}

export default class Layout extends Component {

    state = { };
    codePanels = [];

    navTreeStore = Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: examples
    });

    componentDidMount() {
        this.highlightCode();

        if (Ext.os.is.Phone) {
            const node = this.getNodeForRoute();
            if (node) this.refs.phoneNav.goToLeaf(node);
        }
    }

    componentDidUpdate() {
        this.highlightCode();
    }
    
    highlightCode() {
        if (this.refs.examples) for (let el of this.refs.examples.el.query('.code')) {
            highlightBlock(el);
        }
    }

    onNavChange(node) {
        if (!node.isLeaf()) return;
        const { router, location } = this.props;
        const path = `/${node.getId()}`;
        
        if (location.pathname !== path) {
            router.push(path)
        }
    }

    getNodeForRoute() {
        const key = this.props.location.pathname.slice(1);
        return this.navTreeStore.getNodeById(key);
    }

    createDeviceView() {
        const selectedNode = this.getNodeForRoute();
        const component = selectedNode && selectedNode.get('component');

        if (Ext.os.is.Phone) {
            // phone layout
            return (
                <NestedList 
                    ref="phoneNav"
                    store={this.navTreeStore} 
                    title='<i class="ext ext-sencha" style="position: relative; top: 1px; margin-right: 4px"></i> ExtReact Kitchen Sink'
                    onLeafItemTap={(self, list, index, target, record) => this.onNavChange(record)}
                    flex={1}
                >
                    { component && (
                        <Container rel="detailCard" layout="fit">
                            { React.createElement(component) }
                        </Container>
                    ) }
                </NestedList>
            )
        } else {
            // desktop + tablet layout
            if (selectedNode) selectedNode.parentNode.expand();

            return (
                <Container layout="fit" flex={4}>
                    <TitleBar docked="top">
                        <div className="ext ext-sencha" style={{marginRight: '7px', fontSize: '20px'}}/>
                        ExtReact Kitchen Sink
                    </TitleBar>
                    <Container layout={{type: 'hbox', align: 'stretch'}} flex={1}>
                        <NavTree 
                            width={250} 
                            store={this.navTreeStore} 
                            selection={selectedNode}
                            onSelectionChange={(tree, record) => this.onNavChange(record)}
                        /> 
                        <Container layout="fit" flex={1} margin={30}>{ component && React.createElement(component) }</Container>
                    </Container>
                </Container>             
            )
        }
    }

    render() {
        const { router, children, location } = this.props;
        const key = location.pathname.slice(1);
        const files = code[key];
        const docsMode = location.query.mode === 'docs';

        return (
            <Container layout={{type: 'hbox', align: 'stretch'}} cls="main-background">
                { !docsMode && this.createDeviceView() }
                { !Ext.os.is.Phone && files && (
                    <TabPanel 
                        tabBar={{hidden: docsMode && files.length === 1 }}
                        title="Code"
                        flex={2}
                        bodyPadding="0"
                        shadow
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
                                html={`<pre><code class="code ${codeClassFor(file.file)}">${file.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`}
                            />
                        ))}
                    </TabPanel>
                )}
            </Container>
        );
    }
}

