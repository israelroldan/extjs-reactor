import React, { Component } from 'react';
import { ViewPort, Panel, Button, Menu } from '@extjs/reactor/modern';
import EdgeMenu from './EdgeMenu';

export default class MenuExample extends Component {

    constructor() {
        super();
        this.menus = [];
        
        this.state = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
    }

    componentDidMount() {
        Ext.Viewport.setMenu({
            xtype: 'menu',
            modal: false,
            items: [{
                iconCls: 'fa fa-gear',
                text: 'Settings'
            }]
        }, {
            side: 'left',
            reveal: true
        });
    }

    componentDidUpdate() {
        if (this.state.left) {
            Ext.Viewport.showMenu('left');
        } else {
            Ext.Viewport.hideMenu('left');
        }
    }

    render() {
        const { left, right, top, bottom } = this.state;
        
        return (
            <Panel>
                {/*<Menu ref="menu" modal={false}>
                    <Button text="Settings" iconCls="fa fa-gear" handler={() => this.setState({left: false})}/>
                    <Button text="New Item" iconCls="fa fa-pencil" handler={() => this.setState({left: false})}/>
                    <Button text="Star" iconCls="fa fa-star" handler={() => this.setState({left: false})}/>
                </Menu>*/}
                <div><b>Ext.Menu</b> is a component which allows you to easily display slidingmenus from any side of the screen.</div>
                <br/>
                <br/>
                <div>You can show the menus by either tapping the buttons below,or by swiping from the edge of the screen.</div>
                <Button handler={() => this.setState({ left: true })} text="Toggle left menu (reveal)"/>
            </Panel>
        )
    }
}
