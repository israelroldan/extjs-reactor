import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { TitleBar, Container, NestedList, Panel, Button } from '@extjs/ext-react';
import { Transition } from '@extjs/reactor';
import hljs, { highlightBlock } from 'highlightjs';
import NavTree from './NavTree';
import NavView from './NavView';
import Files from './Files';
import Home from './Home';
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
                nav.goToLeaf(node);
            }
        }
    }

    onNavChange = (node) => {
        if (node && node.isLeaf()) {
            const { router, location } = this.props;
            const path = node.getId();
            if (location.pathname !== path) router.push(path)
        }
    }

    onTitleClick = () => {
        this.props.router.push('/');
    }

    render() {
        const { 
            selectedNavNode, 
            component, 
            navStore, 
            mode, 
            files,
            children,
            showCode,
            showTree,
            actions,
            layout,
            router
        } = this.props;

        let mainView;

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
                            <Container key={selectedNavNode.get('text')} layout={layout === 'fit' ? 'fit' : 'auto' } scrollable={layout !== 'fit'}>
                                { React.createElement(component) }
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
                            ui="app-button-short" 
                            iconCls="x-fa fa-bars" 
                            handler={actions.toggleTree}
                            ripple={{bound: false}} 
                        />
                        <div className="ext ext-sencha" style={{marginRight: '7px', fontSize: '20px', width: '20px'}}/>
                        <a href="#" className="app-title">ExtReact Components</a>
                        { files && (
                            <Button 
                                align="right" 
                                iconCls="x-fa fa-code" 
                                ui="app-button-short" 
                                handler={actions.toggleCode} 
                                ripple={{bound: false}} 
                            /> 
                        )}
                    </TitleBar>
                    <Container layout="fit" flex={1}>
                        <NavTree 
                            docked="left"
                            store={navStore} 
                            selection={selectedNavNode}
                            onSelectionChange={(tree, node) => this.onNavChange(node)}
                            collapsed={!showTree}
                        /> 
                        <Breadcrumbs docked="top" node={selectedNavNode} router={router}/>
                        <Transition flex={1} type="slide" location={location.hash}>
                            { component ? (
                                <Container layout={layout} scrollable={layout !== 'fit'} padding="30" key={selectedNavNode.id}>
                                    { React.createElement(component) }
                                </Container>
                            ) : selectedNavNode ? (
                                <NavView key={selectedNavNode.id} node={selectedNavNode} router={router}/>
                            ) : null }
                        </Transition>
                    </Container>
                </Container>             
            )
        }

        return (
            <Container layout="hbox" cls="main-background" fullscreen>
                { mode !== 'docs' && mainView }
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
                        hideAnimation={{type: 'slideOut', direction: 'right'}}
                        showAnimation={{type: 'slideIn', direction: 'left' }}
                    >
                        <Files files={files} mode={mode} /> 
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