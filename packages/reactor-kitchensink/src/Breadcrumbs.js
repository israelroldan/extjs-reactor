import React from 'react';
import { Toolbar, Button } from '@extjs/ext-react';

export default function Breadcrumbs({ node, router }) {
    
    const items = [];

    do {
        items.unshift(<Button text={node.name} handler={router.push.bind(router, node.id)}/>);
        
        if (node.parentNode) {
            items.unshift(<div>&gt;</div>);
        }
    } while (node = node.parentNode)

    return (
        <Toolbar docked="top">
            {items}
        </Toolbar>
    )
}