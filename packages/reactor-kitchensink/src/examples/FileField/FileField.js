import React, { Component } from 'react';
import { Container, Panel, FileField } from '@extjs/reactor/modern'

export default class SearchFieldExample extends Component {
    
    state = { };

    search = (field, value) => {
        this.setState({ file: value });
    }

    render() {
        const { file } = this.state;

        return (
            <Container layout={{ type: 'vbox', align: 'left' }}>
                <Panel shadow height="200" width="300">
                    <FileField 
                        label="Attachment"
                        value={file}
                        onChange={this.search}
                    />
                    { file && <div>You selected {file}</div> }
                </Panel>
            </Container>
        )
    }

}
