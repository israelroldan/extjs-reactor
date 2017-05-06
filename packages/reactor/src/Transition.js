import { reactify } from './reactify';

Ext.require([
    'Ext.fx.animation.*'
]);

Ext.define('Ext.reactor.Transition', {
    xtype: 'transition',
    extend: 'Ext.Container',
    initial: true,

    config: {
        /**
         * @cfg {String}
         * The type of animation to use.
         */
        type: 'slide',

        /**
         * @cfg {Number}
         * The duration of animations
         */
        duration: 350,

        /**
         * @cfg {String}
         * The easing function to use for animations
         */
        easing: 'ease',

        /**
         * @cfg {String}
         * The direction of the forward animation.
         */
        direction: 'left',

        /**
         * @cfg {Boolean}
         * Automatically switch directions based on browser URL changes. This should generally
         * be set to true when animating transitions based on client-side routing. Defaults to true.
         */
        bindDirectionToLocation: true
    },

    statics: {
        __reactorUpdateConfigsBeforeChildren: {
            location: true,
            direction: true
        }
    },

    initialize() {
        this.newLocation = location.href;
    },

    computeDirection() {
        if (this.getBindDirectionToLocation()) {
            const { newLocation = '', oldLocation = '' } = this;

            if (newLocation.length > oldLocation.length && newLocation.indexOf(oldLocation) === 0) {
                return 'left';
            } else if (newLocation.length < oldLocation.length && oldLocation.indexOf(newLocation) === 0) {
                return 'right';
            }
        }
         
        return this.getDirection();
    },

    // override add to show animation when children are added
    add(items) {
        if (!Array.isArray(items)) {
            items = [items];
        }

        const animations = this.createAnimations();
        items.forEach(item => this.addAnimationConfigs(item));
        
        Ext.reactor.Transition.superclass.add.call(this, items);
        
        if (this.initial) {
            // don't show animation on initial render
            animations.showAnimation = null;
            this.initial = false;
        }

        items.forEach(item => {
            requestAnimationFrame(() => {
                item.setStyle({ visibility: 'visible' })
                item.show(animations.showAnimation)
            });

            // override destroy to first hide then destroy
            const originalDestroy = item.destroy.bind(item);
            item.destroy = this.destroyChild.bind(this, item, originalDestroy);
        });
    },

    insert(index, item) {
        // order doesn't matter since we're using a floating layout
        this.add(item);
    },

    destroyChild(item, originalDestroy) {
        if (item.animatingDestroy) return;

        this.oldLocation = this.newLocation || location.href;
        this.newLocation = location.href;

        let { hideAnimation } = this.createAnimations(), 
            type = this.getType(), 
            direction = this.computeDirection();

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

    addAnimationConfigs(child) {
        child.setConfig({
            width: '100%',
            height: '100%',
            zIndex: 1,
            top: 0,
            left: 0,
            style: {
                // prevent new view from "flashing" in before animating in safari
                // we use visibi
                visibility: 'hidden'
            }
        });
    },

    createAnimations() {
        let type = this.getType(),
            duration = this.getDuration(),
            easing = this.getEasing(),
            direction = this.computeDirection();

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