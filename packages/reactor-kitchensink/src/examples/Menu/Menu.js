import React, { Component } from 'react';
import { ViewPort, Panel, Button, Menu as EdgeMenu } from '@extjs/reactor/modern';

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
                <EdgeMenu side="left" ref="left" reveal hidden={!this.state.left} onHide={() => this.setState({ left: false })}>
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={() => this.setState({left: false})}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={() => this.setState({left: false})}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={() => this.setState({left: false})}/>
                </EdgeMenu>
                <EdgeMenu side="right" ref="right" reveal hidden={!this.state.right} onHide={() => this.setState({ right: false })}>
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={() => this.setState({right: false})}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={() => this.setState({right: false})}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={() => this.setState({right: false})}/>
                </EdgeMenu>
                <EdgeMenu side="top" ref="top" cover hidden={!this.state.top} onHide={() => this.setState({ top: false })}>
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={() => this.setState({top: false})}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={() => this.setState({top: false})}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={() => this.setState({top: false})}/>
                </EdgeMenu>
                <EdgeMenu side="bottom" ref="bottom" slide hidden={!this.state.bottom} onHide={() => this.setState({ bottom: false })}>
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={() => this.setState({bottom: false})}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={() => this.setState({bottom: false})}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={() => this.setState({bottom: false})}/>
                </EdgeMenu>
                <div><b>Ext.Menu</b> is a component which allows you to easily display slidingmenus from any side of the screen.</div>
                <br/>
                <br/>
                <div>You can show the menus by either tapping the buttons below,or by swiping from the edge of the screen.</div>
                <Button handler={() => this.setState({ left: true })} text="Toggle left menu (reveal)"/>
                <Button handler={() => this.setState({ right: true })} text="Toggle right menu (reveal)"/>
                <Button handler={() => this.setState({ top: true })} text="Toggle top menu (cover)"/>
                <Button handler={() => this.setState({ bottom: true })} text="Toggle bottom menu (slide)"/>
            </Panel>
        )
    }
}
