import React, { Component, PropTypes } from 'react';
import ReactMultiChild from 'react-dom/lib/ReactMultiChild';
import { precacheNode } from 'react-dom/lib/ReactDOMComponentTree';
import Flags from 'react-dom/lib/ReactDOMComponentFlags';
import union from 'lodash.union';
import capitalize from 'lodash.capitalize'
import defaults from 'lodash.defaults';
import cloneDeepWith from 'lodash.clonedeepwith';
import isEqual from 'lodash.isequal';

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

        try {
            let result;

            if (renderToDOMNode) {
                result = this._renderRootComponent(renderToDOMNode, config);
            } else {
                result = this.cmp = this.createExtJSComponent(config);
            }

            this._precacheNode();
            return result;
        } catch (e) {
            console.error('Could not create Ext JS component with config', config);
            throw e;
        }
    }

    /**
     * Updates the component
     * @param nextComponent
     * @param transaction
     * @param context
     */
    receiveComponent(nextComponent, transaction, context) {
        const props = nextComponent.props;
        this._applyProps(this._currentElement.props, props);
        this.updateChildren(props.children, transaction, context);
        this._currentElement = nextComponent;
    }

    /**
     * Destroys the component
     */
    unmountComponent() {
        this.cmp && this.cmp.destroy();
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

    /**
     * Creates an Ext JS component config from react element props
     * @private
     */
    _createInitialConfig(element, transaction, context) {
        const { type, props } = element;
        const config = this._createConfig(props, true);

        const items = [], dockedItems = [];
        const children = this.mountChildren(props.children, transaction, context);

        if (children.length === 1 && children[0].node instanceof DocumentFragment) {
            const el = document.createElement('div');
            el.appendChild(children[0].node);
            config.html = el.innerHTML;
        } else {
            for (let i=0; i<children.length; i++) {
                const item = children[i];

                if (item instanceof Ext.Base) {
                    (item.dock ? dockedItems : items).push(item);
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

                if (key.match(/^on[A-Z]/)) {
                    // convert all props starting with on to listeners
                    if (value && includeEvents) config.listeners[key.slice(2).toLowerCase()] = value;
                } else if (key !== 'children') {
                    config[key] = value;
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
                const setter = `set${capitalize(key)}`;
                if (this.cmp[setter]) this.cmp[setter](this._cloneProps(newValue));
            }
        }
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
     * @param {number} lastIndex The element's previous index.
     * @protected
     */
    moveChild(child, afterNode, toIndex, lastIndex) {
        if (this.cmp.layout instanceof (Ext.layout.Fit || Ext.layout.FitLayout)) {
            // moving the main child of a container with layout fit causes it to disappear.  Instead we do nothing, which
            // should be ok because fit containers are not ordered
            return;
        }

        let childComponent = toComponent(child.cmp || child.getHostNode());

        if (childComponent) {
            if (childComponent.dock) {
                this.cmp.insertDocked(toIndex, childComponent);
            } else {
                this.cmp.insert(toIndex, childComponent);
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
    },

    /**
     * Removes a child component.
     * @param {ExtJSComponent} child Child to remove.
     * @param {Ext.Component/HTMLElement} node The node to remove
     * @protected
     */
    removeChild(child, node) {
        if (node instanceof HTMLElement && node._extCmp) node._extCmp.destroy();
        // We don't need to do anything for Ext JS components because a component is automatically removed from it parent when destroyed
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
    } else {
        return node._extCmp;
    }
}

Object.assign(ExtJSComponent.prototype, ContainerMixin);