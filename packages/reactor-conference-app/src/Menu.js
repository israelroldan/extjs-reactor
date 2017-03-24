import React, { Component, PropTypes } from 'react';
import { EdgeMenu, TreeList, Panel } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { toggleMenu } from './actions';

class Menu extends Component {

    static propTypes = {
        onSelect: PropTypes.func
    };

    onHide = () => {
        this.props.dispatch(toggleMenu(false))
    };

    onSelectionChange = (tree, record) => {
        this.props.onSelect(record.getId());
        this.props.dispatch(toggleMenu(false));
    }

    render() {
        const { store, displayed, dispatch, selection } = this.props;

        const menu = (
            <TreeList
                key="menu"
                ui="nav"
                width="250"
                store={store}
                selection={selection}
                onSelectionChange={this.onSelectionChange}
            />            
        );

        if (Ext.platformTags.desktop) {
            return (
                <Panel docked="left" margin="20 0 0 0">
                    {menu}
                </Panel>
            )
        } else {
            return (
                <EdgeMenu side="left" scrollable displayed={displayed} onHide={this.onHide}>
                    <div className="app-menu-header">ExtReact Conference</div>
                    {menu}
                </EdgeMenu>
            )
        }
    }

}

const mapStateToProps = ({ root }) => {
    return {
        store: root.navStore,
        selection: root.selectedNavNode,
        displayed: root.showMenu
    }
}

export default connect(mapStateToProps)(Menu);