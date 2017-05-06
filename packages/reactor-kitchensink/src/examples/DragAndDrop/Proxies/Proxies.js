import React, { Component } from 'react';
import { Panel } from '@extjs/ext-react';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Proxies extends Component {

    state = {
        noneText: 'No Proxy'
    }

    render() {
        const {noneText} = this.state;
        return (
            <Panel 
                ref="mainPanel" 
                padding={5} 
                shadow
            >
                <div ref="none" className="proxy-none proxy-source">{noneText}</div>
                <div ref="original" className="proxy-original proxy-source">Element as proxy with revert: true</div>
                <div ref="placeholder" className="proxy-placeholder proxy-source">Placeholder</div>
            </Panel>
        )
    }

    componentDidMount() {
        this.sources = [
            // No proxy, just track the mouse cursor
            new Ext.drag.Source({
                element: this.refs.none,
                constrain: this.refs.mainPanel.el,
                proxy: 'none',
                listeners: {
                    dragmove: (source, info) => {
                        const pos = info.proxy.current,
                            noneText = Ext.String.format('X: {0}, Y: {1}', Math.round(pos.x), Math.round(pos.y));

                        this.setState({ noneText });
                    },
                    dragend: () => {
                        this.setState({ noneText: 'No Proxy' });
                    }
                }
            }),

            // Use the drag element as the proxy. Animate it back into position on drop.
            new Ext.drag.Source({
                element: this.refs.original,
                revert: true,
                constrain: this.refs.mainPanel.el,
                proxy: 'original'
            }),

            // Leave the drag element in place and create a custom placeholder.
            new Ext.drag.Source({
                element: this.refs.placeholder,
                constrain: this.refs.mainPanel.el,
                proxy: {
                    type: 'placeholder',
                    cls: 'proxy-drag-custom',
                    html: 'Custom'
                }
            })
        ];
    }

    componentWillUnmount() {
        this.sources.forEach(Ext.destroy.bind(Ext));
    }
}