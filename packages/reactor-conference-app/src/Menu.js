import React, { Component, PropTypes } from 'react';
import { EdgeMenu, TreeList, Panel, TitleBar, Button } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { toggleMenu } from './actions';

class Menu extends Component {

    static propTypes = {
        onSelect: PropTypes.func
    };

    onHide = () => {
        this.props.dispatch(toggleMenu(false))
    };

    onToggleMenuClick = () => {
        this.props.dispatch(toggleMenu());
    };

    onSelectionChange = (tree, record) => {
        if (record) this.props.onSelect(record.getId());
        this.props.dispatch(toggleMenu(false));
    };

    render() {
        const { store, displayed, dispatch, selection, title } = this.props;

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

        return (
            <EdgeMenu side="left" scrollable displayed={displayed} onHide={this.onHide}>
                <div className="app-menu-header">ExtReact Conference</div>
                {menu}
            </EdgeMenu>
        )
    }

}

const mapStateToProps = ({ root }) => {
    return {
        store: root.navStore,
        selection: root.selectedNavNode,
        displayed: root.showMenu,
        title: root.title
    }
}

export default connect(mapStateToProps)(Menu);