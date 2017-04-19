import React from 'react';
import { TabPanel, Container } from '@extjs/ext-react';

export default function BasicTabsExample() {
    return (
        <TabPanel 
            flex={1}
            shadow 
            defaults={{
                cls: "card",
                layout: "center"
            }}
        >
            <Container title="Tab 1">
                <div>By default, tabs are aligned to the top of a view.</div>
            </Container>
            <Container title="Tab 2">
                <div>A TabPanel can use different animations by setting <code>layout.animation.</code></div>
            </Container>
            <Container title="Tab 3">
                <span className="action">User tapped Tab 3</span>
            </Container>
        </TabPanel>
    )
}