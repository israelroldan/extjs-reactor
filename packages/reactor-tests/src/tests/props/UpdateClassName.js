import React, { Component } from 'react';
import { Button } from '@extjs/ext-react';

export default class UpdateClassName extends Component {

    state = { className: 'red' };

    toggleClassName = () => {
        this.setState({ className: this.state.className === 'red' ? 'blue' : 'red' })
    }

    render() {
        return (
            <Button 
                className={this.state.className}
                itemId="button" 
                text={this.state.className} 
                handler={this.toggleClassName}
            />
        )
    }
    
}