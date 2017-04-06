import React, { Component } from 'react';
import { Panel } from '@extjs/reactor/modern';
import './styles.css';

Ext.require(['Ext.drag.*']);

const DEFAULT_TEXT = 'Drag a file from your computer here';

export default class Files extends Component {

    state = {
        iconCls: 'drag-file-icon',
        labelText: DEFAULT_TEXT
    }

    render() {
        const {iconCls, labelText} = this.state;
        console.log('Render', this.state);
        return (
            <Panel ref="mainPanel" height={400} width={400} padding={5} shadow>
                <div ref="label" className="drag-file-label">{labelText}</div>
                <div ref="icon" className={iconCls}></div>
            </Panel>
        )
    }

    onDragEnter() {
        this.setState({
            iconCls: 'drag-file-icon active'
        });
        console.log('drageneter', this.state);
    }

    onDragLeave() {
        this.setState({
            iconCls: 'drag-file-icon'
        });
        console.log('dragleave', this.state);
    }

    onDrop(target, info) {
        const files = info.files;
        this.setState({
            iconCls: 'drag-file-icon dropped fa-spin',
            labelText: files.length > 1 ? `Dropped ${files.length} files.` : `Dropped ${files[0].name}`
        });
        console.log('drop', this.state);

        this.timer = setTimeout(() => {
            if(!this.refs.mainPanel.destroyed) {
                this.setState({
                    iconCls: 'drag-file-icon drag-file-fadeout',
                    labelText: DEFAULT_TEXT
                });
                console.log('timer', this.state);
            }

            this.timer = null;
        }, 2000);
    }

    componentDidMount() {
        this.target = new Ext.drag.Target({
            element: this.refs.mainPanel.element,
            listeners: {
                dragenter: this.onDragEnter.bind(this),
                dragleave: this.onDragLeave.bind(this),
                drop: this.onDrop.bind(this)
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        Ext.destroy(this.target);
    }
}