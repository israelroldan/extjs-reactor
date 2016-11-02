"use strict";

const acorn = require('acorn-object-spread/inject')(require('acorn-jsx'));
const traverse = require("ast-traverse");
const astring = require('astring');

/**
 * Extracts Ext.create equivalents from jsx tags so that cmd knows which classes to include in the bundle
 * @param {String} js The javascript code
 * @param {String} prefix The prefix that denotes an Ext JS xtype
 * @returns {Array} An array of Ext.create statements
 */
module.exports = function extractFromJSX(js, prefix='x-') {
    const statements = [];

    const ast = acorn.parse(js, {
        ecmaVersion: 7,
        plugins: {
            jsx: true,
            objectSpread: true
        },
        sourceType: 'module'
    });

    traverse(ast, {
        pre: function(node) {
            if (node.type === 'JSXOpeningElement') {
                const tag = node.name.name;

                if (tag.startsWith(prefix)) {
                    const xtype = tag.slice(prefix.length);
                    const configs = { xtype: `"${xtype}"` };

                    for (let attribute of node.attributes) {
                        const name = attribute.name.name;
                        const valueNode = attribute.value;

                        if (valueNode.type === 'JSXExpressionContainer') {
                            try {
                                const { expression } = valueNode;

                                if (expression.type.indexOf('Function') === -1) {
                                    let js = astring(valueNode.expression);
                                    configs[name] = js;
                                }
                            } catch (e) {
                                // will get here if the value contains jsx or something else that can't be converted back to js
                            }
                        } else if (valueNode.type === 'Literal') {
                            configs[name] = `"${valueNode.value}"`;
                        }
                    }

                    const values = [];

                    for (let name in configs) {
                        values.push(`${name}: ${configs[name]}`)
                    }

                    statements.push(`Ext.create({${values.join(', ')}})`);
                }
            }
        }
    });

    return statements;
};