import React, { Component, PropTypes } from 'react';
import { TabPanel, Panel } from '@extjs/ext-react';
import hljs, { highlightBlock } from 'highlightjs';

// JSX syntax highlighting
import 'highlightjs/styles/atom-one-dark.css';
import H_js from './H_js';
hljs.registerLanguage('js', H_js);

Ext.require('Ext.panel.Resizer');

function codeClassFor(file)  {
    if (file.endsWith('.css')) {
        return 'css';
    } else {
        return 'js xml'
    }
}

export default class Files extends Component {

    static propTypes = {
        mode: PropTypes.string.isRequired,
        files: PropTypes.object
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }    

    highlightCode() {
        if (this.refs.tabs) for (let el of this.refs.tabs.el.query('.code')) {
            highlightBlock(el);
        }
    }

    render() {
        const { mode, files } = this.props;

        return (
            <TabPanel 
                ref="tabs"
                shadow
                style={{zIndex: 1}}
                tabBar={{
                    hidden: mode === 'docs' && files.length === 1,
                    layout: {
                        pack: 'left'
                    }
                }}
            >
                { Object.keys(files).map((file, i) => (
                    <Panel 
                        key={i}
                        scrollable={true}
                        title={file}
                        layout="fit"
                        ui="code-panel"
                        tab={{
                            ui: 'app-code-tab',
                            flex: 0,
                            minWidth: 120
                        }}
                        html={`<pre><code class="code ${codeClassFor(file)}">${files[file].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`}
                    />
                ))}
            </TabPanel>        
        )
    }

}
