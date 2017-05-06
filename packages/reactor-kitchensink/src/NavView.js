import React from 'react';

import { Container } from '@extjs/ext-react';

export default function NavView({ node }) {

    function onClick(e, path) {
        Ext.get(e.target).ripple(e, {});
        requestAnimationFrame(() => location.hash = path, 50)
    }

    return (
        <Container layout="center" padding="20" scrollable>
            <div style={{textAlign: 'center'}}>
                { node && node.childNodes.map((child, i) => (
                    <div key={i} className="app-thumbnail" onClick={e => onClick(e, child.id)}>
                        <div className="app-thumbnail-icon-wrap">
                            <div className="app-thumbnail-icon icon-charts"></div>
                        </div>
                        <div className="app-thumbnail-text">{child.data.text}</div>
                        {child.data.premium && <div className="x-fa fa-star app-premium-indicator"/>}
                    </div>
                )) }
            </div>
        </Container>
    )
}