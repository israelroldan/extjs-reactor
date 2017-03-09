import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TitleBar, Container, NestedList } from '@extjs/reactor/modern';
import hljs, { highlightBlock } from 'highlightjs';
import NavTree from './NavTree';
import Files from './Files';
import Home from './Home';

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

    onNavChange(node) {
        if (node.isLeaf()) {
            const { router, location } = this.props;
            const path = `/${node.getId()}`;
            if (location.pathname !== path) router.push(path)
        }
    }

    render() {
        const { 
            selectedNavNode, 
            component, 
            onSelectComponent, 
            navStore, 
            mode, 
            files,
            children
        } = this.props;

        console.log('children', children);

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
                            { React.createElement(component) }
                        </Container>
                    ) }
                </NestedList>
            )
        } else {
            // desktop + tablet layout
            mainView = (
                <Container layout="fit" flex={4}>
                    <TitleBar docked="top">
                        <div className="ext ext-sencha" style={{marginRight: '7px', fontSize: '20px'}}/>
                        ExtReact Kitchen Sink
                    </TitleBar>
                    <Container layout={{type: 'hbox', align: 'stretch'}} flex={1}>
                        <NavTree 
                            width={250} 
                            store={navStore} 
                            selection={selectedNavNode}
                            onSelectionChange={(tree, node) => this.onNavChange(node)}
                        /> 
                        { component ? <Container layout="fit" flex={1} margin={30}>{ React.createElement(component) }</Container> : <Home flex={1}/> }
                    </Container>
                </Container>             
            )
        }

        return (
            <Container layout={{type: 'hbox', align: 'stretch'}} cls="main-background">
                { mode !== 'docs' && mainView }
                { !Ext.os.is.Phone && files && <Files files={files} mode={mode} /> }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    return {  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)