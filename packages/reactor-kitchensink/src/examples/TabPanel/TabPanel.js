import React from 'react';
import { TabPanel, Panel, Component } from '@extjs/reactor/modern';

export default function TabPanelExample() {
    return (
        <TabPanel height={300} width={500} shadow={true}>
            <Panel title="Tab 1">
                <Component html="Tab 1 content"/>
            </Panel>
            <Panel title="Tab 2">
                <Component html="Tab 2 content"/>
            </Panel>
        </TabPanel>
    )
}