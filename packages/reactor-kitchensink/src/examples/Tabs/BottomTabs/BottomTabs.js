import React from 'react';
import { TabPanel, Container } from '@extjs/ext-react';

export default function BottomTabsExample() {
    return (
        <TabPanel 
            shadow
            tabBar={{ docked: 'bottom' }}
            defaults={{
                cls: "card",
                layout: "center"
            }}
        >
            <Container title="Info" iconCls="x-fa fa-info-circle">
                <div>Docking tabs to the bottom will automatically change their style.</div>
            </Container>
            <Container title="Download" iconCls="x-fa fa-download" badgeText="4">
                <div>Badges <em>(like the 4, below)</em> can be added by setting the <code>badgeText</code> prop.</div>
            </Container>
            <Container title="Favorites" iconCls="x-fa fa-star" badgeText="Overflow Test">
                <div>Badge labels will truncate if the text is wider than the tab.</div>
            </Container>
            <Container title="Bookmarks" iconCls="x-fa fa-bookmark">
                <div>Tabbars are <code>ui:"dark"</code> by default, but also have light variants.</div>
            </Container>
            <Container title="More" iconCls="x-fa fa-ellipsis-h">
                <span className="action">User tapped User</span>
            </Container>
        </TabPanel>
    )
}
