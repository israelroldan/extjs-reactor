import { reactify } from './reactify';

Ext.require([
    'Ext.fx.animation.*', 
    'Ext.layout.Float'
]);

Ext.define('Ext.reactor.Transition', {
    xtype: 'transition',
    extend: 'Ext.Container',

    config: {
        type: 'slide',
        duration: 350,
        easing: 'ease',
        direction: 'left'
    },

    eventedConfig: {
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

            const newPath = newLocation.pathname, oldPath = oldLocation.pathname;

            if (newPath.length > oldPath.length && newPath.indexOf(oldPath) === 0) {
                this.setDirection('left');
            } else if (newPath.length < oldPath.length && oldPath.indexOf(newPath) === 0) {
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
        
        items.forEach(item => {
            item.show(animations.showAnimation)
            const originalDestroy = item.destroy.bind(item);
            item.destroy = this.destroyChild.bind(this, item, originalDestroy);
        });
    },

    destroyChild(item, originalDestroy) {
        console.log('destroyChild');
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

        animateDestroy();
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