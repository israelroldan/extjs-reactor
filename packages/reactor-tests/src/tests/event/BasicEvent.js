import React, { Component } from 'react';
import { Container, Button } from '@extjs/ext-react';

export default class BasicEvent extends Component {
    state = {
        message: ''
    }

    onButtonTap = () => this.setState({ message: 'tapped' })
    
    render() {
        return (
            <Container>
                <Button text="Button" itemId="button" onTap={this.onButtonTap}/>
                <div id="message">
                    {this.state.message}
                </div>
            </Container>
        )
    }
}