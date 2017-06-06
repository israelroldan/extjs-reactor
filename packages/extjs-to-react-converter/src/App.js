import React, { Component } from 'react'
import { Container, TextAreaField, Panel, Toolbar, Button, TitleBar, Spacer } from '@extjs/ext-react';
import transpile from './transpile';
import prettier from 'prettier-standalone';
import Clipboard from 'clipboard';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.
Ext.require([
    'Ext.Toast'
]);

function format(output) {
    return prettier.format(output, {
        printWidth: 30,
        tabWidth: 4
    }).replace(/;\s*$/, '');
}

/**
 * The main application view
 */
export default class App extends Component {

    state = {
        output: '<Container>Hello World</Container>',
        input: `
{
    xtype: 'grid',
    hidden: true,
    flex: 1,
    layout: { type: 'hbox', align: 'stretch' },
    listeners: {
        show: 'onShow',
        hide: function() {
            foo()
        }
    },
    items: [{ 
        xtype: 'toolbar', 
        items: [{
            xtype: 'button',
            text: 'Click Me',
        }]
    }],
    columns: [{
        dataIndex: 'firstName',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }]
}
        `.trim()
    }

    componentDidMount() {
        Ext.fly(this.sourceField).focus();
        this.onSourceChange(this.state.input);
        new Clipboard('.copy-btn', { target: () => this.outputField })
    }

    onSourceChange = (input) => {
        try {
            this.setState({ input, output: transpile(input), error: null })
        } catch (e) {
            this.setState({ input, error: e.message })
        }
    }

    render() {
        const { input, output, error } = this.state;

        return (
            <Container fullscreen layout="hbox">
                <TitleBar docked="top" title="Ext JS to React Converter"/>
                <Container flex={1} layout="fit" style={{ borderWidth: "0 1px 0 0", borderStyle: "solid", borderColor: "#CCC" }}>
                    <Toolbar docked="top">Ext JS</Toolbar>
                    <textarea 
                        style={styles.code}
                        value={input} 
                        placeholder="Paste Ext JS code here..." 
                        ref={field => this.sourceField = field} 
                        onChange={e => this.onSourceChange(e.target.value)} 
                    />
                </Container>
                <Container flex={1} layout="fit" scrollable>
                    <Toolbar docked="top"> 
                        <div>React</div>
                        <Spacer/>
                        <Button 
                            align="right" 
                            text="Copy" 
                            iconCls="x-fa fa-clipboard"
                            handler={() => Ext.toast('Copied to clipboard')}
                            className="copy-btn"
                        />
                    </Toolbar>
                    <textarea 
                        style={{ ...styles.code, color: error ? 'red' : '', whiteSpace: error ? 'pre-wrap' : 'pre' }}
                        value={error || format(output)}
                        ref={field => this.outputField = field}
                        readOnly
                    />
                </Container>
            </Container>
        )
    }
    
}

const styles = {
    code: {
        fontFamily: 'courier',
        whiteSpace: 'pre',
        height: '100%',
        width: '100%',
        fontSize: '14px',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        padding: '10px'
    }
}