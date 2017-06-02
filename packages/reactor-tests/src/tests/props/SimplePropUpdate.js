import React, { Component } from 'react';
import { Button } from '@extjs/ext-react';

export default class SimplePropUpdate extends Component {

    state = { count: 0 };

    increment = () => this.setState({ count: this.state.count + 1 });

    render() {
        return (
            <Button itemId="button" text={`Count: ${this.state.count}`} handler={this.increment}/>
        )
    }
    
}