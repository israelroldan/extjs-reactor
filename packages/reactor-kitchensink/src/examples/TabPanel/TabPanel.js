import React from 'react';
import { TabPanel, Panel } from '@extjs/reactor/modern';

export default function TabPanelExample() {
    return (
        <TabPanel height={300} width={500} shadow={true}>
            <Panel title="Tab 1">
                Tab 1 content
            </Panel>
            <Panel title="Tab 2">
                Tab 2 content
            </Panel>
        </TabPanel>
    )
}