import { Children } from 'react';

/**
 * Converts both ExtReact and DOM components to json for Jest snapshots
 * @param {React.Component} component
 * @returns {Object}
 */
export default function toJSON(component) {
    const element = component._currentElement;
    const renderedChildren = component._renderedChildren;
    if (typeof element === 'string') return element;
    const { children, ...props } = element.props;
    let jsonChildren = null;

    if (typeof children === 'string') {
        // inner text
        jsonChildren = [children];
    } else if (renderedChildren) {
        jsonChildren = Object.keys(renderedChildren).map(key => {
            let child = renderedChildren[key];
            child = getHostComponentFromComposite(child) || child;
            return child.toJSON ? child.toJSON() : toJSON(child);
        })
    }

    const object = {
        type: typeof element.type === 'string' ? element.type : element.type.name,
        props: includeSerializable(props),
        children: jsonChildren
    };

    Object.defineProperty(object, '$$typeof', {
        value: Symbol['for']('react.test.json')
    });

    return object;
}

/**
 * Returns an object containing only the serializable keys from the source object.
 * @param {Object} obj The source object
 * @returns {Object}
 */
function includeSerializable(obj) {
    if (obj.constructor !== Object) {
        return undefined;
    }

    const result = {};

    for (let key in obj) {
        const value = obj[key];

        if (Array.isArray(value)) {
            const jsonValue = [];

            for (let item of value) {
                if (typeof item === 'object') {
                    const jsonItem = includeSerializable(item);

                    if (jsonItem !== undefined) {
                        jsonValue.push(jsonItem);
                    }
                } else {
                    jsonValue.push(item);
                }
            }

            result[key] = jsonValue;
        } else if (typeof value === 'object') {
            if (value.constructor === Object) {
                result[key] = includeSerializable(value);
            } else {
                result[key] = { $className: value.$className || value.constructor.name || 'unknown' };
            }
        } else {
            result[key] = value;
        }
    }

    return result;
}

// borrowed from react-test-renderer

/**
 * Gets the inner ExtReact or DOM component from the specified component
 * @param {React.Component} inst A component instance
 * @returns {React.Component}
 */
function getHostComponentFromComposite(inst) {
    var type;

    while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
        inst = inst._renderedComponent;
    }

    if (type === ReactNodeTypes.HOST) {
        return inst._renderedComponent;
    } else if (type === ReactNodeTypes.EMPTY) {
        return null;
    }
}

export const ReactNodeTypes = {
    HOST: 0,
    COMPOSITE: 1,
    EMPTY: 2
};