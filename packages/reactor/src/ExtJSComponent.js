import { Component, Children, cloneElement } from 'react';
import ReactMultiChild from 'react-dom/lib/ReactMultiChild';
import { precacheNode } from 'react-dom/lib/ReactDOMComponentTree';
import Flags from 'react-dom/lib/ReactDOMComponentFlags';
import union from 'lodash.union';
import capitalize from 'lodash.capitalize'
import defaults from 'lodash.defaults';
import cloneDeepWith from 'lodash.clonedeepwith';
import isEqualWith from 'lodash.isequalwith';

function isEqual(oldValue, newValue) {
    return isEqualWith(oldValue, newValue, function customizer(objValue, otherValue) {
        if (typeof objValue === 'function' && typeof otherValue === 'function') return true;
    })
}

const CLASS_CACHE = {
    Grid: Ext.ClassManager.getByAlias('widget.grid'),
    Column: Ext.ClassManager.getByAlias('widget.gridcolumn'),
    Button: Ext.ClassManager.getByAlias('widget.button'),
    Menu: Ext.ClassManager.getByAlias('widget.menu'),
    ToolTip: Ext.ClassManager.getByAlias('widget.tooltip'),
    CellBase: Ext.ClassManager.get('Ext.grid.cell.Base'),
    WidgetCell: Ext.ClassManager.getByAlias('widget.widgetcell')
}

export default class ExtJSComponent extends Component {

    constructor(element) {
        super(element);
        this.cmp = null;
        this.el = null;
        this._flags = null;
        this._hostNode = null;
        this._hostParent = null;
        this._renderedChildren = null;
        this._hostContainerInfo = null;
        this._currentElement = element;
        this._topLevelWrapper = null;
        this.displayName = 'ExtJSComponent';
    }

    // begin React renderer methods

    /**
     * Creates an Ext JS component.
     * This is needed by the React rendering API
     * @param transaction
     * @param nativeParent
     * @param nativeContainerInfo
     * @param context
     * @returns {null|*}
     */
    mountComponent(transaction, nativeParent, nativeContainerInfo, context) {
        const element = this._currentElement;

        let renderToDOMNode;

        if (nativeParent instanceof ExtJSComponent) {
            this._hostContainerInfo = nativeParent._hostContainerInfo; // propagate _hostContainerInfo - this is needed to render dom elements inside Ext JS components
        } else if (nativeParent) {
            this._hostContainerInfo = nativeParent._hostContainerInfo; // propagate _hostContainerInfo - this is needed to render dom elements inside Ext JS components
            renderToDOMNode = nativeParent._hostNode;
        } else {
            this._hostContainerInfo = nativeContainerInfo;
            renderToDOMNode = nativeContainerInfo._node;
        }

        this._hostParent = nativeParent; // this is needed by ReactDOMComponentTree#getNodeFromInstance

        const config = {
            ...this._createInitialConfig(element, transaction, context),
            renderTo: renderToDOMNode
        };

        let result;

        if (renderToDOMNode) {
            result = this._renderRootComponent(renderToDOMNode, config);
        } else {
            result = this.cmp = this.createExtJSComponent(config);
        }

        this._precacheNode();
        return result;
    }

    /**
     * Updates the component
     * @param nextComponent
     * @param transaction
     * @param context
     */
    receiveComponent(nextComponent, transaction, context) {
        if (this.cmp.destroyed) return;
        const props = nextComponent.props;
        this.updateChildren(this._applyDefaults(props), transaction, context);
        this._applyProps(this._currentElement.props, props);
        this._currentElement = nextComponent;
    }

    /**
     * Destroys the component
     */
    unmountComponent() {
        if (this.cmp) {
            if (this.cmp.destroying || this.cmp.$reactorConfig) return;

            const parentCmp = this.cmp.getParent();

            if (this.reactorSettings.debug) console.log('destroy', this.cmp.$className);

            if (Ext.navigation && Ext.navigation.View && parentCmp && parentCmp instanceof Ext.navigation.View) {
                parentCmp.pop();
            } else {
                this.cmp.destroy();
            }
        }
    }

    /**
     * Returns the Ext JS component instance
     */
    getHostNode() {
        return this.el;
    }

    /**
     * Returns the Ext JS component instance
     */
    getPublicInstance() {
        return this.cmp;
    }

    // end react renderer methods

