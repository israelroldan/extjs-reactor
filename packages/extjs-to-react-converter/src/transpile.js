import { transform } from 'babel-standalone';

export default function transpile(source) {
    if (source.startsWith('{')) {
        source = `Ext.create(${source})`
    }

    const result = transform(source, {
        plugins: [extJS2React]
    });

    return result.code;
}

function toComponentName(xtype) {
    return xtype ? xtype[0].toUpperCase() + xtype.slice(1) : 'unknown';
}

function lower(value) {
    return value[0].toLowerCase() + value.slice(1);
}

function capitalize(value) {
    return value[0].toUpperCase() + value.slice(1);
}

function extJS2React(babel) {
    const t = babel.types;

    function toPropValue(name, value) {
        let propValue;

        if (name === 'store' && value.type === 'StringLiteral') {
            propValue = t.jSXExpressionContainer(t.identifier(lower(value.value)))
        } else if (value.type === 'StringLiteral') {
            propValue = value;
        } else if (value.type === 'BooleanLiteral' && value.value) {
            propValue = null
        } else {
            propValue = t.jSXExpressionContainer(value);
        }

        return t.jSXAttribute(
            t.jSXIdentifier(name), 
            propValue
        )
    }

    function toEventProp(name, value) {
        name = `on${capitalize(name)}`;
        let propValue = value;

        if (value.type === 'StringLiteral') {
            propValue = t.memberExpression(t.thisExpression(), t.identifier(value.value))
        } else if (value.type === 'FunctionExpression') {
            propValue = t.arrowFunctionExpression(value.params, value.body)
        }

        return t.jSXAttribute(
            t.jSXIdentifier(name), 
            t.jSXExpressionContainer(propValue)
        )
    }

    function toJSX(config, componentName) {
        const attributes = [];
        let children = [];
        let xtype;

        for (let { key: { name }, value } of config.properties) {
            if (name === 'xtype') {
                xtype = value.value;
            } else if (name === 'items') {
                if (value.type === 'ArrayExpression') {
                    children = [...children, ...value.elements.map(toJSX)]
                }
            } else if (name === 'columns' && value.type === 'ArrayExpression') {
                children = [...children, ...value.elements.map(c => toJSX(c, 'Column'))]
            } else if (name === 'editor' && value.type === 'ObjectExpression') {
                children = [...children, toJSX(value)]
            } else if (name === 'listeners') {
                for (let listener of value.properties) {
                    attributes.push(toEventProp(listener.key.name, listener.value))
                }
            } else {
                attributes.push(toPropValue(name, value))
            }
        }

        componentName = xtype ? toComponentName(xtype) : componentName;

        return t.jSXElement(
            t.jSXOpeningElement(
                t.jSXIdentifier(componentName),
                attributes,
                children.length === 0
            ),
            t.jSXClosingElement(
                t.jSXIdentifier(componentName),
            ),
            children,
            children.length === 0
        );
    }

    return {
        visitor: {
            CallExpression: (path) => {
                const { node } = path;
                const { object, property } = node.callee;

                if (object && object.name === 'Ext' && property && property.name === 'create') {
                    path.replaceWith(toJSX(node.arguments[0]))
                }
            }
        }
    }
}