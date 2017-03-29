import React, { Component } from 'react';
import { TabPanel, Panel } from '@extjs/reactor/modern'; 

export default class ScrollingTabsExample extends Component {

    render() {
        return (
            <TabPanel 
                shadow 
                tabBar={{scrollable: true}} 
                platformConfigs={{
                    "!phone": {
                        height: 600,
                        width: 400
                    }
                }}
                defaults={{
                    layout: "center",
                    cls: 'card',
                    tab: {
                        minWidth: 110
                    }
                }}
            >
                <Panel title="Home">
                    <div>You can set <code>scrollable: true</code> in combination with a minWidth on each tab to make the tab bar scroll when it runs out of room.</div>
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