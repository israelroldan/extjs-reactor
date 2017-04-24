import React from 'react';
import { Toolbar, Button, Component } from '@extjs/ext-react';

export default function Breadcrumbs(props) {
    let { node, router } = props;
    const items = [];

    do {
        items.unshift(<Button key={node.id} text={node.get('text')} handler={router.push.bind(router, node.id)}/>);
        
        if (node.parentNode) {
            items.unshift(<div key={node.id + '>'} className="x-font-icon md-icon-keyboard-arrow-right" style={{fontSize: '20px', color: '#666'}}/>);
        }
    } while (node = node.parentNode)

    return (
        <Toolbar {...props} padding="4 16">
            {items}
        </Toolbar>
    )
}