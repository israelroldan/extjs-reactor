import React, { Component } from 'react';
import { TabPanel, Panel } from '@extjs/ext-react'; 

Ext.require('Ext.layout.overflow.Scroller');

export default class ScrollingTabsExample extends Component {

    render() {
        return (
            <TabPanel 
                shadow 
                tabBar={{
                    layout: {
                        pack: 'start',
                        overflow: 'scroller'
                    }
                }} 
                platformConfig={{
                    "!phone": {
                        height: 600,
                        width: 400 
                    }
                }}
                defaults={{
                    layout: "center",
                    cls: 'card',
                    bodyPadding: 20,
                    tab: {
                        minWidth: 130
                    }
                }}
            >
                <Panel title="Home">
                    <div>You can set <code>{`layout: { overflow: 'scroller' }`}</code> on the <code>tabBar</code> prop in combination with a <code>minWidth</code> on each tab to make the tab bar scroll when it runs out of room.</div>
                </Panel>
                <Panel title="Politics"><div>Politics</div></Panel>
                <Panel title="Entertainment"><div>Entertainment</div></Panel>
                <Panel title="World"><div>World</div></Panel>
                <Panel title="Markets"><div>Markets</div></Panel>
                <Panel title="Sports"><div>Sports</div></Panel>
            </TabPanel>
        )
    }

}