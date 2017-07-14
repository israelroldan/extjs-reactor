import ReactDOM from 'react-dom'; // need to ensure ReactDOM is loaded before patching ReactComponentEnvironment.replaceNodeWithMarkup
import ReactComponentEnvironment from 'react-dom/lib/ReactComponentEnvironment';
import { Component, Children, cloneElement } from 'react';
import ReactMultiChild from 'react-dom/lib/ReactMultiChild';
import DOMLazyTree from 'react-dom/lib/DOMLazyTree';
import { precacheNode } from 'react-dom/lib/ReactDOMComponentTree';
import Flags from 'react-dom/lib/ReactDOMComponentFlags';
import union from 'lodash.union';
import capitalize from 'lodash.capitalize'
import defaults from 'lodash.defaults';
import cloneDeepWith from 'lodash.clonedeepwith';
import isEqualWith from 'lodash.isequalwith';
import toJSON, { ReactNodeTypes } from './toJSON';

const Ext = window.Ext;

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
    WidgetCell: Ext.ClassManager.getByAlias('widget.widgetcell'),
    Dialog: Ext.ClassManager.getByAlias('widget.dialog'),
    Field: Ext.ClassManager.getByAlias('widget.field'),
    FitLayout: Ext.ClassManager.getByAlias('layout.fit'),
    TabPanel: Ext.ClassManager.getByAlias('widget.tabpanel'),
    RendererCell: Ext.ClassManager.getByAlias('widget.renderercell')
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
        this.unmountSafely = false;

        // needed for serializing jest snapshots when using react-test-renderer
        if (process.env.NODE_ENV === 'test') {
            this._renderedNodeType = ReactNodeTypes.HOST; // HOST
            this._renderedComponent = {
                toJSON: () => toJSON(this)
            }
        }
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

        const config = this._createInitialConfig(element, transaction, context)

        let result;

        if (renderToDOMNode) {
            result = this._renderRootComponent(renderToDOMNode, config);
        } else {
            result = this.cmp = this.createExtJSComponent(config);
        }

        // this allows React internals to get the mounted instance for debug tools when using dangerouslyReplaceNodeWithMarkup
        // this is probably not needed in fiber
        if (!result.node) Object.defineProperty(result, 'node', {
            get: () => this.el
        });

        // Ensure that componentWillUnmount is called on children.
        // We wait until the Ext JS component is destroyed rather than calling unmountChildren in unmountComponent
        // so that we don't unmount children during a Transition's animation.
        this.cmp.on('destroy', () => {
            this.unmountChildren(this.unmountSafely); 
        });

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
        if (!this.cmp || this.cmp.destroyed) return;
        const props = nextComponent.props;
        this._rushProps(this._currentElement.props, props);
        this.updateChildren(this._applyDefaults(props), transaction, context);
        this._applyProps(this._currentElement.props, props);
        this._currentElement = nextComponent;
    }

    /**
     * Destroys the component
     */
    unmountComponent(safely) {
        this.unmountSafely = safely;

        if (this.cmp) {
            if (this.cmp.destroying || this.cmp.$reactorConfig) return;

            const parentCmp = getParentCmp(this.cmp);

            // remember the parent and position in parent for dangerouslyReplaceNodeWithMarkup
            // this not needed in fiber
            let indexInParent;

            if (parentCmp) {
                if (parentCmp.indexOf) {
                    // modern
                    indexInParent = parentCmp.indexOf(this.cmp);
                } else if (parentCmp.items && parentCmp.items.indexOf) {
                    // classic
                    indexInParent = parentCmp.items.indexOf(this.cmp);
                }
            }

            if (this.reactorSettings.debug) console.log('destroy', this.cmp.$className);

            if (Ext.navigation && Ext.navigation.View && parentCmp && parentCmp instanceof Ext.navigation.View) {
                parentCmp.pop();
            } else {
                this.cmp.destroy();
            }

            // remember the parent and position in parent for dangerouslyReplaceNodeWithMarkup
            // this not needed in fiber
            this.el._extIndexInParent = indexInParent;
            this.el._extParent = parentCmp;
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

        return { node: this.el, children: [] };
    }

    _applyDefaults({ defaults, children }) {
        if (defaults) {
            return Children.map(children, child => {
                if (child.type.prototype instanceof ExtJSComponent) {
                    return cloneElement(child, { ...defaults, ...child.props })
                } else {
                    return child;
                }
            })
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
        this._ensureResponsivePlugin(config);

        const items = [], dockedItems = [];
        
        if (props.children) {
            const children = this.mountChildren(this._applyDefaults(props), transaction, context);

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
                    items.push(wrapDOMElement(item));
                } else if (typeof item === 'string') {
                    // will get here when rendering html elements in react-test-renderer
                    // no need to do anything
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
        } else if (CLASS_CACHE.Column && item instanceof CLASS_CACHE.Column) {
            return { name: 'columns', array: true };
        } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Column) && CLASS_CACHE.CellBase && item instanceof CLASS_CACHE.CellBase) {
            return { name: 'cell', array: false, value: this._cloneConfig(item) }
        } else if (isAssignableFrom(extJSClass, CLASS_CACHE.WidgetCell)) {
            return { name: 'widget', array: false, value: this._cloneConfig(item) }
        } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Dialog) && CLASS_CACHE.Button && item instanceof CLASS_CACHE.Button) {
            return { name: 'buttons', array: true };
        } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Column) && CLASS_CACHE.Field && item instanceof CLASS_CACHE.Field) {
            return { name: 'editor', array: false, value: this._cloneConfig(item) };
        }
    }

    _cloneConfig(item) {
        return { ...item.initialConfig, xclass: item.$className };
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

        const { extJSClass } = this;

        if (isAssignableFrom(extJSClass, CLASS_CACHE.Column) && typeof config.renderer === 'function' && CLASS_CACHE.RendererCell) {
            config.cell = config.cell || {};
            config.cell.xtype = 'renderercell';
        }

        return config;
    }

    _ensureResponsivePlugin(config) {
        if (config.responsiveConfig) {
            const { plugins } = config;

            if (plugins == null) {
                config.plugins = 'responsive';
            } else if (Array.isArray(plugins) && plugins.indexOf('responsive') === -1) {
                plugins.push('responsive');
            } else if (typeof plugins === 'string') {
                if (plugins !== 'responsive') {
                    config.plugins = [plugins, 'responsive'];
                }
            } else if (!plugins.resposive) {
                plugins.responsive = true;
            }
        }
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

    _rushProps(oldProps, newProps) {
        const rushConfigs = this.extJSClass.__reactorUpdateConfigsBeforeChildren;
        if (!rushConfigs) return;
        const oldConfigs = {}, newConfigs = {}

        for (let name in rushConfigs) {
            oldConfigs[name] = oldProps[name];
            newConfigs[name] = newProps[name]
        }

        this._applyProps(oldConfigs, newConfigs);
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
        if (prop === 'className') {
            prop = 'cls';
        }
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
        } else if (this.cmp.el) {
            this._doPrecacheNode();
        } else if (Ext.isClassic) {
            // we get here when rendering child components due to lazy rendering
            this.cmp.on('afterrender', this._doPrecacheNode, this, { single: true });
        }
    }

    _doPrecacheNode() {
        this.el = this.cmp.el.dom;
        this.el._extCmp = this.cmp;
        precacheNode(this, this.el)
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

    _ignoreChildrenOrder() {
        // maintaining order in certain components, like Transition's container, can cause problems with animations, _reactorIgnoreOrder gives us a way to opt out in such scenarios
        if (this.cmp._reactorIgnoreOrder) return true; 

        // moving the main child of a container with layout fit causes it to disappear.  Instead we do nothing, which
        // should be ok because fit containers are not ordered
        if (CLASS_CACHE.FitLayout && this.cmp.layout instanceof CLASS_CACHE.FitLayout) return true; 

        // When tab to the left of the active tab is removed, the left-most tab would always be selected as the tabs to the right are reinserted
        if (CLASS_CACHE.TabPanel && this.cmp instanceof CLASS_CACHE.TabPanel) return true;
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
        if (this._ignoreChildrenOrder()) return;
        if (toIndex === child._mountIndex) return; // only move child if the actual mount index has changed

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
            if (!(childNode instanceof Ext.Base)) {
                // we're appending a dom node
                childNode = wrapDOMElement(childNode);
            }

            const index = this._toReactChildIndex(child._mountIndex);
            
            if (this.reactorSettings.debug) {
                console.log(`inserting ${childNode.$className} into ${this.cmp.$className} at position ${index}`);
            }
            
            this.cmp[childNode.dock ? 'insertDocked' : 'insert'](index, childNode);
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
 * @param {Object} node A React node object with node, children, and text
 * @returns {Ext.Component}
 */
function wrapDOMElement(node) {
    let contentEl = node.node;

    const cmp = new Ext.Component({ 
        // We give the wrapper component a class so that developers can reset css 
        // properties (ex. box-sizing: context-box) for third party components.
        cls: 'x-react-element' 
    });
    
    if (cmp.element) {
        // modern
        DOMLazyTree.insertTreeBefore(cmp.element.dom, node);
    } else {
        // classic
        const target = document.createElement('div');
        DOMLazyTree.insertTreeBefore(target, node);
        cmp.contentEl = contentEl instanceof HTMLElement ? contentEl : target /* text fragment or comment */;
    }

    cmp.$createdByReactor = true;
    contentEl._extCmp = cmp;

    // this is needed for devtools when using dangerouslyReplaceNodeWithMarkup
    // this not needed in fiber
    cmp.node = contentEl;

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

/**
 * Returns the parent component in both modern and classic toolkits
 * @param {Ext.Component} cmp The child component
 */
function getParentCmp(cmp) {
    if (cmp.getParent) {
        // modern
        return cmp.getParent();
    } else {
        // classic
        return cmp.ownerCt;
    }
}

// Patch replaceNodeWithMarkup to fix bugs with swapping null and components
// A prime example of this is using react-router 4, which renders a null when a route fails
// to match.  React does not call createChild/removeChild in this case, but takes a completely separate
// path through the renderer
const oldReplaceNodeWithMarkup = ReactComponentEnvironment.replaceNodeWithMarkup;

ReactComponentEnvironment.replaceNodeWithMarkup = function(oldChild, markup) {
    if (oldChild._extCmp) {
        const newChild = markup instanceof Ext.Base ? markup : wrapDOMElement(markup);
        const parent = oldChild.hasOwnProperty('_extParent') ? oldChild._extParent : getParentCmp(oldChild._extCmp);
        const index = oldChild.hasOwnProperty('_extIndexInParent') ? oldChild._extIndexInParent : parent.indexOf(oldChild._extCmp);
        parent.insert(index, newChild);
        oldChild._extCmp.destroy();
    } else {
        oldReplaceNodeWithMarkup.apply(this, arguments);
    }
}

Object.assign(ExtJSComponent.prototype, ContainerMixin);