import React from 'react';

import { Container } from '@extjs/ext-react';

export default function NavView({ node, router }) {

    function onClick(e, path) {
        Ext.fly(e.target).ripple(e, {});
        setTimeout(() => router.push(path), 50)
    }

    return (
        <Container layout="center">
            <div style={{textAlign: 'center'}}>
                { node && node.childNodes.map((child, i) => (
                    <div key={i} className="app-thumbnail" onClick={e => onClick(e, child.id)}>
                        <div className="app-thumbnail-icon-wrap">
                            <div className="app-thumbnail-icon icon-charts"></div>
                        </div>
                        <div className="app-thumbnail-text">{child.name}</div>
                    </div>
                )) }
            </div>
        </Container>
    )
}