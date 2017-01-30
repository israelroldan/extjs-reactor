import React from 'react';
import { Panel } from '@extjs/reactor/modern';

export default function PanelExample() {
    return (
        <Panel 
            shadow={true} 
            title="Panel" 
            html="Panel Body" 
            height={300}
            width={500}
        />
    )
}