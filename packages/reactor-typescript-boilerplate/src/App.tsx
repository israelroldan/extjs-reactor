import * as React from 'react';
import { Component } from 'react';
import { Container, Panel, TitleBar } from '@extjs/ext-react';

export default class App extends Component<void, any> {
    
    render() {
        return (
            <Container fullscreen>
                <TitleBar docked="top" title="App"/>
                <Panel margin="30" shadow bodyPadding="10" title="Panel">
                    Body
                </Panel>
            </Container>
        )
    }

}