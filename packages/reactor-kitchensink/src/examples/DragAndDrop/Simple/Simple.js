import React, { Component } from 'react';
import { Panel } from '@extjs/ext-react';

Ext.require(['Ext.drag.*']);

export default class Simple extends Component {

    state = {
        dragText: 'Drag Me!'
    }

    onDragMove(source, info) {
        const pos = info.element.current,
            html = Ext.String.format('X: {0}, Y: {1}', Math.round(pos.x), Math.round(pos.y));

        this.setState({dragText: html});
    }

    onDragEnd(source) {
        this.setState({dragText: 'Drag Me!'});
    }

    render() {
        const {dragText} = this.state;
        return (
            <Panel 
                padding={5}
                shadow
                ref="dragContainer"
            >
                <div 
                    ref="dragItem"
                    style={{
                        width: '130px',
                        height: '130px',
                        padding: '5px',
                        textAlign: 'center',
                        color: '#fff',
                        backgroundColor: '#ff5722',
                        borderRadius: '5px',
                        userSelect: 'none',
                        cursor: 'move'
                    }}
                >
                    {dragText}
                </div>
            </Panel>
        )
    }

    componentDidMount() {
        this.source = new Ext.drag.Source({
            element: this.refs.dragItem,
            constrain: this.refs.dragContainer.el,
            listeners: {
                dragmove: this.onDragMove.bind(this),
                dragend: this.onDragEnd.bind(this)
            }
        });
    }

    componentWillUnmount() {
        Ext.destroy(this.source);
    }
}