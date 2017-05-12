import React, { Component } from 'react';
import { Panel } from '@extjs/ext-react';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Handles extends Component {

    render() {
        return (
            <Panel 
                ref="mainPanel" 
                padding={5}
                shadow
            >
                <div ref="handleRepeat" className="handle-repeat handle-source">
                    <div className="handle">Foo</div>
                    <div className="handle">Bar</div>
                    <div className="handle">Baz</div>
                </div>
                <div ref="drag" className="handle-handles handle-source">
                    <div className="handle">Drag</div>
                </div>
            </Panel>
        )
    }

    componentDidMount() {
        this.sources = [
            // This source uses handle to represent a repeating element,
            // so when the item is dragged, contextual information can
            // be gained from the item.
            new Ext.drag.Source({
                groups: 'repeat',
                element: this.refs.handleRepeat,
                handle: '.handle',
                constrain: this.refs.mainPanel.el,
                listeners: {
                    dragstart: (source, info) => {
                        source.getProxy().setHtml(info.eventTarget.innerHTML);
                    }
                },
                proxy: {
                    type: 'placeholder',
                    cls: 'handle-proxy'
                }
            }),

            // This source is only draggable by the handle
            new Ext.drag.Source({
                element: this.refs.drag,
                handle: '.handle',
                constrain: this.refs.mainPanel.el
            })
        ]
    }

    componentWillUnmount() {
        this.sources.forEach(Ext.destroy.bind(Ext));
    }
}