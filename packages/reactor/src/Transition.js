import { reactify } from './reactify';

Ext.require([
    'Ext.fx.animation.*', 
    'Ext.layout.Float'
]);

Ext.define('Ext.reactor.Transition', {
    xtype: 'transition',
    extend: 'Ext.Container',
    initial: true,

    config: {
        /**
         * The type of animation to use.
         */
        type: 'slide',

        /**
         * The duration of animations
         */
        duration: 350,

        /**
         * The easing function to use for animations
         */
        easing: 'ease',

        /**
         * The direction of the forward animation
         */
        direction: 'left'
    },

    eventedConfig: {
        /**
         * The uri to use when determining if the animation should be forward or backward.
         */
        location: null
    },

    statics: {
        __reactorUpdateConfigsBeforeChildren: {
            location: true,
            direction: true
        }
    },

    initialize() {
        this.on('locationchange', (cmp, newLocation, oldLocation) => {
            if (!newLocation || !oldLocation) return;

            if (newLocation.length > oldLocation.length && newLocation.indexOf(oldLocation) === 0) {
                this.setDirection('left');
            } else if (newLocation.length < oldLocation.length && oldLocation.indexOf(newLocation) === 0) {
                this.setDirection('right');
            }
        })
    },

    add(items) {
        if (!Array.isArray(items)) {
            items = [items];
        }

        const animations = this.createAnimations();
        items.forEach(item => this.addAnimationConfigs(item));
        
        Ext.reactor.Transition.superclass.add.call(this, items);
        
        if (this.initial) {
            animations.showAnimation = null;
            this.initial = false;
        }

        items.forEach(item => {
            requestAnimationFrame(() => item.show(animations.showAnimation));
            const originalDestroy = item.destroy.bind(item);
            item.destroy = this.destroyChild.bind(this, item, originalDestroy);
        });
    },

    destroyChild(item, originalDestroy) {
        if (item.animatingDestroy) return;

        let { hideAnimation } = this.createAnimations(), 
            type = this.getType(), 
            direction = this.getDirection();

        if (type === 'cover') {
            item.setZIndex(direction === 'left' || direction === 'top' ? 0 : 2);
        } else if (type === 'reveal') {
            item.setZIndex(direction === 'left' || direction === 'top' ? 2 : 0);
        } 

        item.animatingDestroy = true;

        const animateDestroy = () => {
            if (hideAnimation.type === 'reactor-delay') {
                setTimeout(originalDestroy, hideAnimation.duration);
            } else {
                item.hide(hideAnimation);
                setTimeout(originalDestroy, hideAnimation.duration);
            }
        }

        if (item.activeAnimation) {
            item.activeAnimation.stop();
        }

        requestAnimationFrame(() => animateDestroy());
    },

    addAnimationConfigs(child, hidden=true) {
        child.setConfig({
            hidden, 
            width: '100%',
            height: '100%',
            zIndex: 1,
            top: 0,
            left: 0
        });
    },

    createAnimations() {
        let type = this.getType(),
            duration = this.getDuration(),
            easing = this.getEasing(),
            direction = this.getDirection();

        if (type === 'reveal') {
            if (direction === 'left' || direction === 'up') {
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
            if (direction === 'left' || direction === 'up') {
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
});

export default reactify('transition');