    _renderRootComponent(renderToDOMNode, config) {
        defaults(config, {
            height: '100%',
            width: '100%'
        });

        config.renderTo = renderToDOMNode;

        this.cmp = this.createExtJSComponent(config);

        if (Ext.isClassic) {
            this.cmp.el.on('resize', () => this.cmp && this.cmp.updateLayout());
            this.el = this.cmp.el.dom;
        } else {
            this.el = this.cmp.renderElement.dom;
        }

        return { node: this.el };
    }

    _applyDefaults({ defaults, children }) {
        if (defaults) {
            return Children.map(children, child => cloneElement(child, { ...defaults, ...child.props }))
        } else {
            return children;
        }
    }

    /**
     * Creates an Ext JS component config from react element props
     * @private
     */
    _createInitialConfig(element, transaction, context) {
        const { type, props } = element;
        const config = this._createConfig(props, true);

        const items = [], dockedItems = [];
        const children = this.mountChildren(this._applyDefaults(props), transaction, context);

        if (children.length === 1 && children[0].node instanceof DocumentFragment) {
            config.html = this._toHTML(children[0].node);
        } else {
            for (let i=0; i<children.length; i++) {
                const item = children[i];

                if (item instanceof Ext.Base) {
                    const prop = this._propForChildElement(item);

                    if (prop) {
                        item.$reactorConfig = true;
                        const value = config;

                        if (prop.array) {
                            let array = config[prop.name];
                            if (!array) array = config[prop.name] = [];
                            array.push(item);
                        } else {
                            config[prop.name] = prop.value || item;
                        }
                    } else {
                        (item.dock ? dockedItems : items).push(item);
                    }
                } else if (item.node) {
                    items.push(wrapDOMElement(item.node));
                } else {
                    throw new Error('Could not render child item: ' + item);
                }
            }
        }

        if (items.length) config.items = items;
        if (dockedItems.length) config.dockedItems = dockedItems;

        return config;
    }

