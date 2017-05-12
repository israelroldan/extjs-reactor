import React, { Component } from 'react';
import { Panel } from '@extjs/ext-react';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Data extends Component {

    render() {
        return (
            <Panel 
                ref="mainPanel" 
                padding={5}
                shadow
            >
                <div ref="source" className="data-source">
                    <div data-days="2" className="handle">Overnight</div>
                    <div data-days="7" className="handle">Expedited</div>
                    <div data-days="21" className="handle">Standard</div>
                </div>
                <div ref="target" className="data-target">Drop delivery option here</div>
            </Panel>
        )
    }

    componentDidMount() {
        // When the drag starts, the describe method is used to extract the
        // relevant data that the drag represents and is pushed into the info
        // object for consumption by the target.
        this.source = new Ext.drag.Source({
            element: this.refs.source,
            handle: '.handle',
            constrain: this.refs.mainPanel.el,
            describe: info => {
                info.setData('postage-duration', info.eventTarget.getAttribute('data-days'));
            },
            listeners: {
                dragstart: (source, info) => {
                    source.getProxy().setHtml(info.eventTarget.innerHTML);
                }
            },
            proxy: {
                type: 'placeholder',
                cls: 'data-proxy'
            }
        });

        this.target = new Ext.drag.Target({
            element: this.refs.target,
            validCls: 'data-target-valid',
            listeners: {
                drop: (target, info) => {
                    // Get the data from the info object and use it to display the expectation to the user.
                    info.getData('postage-duration').then(duration => {
                        const s = Ext.String.format('Your parcel will arrive within {0} days', duration);
                        Ext.Msg.alert('Delivery set', s);
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        Ext.destroy(this.source, this.target);
    }
}