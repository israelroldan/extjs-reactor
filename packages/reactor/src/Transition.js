import React, { Component } from 'react';
import { reactify } from './reactify';

const Container = reactify('container');

Ext.require([
    'Ext.fx.animation.*', 
    'Ext.layout.Float'
]);

export default class Transition extends Component {

    constructor({ children }) {
        super();

        this.state = {
            incoming: this.track(children, false),
            outgoing: null
        };
    }

    static defaultProps = {
        type: 'slide',
        direction: 'left',
        duration: 350,
        easing: 'easing'
    }

    componentWillReceiveProps(nextProps) {
        const incoming = this.track(nextProps.children);

        if (nextProps.children.key !== this.props.children.key) {
            this.animateOnUpdate = true;
            const incoming = this.track(nextProps.children);
            const outgoing = this.state.incoming;
            this.outgoingCmp = this.incomingCmp;
            this.setState({ outgoing, incoming });
        } else {
            const incoming = this.track(nextProps.children, false);
            this.setState({ incoming });
        }
    }

    track(incoming, hide=true) {    
        return React.cloneElement(incoming, { 
            hidden: hide,
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            ref: cmp => this.incomingCmp = cmp
        });
    }

    componentDidUpdate() {
        if (this.animateOnUpdate) {
            this.animateOnUpdate = false;
            const { direction, duration, easing } = this.props;

            if (this.outgoingCmp) this.outgoingCmp.hide({ 
                type: this.props.type + 'Out', 
                duration,
                easing,
                direction
            });

            if (this.incomingCmp) this.incomingCmp.show({ 
                type: this.props.type + 'In', 
                duration,
                easing,
                direction
            });
        }
    }

    render() {
        const { children, ...props } = this.props;
        const { incoming, outgoing } = this.state;

        return (
            <Container layout="float" {...props}>
                { outgoing }
                { incoming }
            </Container>
        )
    }

}