    /**
     * Determines whether a child element corresponds to a config or a container item based on the presence of a rel config or 
     * matching other known relationships
     * @param {Ext.Base} item 
     */
    _propForChildElement(item) {
        if (item.config && item.config.rel) {
            if (typeof item.config.rel === 'string') {
                return { name: item.config.rel }
            } else {
                return item.config.rel;
            }
        }

        const { extJSClass } = this;

        if (isAssignableFrom(extJSClass, CLASS_CACHE.Button) && CLASS_CACHE.Menu && item instanceof CLASS_CACHE.Menu) {
            return { name: 'menu', array: false };
        } else if (isAssignableFrom(extJSClass, Ext.Component) && CLASS_CACHE.ToolTip && item instanceof CLASS_CACHE.ToolTip) {
            return { name: 'tooltip', array: false };
        } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Grid) && CLASS_CACHE.Column && item instanceof CLASS_CACHE.Column) {
            return { name: 'columns', array: true };
        } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Column) && CLASS_CACHE.CellBase && item instanceof CLASS_CACHE.CellBase) {
            return { name: 'cell', array: false, value: this._cloneConfig(item) }
        } else if (isAssignableFrom(extJSClass, CLASS_CACHE.WidgetCell)) {
            return { name: 'widget', array: false, value: this._cloneConfig(item) }
        }
    }

    _cloneConfig(item) {
        return { ...item.initialConfig, xclass: item.$className };
    }

    /**
     * Converts a DocumentFragment to html
     * @param {DocumentFragment} docFragment
     * @return {String}
     */
    _toHTML(docFragment) {
        const el = document.createElement('div');
        el.appendChild(docFragment);
        return el.innerHTML;
    }

    /**
     * Creates an Ext config object for this specified props
     * @param {Object} props
     * @param {Boolean} [includeEvents] true to convert on* props to listeners, false to exclude them
     * @private
     */
    _createConfig(props, includeEvents) {
        props = this._cloneProps(props);

        const config = {};

        if (includeEvents) config.listeners = {};

        for (let key in props) {
            if (props.hasOwnProperty(key)) {
                const value = props[key];

                if (key === 'config') {
                    Object.assign(config, value);
                } else if (key.match(/^on[A-Z]/)) {
                    // convert all props starting with on to listeners
                    if (value && includeEvents) config.listeners[key.slice(2).toLowerCase()] = value;
                } else if (key !== 'children' && key !== 'defaults') {
                    config[key.replace(/className/, 'cls')] = value;
                }
            }
        }

        return config;
    }

    /**
     * Cloning props rather than passing them directly on as configs fixes issues where Ext JS mutates configs during
     * component initialization.  One example of this is grid columns get $initParent added when the grid initializes.
     * @param {Object} props
     * @private
     */
    _cloneProps(props) {
        return cloneDeepWith(props, value => {
            if (value instanceof Ext.Base) {
                return value;
            }
        })
    }

    /**
     * Calls config setters for all react props that have changed
     * @private
     */
    _applyProps(oldProps, props) {
        const keys = union(Object.keys(oldProps), Object.keys(props));

        for (let key of keys) {
            const oldValue = oldProps[key], newValue = props[key];
            if (key === 'children' || typeof newValue === 'function') continue;

            if (!isEqual(oldValue, newValue)) {
                const setter = this._setterFor(key);

                if (setter) {
                    const value = this._cloneProps(newValue);
                    if (this.reactorSettings.debug) console.log(setter, newValue);
                    this.cmp[setter](value);
                }
            }
        }
    }

    /**
     * Returns the name of the setter method for a given prop.
     * @param {String} prop 
     */
    _setterFor(prop) {
        const name = `set${this._capitalize(prop)}`;
        return this.cmp[name] && name;
    }

    /**
     * Returns the name of a getter for a given prop.
     * @param {String} prop 
     */
    _getterFor(prop) {
        const name = `get${this._capitalize(prop)}`;
        return this.cmp[name] && name;
    }

    /**
     * Capitalizes the first letter in the string
     * @param {String} str
     * @return {String}
     * @private
     */
    _capitalize(str) {
        return capitalize(str[0]) + str.slice(1);
    }

    _precacheNode() {
        this._flags |= Flags.hasCachedChildNodes;

        if (this.el) {
            // will get here when rendering root component
            precacheNode(this, this.el)
        } else {
            // when get here when rendering child components due to lazy rendering
            this.cmp.on(Ext.isClassic ? 'afterrender' : 'painted', () => {
                this.el = this.cmp.el.dom;
                this.el._extCmp = this.cmp;
                precacheNode(this, this.el)
            }, this, { single: true });
        }
    }

    /**
     * Returns the child item at the given index, only counting those items which were created by Reactor
     * @param {Number} n
     */
    _toReactChildIndex(n) {
        let items = this.cmp.items;

        if (!items) return n;
        if (items.items) items = items.items;

        let found=0, i, item;

        for (i=0; i<items.length; i++) {
            item = items[i];

            if (item.$createdByReactor && found++ === n) {
                return i;
            }
        }

        return i;
    }

    /**
     * Translates and index in props.children to an index within a config value that is an array.  Use
     * this to determine the position of an item in props.children within the array config to which it is mapped.
     * @param {*} prop 
     * @param {*} indexInChildren 
     */
    _toArrayConfigIndex(prop, indexInChildren) {
        let i=0, found=0;

        Children.forEach(this.props.children, child => {
            const propForChild = this._propForChildElement(child);

            if (propForChild && propForChild.name === prop.name) {
                if (i === indexInChildren) return found;
                found++;
            } 
        });

        return -1;
    }

    /**
     * Updates a config based on a child element
     * @param {Object} prop The prop descriptor (name and array)
     * @param {Ext.Base} value The value to set
     * @param {Number} [index] The index of the child element in props.children
     * @param {Boolean} [isArrayDelete=false] True if removing the item from an array
     */
    _mergeConfig(prop, value, index, isArrayDelete) {
        const setter = this._setterFor(prop.name);
        if (!setter) return;

        if (value) value.$reactorConfig = true;

        if (prop.array) {
            const getter = this._getterFor(prop.name);
            if (!getter) return;

            const currentValue = this.cmp[getter]() || [];
            
            if (isDelete) {
                // delete
                value = currentValue.filter(item => item !== value);
            } else if (index !== undefined) {
                // move
                value = currentValue.filter(item => item !== value);
                value = value.splice(this._toArrayConfigIndex(index, prop), 0, item);
            } else {
                // append
                value = currentValue.concat(value);                
            }
        }

        if (this.reactorSettings.debug) console.log(setter, value);

        this.cmp[setter](value);
    }
}

/**
 * Extend ReactMultiChild to handle inserting and moving Component instances
 * within Ext JS Containers
 */
