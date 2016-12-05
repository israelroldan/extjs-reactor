"use strict";

const acorn = require('acorn-object-spread/inject')(require('acorn-jsx'));
import traverse from 'ast-traverse';
import astring from 'astring';

const COMPONENT_MODULE_PATTERN = /^@extjs\/reactor\/(modern|classic)$/;

/**
 * Extracts Ext.create equivalents from jsx tags so that cmd knows which classes to include in the bundle
 * @param {String} js The javascript code
 * @param {String} prefix The prefix that denotes an Ext JS xtype
 * @returns {Array} An array of Ext.create statements
 */
module.exports = function extractFromJSX(js) {
    const statements = [];
    const types = {};

    // Aliases used for reactify
    const reactifyAliases = new Set([]);

    const ast = acorn.parse(js, {
        ecmaVersion: 7,
        plugins: {
            jsx: true,
            objectSpread: true
        },
        sourceType: 'module'
    });

    /**
     * Adds a type mapping for a reactify call
     * @param {String} varName The name of the local variable being defined.
     * @param {Node} reactifyArgNode The argument passed to reactify()
     */
    function addType(varName, reactifyArgNode) {
        if (reactifyArgNode.type === 'Literal') {
            types[varName] = { xtype: `"${reactifyArgNode.value}"` };
        } else {
            types[varName] = { xclass: `"${astring(reactifyArgNode)}"` };
        }
    }

    traverse(ast, {
        pre: function(node) {
            if (node.type == 'ImportDeclaration') {
                if (node.source.value.match(COMPONENT_MODULE_PATTERN)) {
                    // look for: import { Grid } from '@extjs/reactor
                    for (let spec of node.specifiers) {
                        types[spec.local.name] = {xtype: `"${spec.imported.name.toLowerCase()}"`};
                    }
                } else if (node.source.value === '@extjs/reactor') {
                    // identify local names of reactify based on import { reactify as foo } from '@extjs/reactor';
                    for (let spec of node.specifiers) {
                        if (spec.imported.name === 'reactify') {
                            reactifyAliases.add(spec.local.name);
                        }
                    }
                }
            }

            // Look for reactify calls. Keep track of the names of each component so we can map JSX tags to xtypes and
            // convert props to configs so Sencha Cmd can discover automatic dependencies in the manifest.
            if (node.type == 'VariableDeclarator' && node.init && node.init.type === 'CallExpression' && node.init.callee && reactifyAliases.has(node.init.callee.name)) {
                if (node.id.elements) {
                    // example: const [ Panel, Grid ] = reactify('Panel', 'Grid');
                    for (let i = 0; i < node.id.elements.length; i++) {
                        const tagName = node.id.elements[i].name;
                        if (!tagName) continue;

                        const valueNode = node.init.arguments[i];
                        if (!valueNode) continue;

                        addType(tagName, valueNode);
                    }
                } else {
                    // example: const Grid = reactify('grid');
                    const varName = node.id.name;
                    const arg = node.init.arguments && node.init.arguments[0];
                    if (varName && arg) addType(varName, arg);
                }
            }

            // convert reactified components to Ext.create calls to put in the manifest
            if (node.type === 'JSXOpeningElement') {
                const tag = node.name.name;
                const type = types[tag];

                if (type) {
                    const configs = { ...type };

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