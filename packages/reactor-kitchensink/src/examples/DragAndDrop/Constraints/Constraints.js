import React, { Component } from 'react';
import { Panel } from '@extjs/ext-react';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Constraints extends Component {

    render() {
        return (
            <Panel
                padding={5}
                shadow
                ref="mainPanel"
            >
                <div ref="dragCt" className="dand-constraints-dragCt">
                    <div ref="toParent" className="dand-constraints-item dand-constraints-to-parent">To parent</div>
                </div>

                <div ref="vertical" className="dand-constraints-item dand-constraints-vertical">Vertical</div>
                <div ref="horizontal" className="dand-constraints-item dand-constraints-horizontal">Horizontal</div>
                
                <div ref="snap" className="dand-constraints-item dand-constraints-snap">snap: 60,50</div>
            </Panel>
        )
    }

    componentDidMount() {
        this.sources = [
            // Constrain to direct parent
            new Ext.drag.Source({
                element: this.refs.toParent,
                constrain: {
                    // True means constrain to parent element.
                    element: true
                }
            }),

             // Allow only vertical dragging. Constrain to the owner Panel.
            new Ext.drag.Source({
                element: this.refs.vertical,
                constrain: {
                    element: this.refs.mainPanel.el,
                    vertical: true
                }
            }),

            // Allow only horizontal dragging. Constrain to the owner Panel.
            new Ext.drag.Source({
                element: this.refs.horizontal,
                constrain: {
                    element: this.refs.mainPanel.el,
                    horizontal: true
                }
            }),

            // Snap drag to a [30, 50] grid. Constrain to the owner panel.
            new Ext.drag.Source({
                element: this.refs.snap,
                constrain: {
                    element: this.refs.mainPanel.el,
                    snap: {
                        x: 60,
                        y: 50
                    }
                }
            })
        ];
    }

    componentWillUnmount() {
        this.sources.forEach(Ext.destroy.bind(Ext));
    }
}