const ContainerMixin = Object.assign({}, ReactMultiChild.Mixin, {

    /**
     * Moves a child component to the supplied index.
     * @param {ExtJSComponent} child Component to move.
     * @param {Component} afterNode The component to move after
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild(child, afterNode, toIndex, lastIndex) {
        if (toIndex === child._mountIndex) return; // only move child if the actual mount index has changed
        
        const fitLayout = Ext.layout && (Ext.layout.Fit || Ext.layout.FitLayout);

        if (fitLayout && this.cmp.layout instanceof fitLayout) {
            // moving the main child of a container with layout fit causes it to disappear.  Instead we do nothing, which
            // should be ok because fit containers are not ordered
            return;
        }

        let childComponent = toComponent(child.cmp || child.getHostNode());

        const prop = this._propForChildElement(childComponent);

        if (prop) {
            this._mergeConfig(prop, childComponent, toIndex);
        } else if (childComponent) {
            if (childComponent.dock) {
                this.cmp.insertDocked(toIndex, childComponent);
            } else {
                // reordering docked components is known to cause issues in modern
                // place items in a container instead
                if (childComponent.config && (childComponent.config.docked || childComponent.config.floated || childComponent.config.positioned)) return;
                
                // removing the child first ensures that we get the new index correct
                this.cmp.remove(childComponent, false);
                
                const newIndex = this._toReactChildIndex(toIndex);
                
                if (this.reactorSettings.debug) console.log(`moving ${childComponent.$className} to position ${newIndex} in ${this.cmp.$className}`);

                this.cmp.insert(newIndex, childComponent);
            }
        }
    },

    /**
     * Creates a child component.
     * @param {ExtJSComponent} child Component to create.
     * @param {Component} afterNode The component to move after
     * @param {Component} childNode The component to insert.
     * @protected
     */
    createChild(child, afterNode, childNode) {
        const prop = this._propForChildElement(childNode);

        if (prop) {
            this._mergeConfig(prop, childNode);
        } else {
            if (this.reactorSettings.debug) console.log(`adding ${childNode.$className} to ${this.cmp.$className}`);

            if (!(childNode instanceof Ext.Base)) {
                // we're appending a dom node
                childNode = wrapDOMElement(childNode.node);
            }

            if (afterNode instanceof HTMLElement) {
                afterNode = afterNode._extCmp;
            }

            if (afterNode) {
                const index = this.cmp[childNode.dock ? 'dockedItems' : 'items'].indexOf(afterNode);
                this.cmp[childNode.dock ? 'insertDocked' : 'insert'](index + 1, childNode);
            } else {
                this.cmp[childNode.dock ? 'addDocked' : 'add'](childNode);
            }
        }
    },

    /**
     * Removes a child component.
     * @param {ExtJSComponent} child Child to remove.
     * @param {Ext.Component/HTMLElement} node The node to remove
     * @protected
     */
    removeChild(child, node) {
        const prop = child instanceof ExtJSComponent && this._propForChildElement(child.cmp);

        if (prop) {
            this._mergeConfig(prop, null, null, true);
        } else {
            if (node instanceof HTMLElement && node._extCmp && !node._extCmp.destroying) {
                if (this.reactorSettings.debug) console.log('removing', node._extCmp.$className);
                node._extCmp.destroy();
            }
            // We don't need to do anything for Ext JS components because a component is automatically removed from it parent when destroyed
        }
    }
});

/**
 * Wraps a dom element in an Ext Component so it can be added as a child item to an Ext Container.  We attach
 * a reference to the generated Component to the dom element so it can be destroyed later if the dom element
 * is removed when rerendering
 * @param {HTMLElement/DocumentFragment} el
 * @returns {Ext.Component}
 */
function wrapDOMElement(el) {
    let contentEl = el;

    if (el instanceof DocumentFragment) {
        // will get here when appending text nodes
        contentEl = document.createElement('div');
        contentEl.appendChild(el)
    }

    const cmp = new Ext.Component({ contentEl });
    cmp.$createdByReactor = true;
    contentEl._extCmp = el._extCmp = cmp;
    return cmp;
}

/**
 * Returns the Ext Component corresponding to the given node
 * @param {Ext.Component/HTMLElement/DocumentFragment} node
 * @returns {Ext.Component}
 */
function toComponent(node) {
    if (node instanceof Ext.Base) {
        return node;
    } else if (node) {
        return node._extCmp;
    }
}

/**
 * Returns true if subClass is parentClass or a sub class of parentClass
 * @param {Ext.Class} subClass
 * @param {Ext.Class} parentClass
 * @return {Boolean}
 */
function isAssignableFrom(subClass, parentClass) {
    if (!subClass || !parentClass) return false;
    return subClass === parentClass || subClass.prototype instanceof parentClass;
}

Object.assign(ExtJSComponent.prototype, ContainerMixin);