import React, { Component } from 'react';
import { reactify } from './reactify';

const Container = reactify('container');

Ext.require([
    'Ext.fx.animation.*', 
    'Ext.layout.Float'
]);

export default class Transition extends Component {

    static defaultProps = {
        type: 'slide',
        direction: 'forward',
        duration: 350,
        easing: 'easing'
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.direction !== this.props.direction) {
            this.cmp.setConfig(this.createAnimations(nextProps));
        }

        if (nextProps.children && this.props.children && nextProps.children.key !== this.props.children.key) {
            const { type, direction } = nextProps;

            if (type === 'cover') {
                this.cmp.setZIndex(direction === 'forward' ? 0 : 2);
            } else if (type === 'reveal') {
                this.cmp.setZIndex(direction === 'forward' ? 2 : 0);
            }
        }
    }

    track(incoming, hide=true) {    
        return React.cloneElement(incoming, { 
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 1,
            animateCreate: true,
            animateDestroy: true,
            ...this.createAnimations(),
            ref: cmp => {
                if (cmp) this.cmp = cmp
            }
        });
    }

    createAnimations(nextProps) {
        let { duration, easing, direction, type } = nextProps || this.props;

        direction = direction === 'forward' ? 'left' : 'right';

        if (type === 'reveal') {
            if (direction === 'left') {
                return {
                    showAnimation: null,
                    hideAnimation: { type: 'slideOut', easing, direction, duration }
                };
            } else {
                return {
                    showAnimation: { type: 'slideIn', easing, direction, duration },
                    hideAnimation: { type: 'reactor-delay', duration }
                };
            }
        } else if (type === "cover") {
            if (direction === 'left') {
                return {
                    showAnimation: { type: 'slideIn', easing, direction, duration },
                    hideAnimation: { type: 'reactor-delay', duration }
                };
            } else {
                return {
                    showAnimation: null,
                    hideAnimation: { type: 'slideOut', easing, direction, duration }
                };
            }
        } else {
            return {
                showAnimation: { type: type + 'In', easing, direction, duration },
                hideAnimation: { type: type + 'Out', easing, direction, duration }
            }
        }
    }

    render() {
        const { children, ...props } = this.props;
        
        return (
            <Container {...props} layout="float">
                { this.track(children) }
            </Container>
        )
    }

}

Ext.define('Ext.reactor.animation.Delay', {
    alias: 'animation.reactor-delay',
    extend: 'Ext.fx.animation.Abstract'
});