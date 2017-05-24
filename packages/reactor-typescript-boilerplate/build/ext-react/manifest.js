Ext.require(["Ext.app.Application", "Ext.Component", "Ext.Widget"]);
Ext.define(null, {
	extend: 'Ext.Template',
	constructor: function constructor(fn) {
		this.fn = fn;
	},
	apply: function apply(values) {
		return _server2.default.renderToStaticMarkup(this.fn(values));
	},
	doInsert: function doInsert(where, el, values, returnElement) {
		var target = this.getCachedTarget();
		this.doRender(values, target);
		return Ext.dom.Helper.doInsert(el, target.firstChild, returnElement, where);
	},
	overwrite: function overwrite(el, values, returnElement) {
		var dom = this.doRender(values, Ext.getDom(el));
		return returnElement ? new Ext.Element(dom) : dom;
	},
	getCachedTarget: function getCachedTarget() {
		if (!this.cachedTarget) this.cachedTarget = document.createElement('div');
		return this.cachedTarget;
	},
	doRender: function doRender(values, target) {
		var reactElement = this.fn(values);
		_reactDom2.default.render(reactElement, target);
		return target.firstChild;
	}
});
Ext.create({
  xtype: 'container',
  fullscreen: true
});
Ext.create({
  xtype: 'panel',
  margin: "30",
  shadow: true,
  bodyPadding: "10",
  title: "Panel"
});
Ext.create({
  xtype: 'container',
  fullscreen: true
});
Ext.create({
  xtype: 'panel',
  margin: "30",
  shadow: true,
  bodyPadding: "10",
  title: "Panel"
});
Ext.create({
  xtype: 'container',
  fullscreen: true
});
Ext.create({
  xtype: 'titlebar',
  docked: "top"
});
Ext.create({
  xtype: 'panel',
  margin: "30",
  shadow: true,
  bodyPadding: "10",
  title: "Panel"
});
Ext.create({
  xtype: 'container',
  fullscreen: true
});
Ext.create({
  xtype: 'titlebar',
  docked: "top"
});
Ext.create({
  xtype: 'panel',
  margin: "30",
  shadow: true,
  bodyPadding: "10",
  title: "Panel"
});
Ext.create({
  xtype: 'container',
  fullscreen: true
});
Ext.create({
  xtype: 'titlebar',
  docked: "top",
  title: "App"
});
Ext.create({
  xtype: 'panel',
  margin: "30",
  shadow: true,
  bodyPadding: "10",
  title: "Panel"
});
Ext.require(['Ext.fx.animation.*']);
Ext.define('Ext.reactor.Transition', {
	xtype: 'transition',
	extend: 'Ext.Container',
	initial: true,
	config: {
		type: 'slide',
		duration: 350,
		easing: 'ease',
		direction: 'left',
		bindDirectionToLocation: true
	},
	statics: {
		__reactorUpdateConfigsBeforeChildren: {
			location: true,
			direction: true
		}
	},
	initialize: function initialize() {
		this.newLocation = location.href;
	},
	computeDirection: function computeDirection() {
		if (this.getBindDirectionToLocation()) {
			var _newLocation = this.newLocation, newLocation = _newLocation === undefined ? '' : _newLocation, _oldLocation = this.oldLocation, oldLocation = _oldLocation === undefined ? '' : _oldLocation;
			if (newLocation.length > oldLocation.length && newLocation.indexOf(oldLocation) === 0) {
				return 'left';
			} else if (newLocation.length < oldLocation.length && oldLocation.indexOf(newLocation) === 0) {
				return 'right';
			}
		}
		return this.getDirection();
	},
	add: function add(items) {
		var _this = this;
		if (!Array.isArray(items)) {
			items = [items];
		}
		var animations = this.createAnimations();
		items.forEach(function (item) {
			return _this.addAnimationConfigs(item);
		});
		Ext.reactor.Transition.superclass.add.call(this, items);
		if (this.initial) {
			animations.showAnimation = null;
			this.initial = false;
		}
		items.forEach(function (item) {
			requestAnimationFrame(function () {
				item.setStyle({
					visibility: 'visible'
				});
				item.show(animations.showAnimation);
			});
			var originalDestroy = item.destroy.bind(item);
			item.destroy = _this.destroyChild.bind(_this, item, originalDestroy);
		});
	},
	insert: function insert(index, item) {
		this.add(item);
	},
	destroyChild: function destroyChild(item, originalDestroy) {
		if (item.animatingDestroy) return;
		this.oldLocation = this.newLocation || location.href;
		this.newLocation = location.href;
		var _createAnimations = this.createAnimations(), hideAnimation = _createAnimations.hideAnimation, type = this.getType(), direction = this.computeDirection();
		if (type === 'cover') {
			item.setZIndex(direction === 'left' || direction === 'top' ? 0 : 2);
		} else if (type === 'reveal') {
			item.setZIndex(direction === 'left' || direction === 'top' ? 2 : 0);
		}
		item.animatingDestroy = true;
		var animateDestroy = function animateDestroy() {
			if (hideAnimation.type === 'reactor-delay') {
				setTimeout(originalDestroy, hideAnimation.duration);
			} else {
				item.hide(hideAnimation);
				setTimeout(originalDestroy, hideAnimation.duration);
			}
		};
		if (item.activeAnimation) {
			item.activeAnimation.stop();
		}
		requestAnimationFrame(function () {
			return animateDestroy();
		});
	},
	addAnimationConfigs: function addAnimationConfigs(child) {
		child.setConfig({
			zIndex: 1,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			style: {
				visibility: 'hidden'
			}
		});
	},
	createAnimations: function createAnimations() {
		var type = this.getType(), duration = this.getDuration(), easing = this.getEasing(), direction = this.computeDirection();
		if (type === 'reveal') {
			if (direction === 'left' || direction === 'up') {
				return {
					showAnimation: null,
					hideAnimation: {
						type: 'slideOut',
						easing: easing,
						direction: direction,
						duration: duration
					}
				};
			} else {
				return {
					showAnimation: {
						type: 'slideIn',
						easing: easing,
						direction: direction,
						duration: duration
					},
					hideAnimation: {
						type: 'reactor-delay',
						duration: duration
					}
				};
			}
		} else if (type === "cover") {
			if (direction === 'left' || direction === 'up') {
				return {
					showAnimation: {
						type: 'slideIn',
						easing: easing,
						direction: direction,
						duration: duration
					},
					hideAnimation: {
						type: 'reactor-delay',
						duration: duration
					}
				};
			} else {
				return {
					showAnimation: null,
					hideAnimation: {
						type: 'slideOut',
						easing: easing,
						direction: direction,
						duration: duration
					}
				};
			}
		} else {
			return {
				showAnimation: {
					type: type + 'In',
					easing: easing,
					direction: direction,
					duration: duration
				},
				hideAnimation: {
					type: type + 'Out',
					easing: easing,
					direction: direction,
					duration: duration
				}
			};
		}
	}
})