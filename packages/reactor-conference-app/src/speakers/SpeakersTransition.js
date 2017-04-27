import React, { Component } from 'react';
import { Transition } from '@extjs/reactor';

export default class SpeakersTransition extends Component {
    render() {
        const { children, location } = this.props;

        return (
            <Transition type="slide" location={location}>
                { children }
            </Transition>
        )
    }
}