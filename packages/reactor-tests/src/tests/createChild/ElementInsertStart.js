import React, { Component } from 'react';
import { Panel, Button, Container } from '@extjs/ext-react';

export default class ElementInsertStart extends Component {

    state = {
        showInserted: false
    }

    insert = () => {
        this.setState({ showInserted: true })
    }

    render() {
        const { showInserted } = this.state;

        return (
            <Panel>
                { showInserted && <div id="inserted">inserted</div> }
                <Container>top</Container>
                <Button handler={this.insert} text="Insert" itemId="insert"/>
                <Container>bottom</Container>
            </Panel>
        )
    }

}

