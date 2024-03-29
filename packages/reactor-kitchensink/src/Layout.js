import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { TitleBar, Container, NestedList, Panel, Button, Transition } from '@extjs/ext-react';
import hljs, { highlightBlock } from 'highlightjs';
import NavTree from './NavTree';
import NavView from './NavView';
import Files from './Files';
import * as actions from './actions';
import Breadcrumbs from './Breadcrumbs';

Ext.require('Ext.panel.Collapser');

class Layout extends Component {

    componentDidMount() {
        if (Ext.os.is.Phone) {
            const node = this.props.selectedNavNode;

            if (node) {
                /**
                 * Let's go to the parent's node without animation.
                 * This is so when someone hits the back button in the toolbar,
                 * they are taken to the correct list they would expect.
                 *
                 * This likely happened when someone is deep linking into
                 * the application without user interaction
                 * (changing hash manually or first visiting via bookmark).
                 */   
                const nav = this.refs.phoneNav;
                const anim = nav.getLayout().getAnimation();
                anim.disable();
                
                if(node.isLeaf()) {
                    nav.goToLeaf(node);
                } else {
                    nav.goToNode(node);
                }

                anim.enable();
            }
        }
    }

    componentDidUpdate(previousProps) {
        if(Ext.os.is.Phone) {
            const node = this.props.selectedNavNode;
            const nav = this.refs.phoneNav;

            if (node && previousProps.selectedNavNode !== node) {
                if (node.isLeaf()) {
                    nav.goToLeaf(node);
                } else {
                    nav.goToNode(node);
                }
            }
        }
    }

    onNavChange = (nodeId) => {
        if(nodeId === '' || nodeId) {
            location.hash = nodeId;
        }
    }

    onTitleClick = () => {
        location.hash = '/';
    }

    render() {
        const { 
            selectedNavNode, 
            component, 
            navStore, 
            files,
            children,
            showCode,
            showTree,
            actions,
            layout
        } = this.props;

        const example = component && React.createElement(component);

        if (Ext.os.is.Phone) {
            // phone layout
            return (
                <NestedList 
                    ref="phoneNav"
                    store={navStore} 
                    title='<i class="ext ext-sencha" style="position: relative; top: 1px; margin-right: 4px"></i> ExtReact Kitchen Sink'
                    onItemTap={(self, list, index, target, node) => this.onNavChange(node && node.getId())}
                    onBack={(self, node) => {
                        // There is no easy way to grab the node that will be used after NestedList switches to previous List.
                        // The 'node' here will always be the 'previous' node, which means we can just strip the last /* from the 
                        // node's ID and use that as the new nav URL.
                        this.onNavChange(node && node.getId().replace(/\/[^\/]*$/, ''))
                    }}
                    fullscreen
                >
                    <Container rel="detailCard" layout="fit">
                        { component && (
                            <Container key={selectedNavNode.get('text')} layout={layout} scrollable={layout==='auto'} autoSize={layout !== 'fit'}>
                                { layout === 'fit' ? example : <Container scrollable={layout==='center'}>{ example }</Container> }
                            </Container>
                        ) }
                    </Container>
                </NestedList>
            )
        } else {
            // desktop + tablet layout
            return (
                <Container layout="hbox" cls="main-background" fullscreen>
                    <Container layout="fit" flex={4}>
                        <TitleBar docked="top" shadow style={{zIndex: 2}}>
                            <Button 
                                align="left"
                                iconCls="x-fa fa-bars" 
                                handler={actions.toggleTree}
                            />
                            <div className="ext ext-sencha" style={{margin: '0 5px 0 7px', fontSize: '20px', width: '20px'}}/>
                            <a href="#" className="app-title">ExtReact Kitchen Sink</a>
                        </TitleBar>
                        <Container layout="fit" flex={1}>
                            <NavTree 
                                docked="left"
                                width="300"
                                resizable={{
                                    edges: 'east',
                                    dynamic: true
                                }}
                                store={navStore} 
                                selection={selectedNavNode}
                                onSelectionChange={(tree, node) => this.onNavChange(node && node.getId())}
                                collapsed={!showTree}
                            /> 
                            <Breadcrumbs docked="top" node={selectedNavNode}/>
                            <Transition type="slide" bindDirectionToLocation padding="30">
                                { component ? (
                                    <Container layout={layout} scrollable key={selectedNavNode.id} autoSize={layout !== 'fit'}>
                                        { layout === 'fit' ? (
                                            <Container padding="30" layout="fit">{ example }</Container> 
                                        ) : (
                                            example 
                                        )}
                                    </Container>
                                ) : selectedNavNode ? (
                                    <NavView key={selectedNavNode.id} node={selectedNavNode}/>
                                ) : null }
                            </Transition>
                        </Container>
                    </Container>
                    { files && (
                        <Button 
                            align="right" 
                            iconCls={'x-font-icon ' + (showCode ? 'md-icon-close' : 'md-icon-code') }
                            ui="fab" 
                            top={Ext.os.is.Desktop ? 20 : 35}
                            right={21}
                            zIndex={1000}
                            handler={actions.toggleCode} 
                        />
                    )}
                    { files && (
                        <Panel 
                            resizable={{ edges: 'west', dynamic: true }} 
                            flex={2}
                            layout="fit" 
                            collapsed={!showCode}
                            header={false}
                            collapsible={{ direction: 'right' }}
                            shadow 
                            style={{zIndex: 3}}
                            hideAnimation={{type: 'slideOut', direction: 'right', duration: 100, easing: 'ease' }}
                            showAnimation={{type: 'slideIn', direction: 'left', duration: 100, easing: 'ease' }}
                        >
                            <Files files={files} /> 
                        </Panel>
                    )}
                </Container>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)