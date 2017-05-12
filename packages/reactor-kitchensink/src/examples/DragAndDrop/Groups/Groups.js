import React, { Component } from 'react';
import { Panel } from '@extjs/ext-react';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Groups extends Component {
    
    render() {
        return (
            <Panel 
                ref="mainPanel"
                padding={5}
                shadow
            >
                <div className="group1">
                    <div ref="src1" className="group-source-group1 group-source">group1</div>
                    <div ref="src2" className="group-source-group2 group-source">group2</div>
                    <div ref="srcb" className="group-source-both group-source">group1, group2</div>
                </div>

                <div className="group2">
                    <div ref="tar1" className="group-target-group1 group-target">group1</div>
                    <div ref="tar2" className="group-target-group2 group-target">group2</div>
                    <div ref="tarb" className="group-target-both group-target">group1, group2</div>
                </div>
            </Panel>
        )
    }

    createSource = (cfg) => new Ext.drag.Source(Object.assign(cfg, {
        constrain: this.refs.mainPanel.el,
        proxy: {
            type: 'placeholder',
            cls: 'group-proxy',
            invalidCls: 'group-proxy-invalid',
            validCls: 'group-proxy-valid',
            html: 'Drag'
        }
    }))

    componentDidMount() {
        this.sources = [
            this.createSource({
                id: 'group1-source',
                element: this.refs.src1,
                // This source will only interact with targets that belong to group1
                groups: 'group1'
            }),
            this.createSource({
                id: 'group2-source',
                element: this.refs.src2,
                // This source will only interact with targets that belong to group2
                groups: 'group2'
            }),
            this.createSource({
                id: 'both-source',
                element: this.refs.srcb,
                // This source will only interact with targets that belong to group1 or group2
                groups: ['group1', 'group2']
            }),
            
            new Ext.drag.Target({
                id: 'group1-target',
                element: this.refs.tar1,
                // This target will only interact with sources that belong to group1
                groups: 'group1'
            }),
            new Ext.drag.Target({
                id: 'group2-target',
                element: this.refs.tar2,
                // This target will only interact with sources that belong to group2
                groups: 'group2'
            }),
            new Ext.drag.Target({
                id: 'both-target',
                element: this.refs.tarb,
                // This target will only interact with sources that belong to group1 or group2
                groups: ['group1', 'group2']
            })
        ];
    }

    componentWillUnmount() {
        this.sources.forEach(Ext.destroy.bind(Ext));
    }
}