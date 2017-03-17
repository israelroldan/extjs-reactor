import React, { Component } from 'react';
import { ViewPort, Panel, Button, EdgeMenu } from '@extjs/reactor/modern';

export default class MenuExample extends Component {

    constructor() {
        super();
    }

    state = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };

    menus = [];
    
    componentDidUpdate() {
        if (this.state.left) {
            Ext.Viewport.showMenu('left');
        } 
        else if(this.state.right){
            Ext.Viewport.showMenu('right');
        }
        else if(this.state.top){
            Ext.Viewport.showMenu('top');
        }
        else if(this.state.bottom){
            Ext.Viewport.showMenu('bottom');
        }
        else {
            Ext.Viewport.hideMenu('left');
            Ext.Viewport.hideMenu('right');
            Ext.Viewport.hideMenu('top');
            Ext.Viewport.hideMenu('bottom');
        }
    }

    render() {
        const { left, right, top, bottom } = this.state;
        
        return (
            <Panel>
                <EdgeMenu side="left" displayed={left} modal={false} onHide={() => this.setState({ left: false })}>
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={() => this.setState({left: false})}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={() => this.setState({left: false})}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={() => this.setState({left: false})}/>
                </EdgeMenu>
                <EdgeMenu side="right" displayed={right} modal={false} onHide={() => this.setState({ right: false })}>
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={() => this.setState({right: false})}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={() => this.setState({right: false})}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={() => this.setState({right: false})}/>
                </EdgeMenu>
                <EdgeMenu side="top" cover displayed={top} modal={true} onHide={() => this.setState({ top: false })}>
                    <Button text="Settings" iconCls="x-fa fa-gear" handler={() => this.setState({top: false})}/>
                    <Button text="New Item" iconCls="x-fa fa-pencil" handler={() => this.setState({top: false})}/>
                    <Button text="Star" iconCls="x-fa fa-star" handler={() => this.setState({top: false})}/>
                </EdgeMenu>
                <EdgeMenu side="bottom" slide displayed={bottom} modal={true} onHide={() => this.setState({ bottom: false })}>
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
