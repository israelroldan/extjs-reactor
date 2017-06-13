import { Children } from 'react';

export default function toJSON(element) {
    if (typeof element === 'string') return element;
    const { children, ...props } = element.props;
    const jsonChildren = [];

    Children.forEach(children, child => jsonChildren.push(toJSON(child)))

    const object = {
        type: typeof element.type === 'string' ? element.type : element.type.name,
        props: includeSerializable(props),
        children: jsonChildren.length ? jsonChildren : null
    };

    Object.defineProperty(object, '$$typeof', {
        value: Symbol['for']('react.test.json')
    });

    return object;
}

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