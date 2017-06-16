import React, { Component } from 'react';
import { Dialog, Button } from '@extjs/ext-react';

export default class RelDialog extends Component {

    state = {
        displayed: true
    }

    close = () => {
        this.setState({ displayed: false });
    }

    render() {
        return (
            <Dialog itemId="dialog" displayed={this.state.displayed} title="Dialog">
                <Button text="Button" itemId="button" handler={this.close}/>
            </Dialog>
        );
    }

}