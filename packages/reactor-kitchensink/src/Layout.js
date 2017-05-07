import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { TitleBar, Container, NestedList, Panel, Button, ToolTip } from '@extjs/ext-react';
import { Transition } from '@extjs/reactor';
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
                nav.goToNode(node.parentNode);
                anim.enable();
                
                if (node.isLeaf()) {
                    nav.goToLeaf(node);
                }
            }
        }
    }

    onNavChange = (node) => {
        if (node && node.isLeaf()) {
            location.hash = node.getId();
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

        let mainView;

        const example = component && React.createElement(component);

        if (Ext.os.is.Phone) {
            // phone layout
            mainView = (
                <NestedList 
                    ref="phoneNav"
                    store={navStore} 
                    title='<i class="ext ext-sencha" style="position: relative; top: 1px; margin-right: 4px"></i> ExtReact Kitchen Sink'
                    onLeafItemTap={(self, list, index, target, node) => this.onNavChange(node)}
                    flex={1}
                >
                    { component && (
                        <Container rel="detailCard" layout="fit">
                            <Container key={selectedNavNode.get('text')} layout={layout} autoSize={layout !== 'fit'}>
                                { layout === 'fit' ? example : <Container scrollable>{ example }</Container> }
                            </Container>
                        </Container>
                    ) }
                </NestedList>
            )
        } else {
            // desktop + tablet layout
            mainView = (
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
                            store={navStore} 
                            selection={selectedNavNode}
                            onSelectionChange={(tree, node) => this.onNavChange(node)}
                            collapsed={!showTree}
                        /> 
                        <Breadcrumbs docked="top" node={selectedNavNode}/>
                        <Transition flex={1} type="slide" bindDirectionToLocation padding="30">
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
            )
        }

        return (
            <Container layout="hbox" cls="main-background" fullscreen>
                { mainView }
                { !Ext.os.is.Phone && files && (
                    <Button 
                        align="right" 
                        iconCls={'x-font-icon ' + (showCode ? 'md-icon-close' : 'md-icon-code') }
                        ui="fab app-show-code" 
                        top={Ext.os.is.Desktop ? 20 : 35}
                        right={21}
                        zIndex={1000}
                        handler={actions.toggleCode} 
                    />
                )}
                { !Ext.os.is.Phone && files && (
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

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)