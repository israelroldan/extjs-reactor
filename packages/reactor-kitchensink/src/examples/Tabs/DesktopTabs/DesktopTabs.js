import React from 'react';
import { TabPanel, Container } from '@extjs/ext-react';

export default function DesktopTabsExample() {
    return (
        <TabPanel 
            flex={1}
            shadow 
            defaults={{
                cls: "card",
                layout: "center",
                tab: {
                    flex: 0,
                    minWidth: 100
                }
            }}
            tabBar={{
                layout: {
                    pack: 'left'
                }
            }}
        >
            <Container title="Tab 1">
                <div>When optimizing for desktops, you may want to tabs on the left side of the tab bar.  You can do this by setting <code>pack: 'left'</code> in the tab bar's layout config.</div>
            </Container>
            <Container title="Tab 2">
                <span className="action">User tapped Tab 2</span>
            </Container>
            <Container title="Tab 3">
                <span className="action">User tapped Tab 3</span>
            </Container>
        </TabPanel>
    )
}