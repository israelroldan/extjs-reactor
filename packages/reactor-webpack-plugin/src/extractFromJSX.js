"use strict";

import { parse } from 'babylon';
import traverse from 'ast-traverse';

const OLD_MODULE_PATTERN = /^@extjs\/reactor\/modern$/;
const MODULE_PATTERN = /^@extjs\/(ext-react.*|reactor\/classic)$/;

/**
 * Extracts Ext.create equivalents from jsx tags so that cmd knows which classes to include in the bundle
 * @param {String} js The javascript code
 * @param {Compilation} compilation The webpack compilation object
 * @returns {Array} An array of Ext.create statements
 */
module.exports = function extractFromJSX(js, compilation, module) {
    const statements = [];
    const types = {};

    // Aliases used for reactify
    const reactifyAliases = new Set([]);

    const ast = parse(js, {
        plugins: [
            'jsx',
            'flow',
            'doExpressions',
            'objectRestSpread',
            'classProperties',
            'exportExtensions',
            'asyncGenerators',
            'functionBind',
            'functionSent',
            'dynamicImport'
        ],
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
            types[varName] = { xclass: `"${js.slice(reactifyArgNode.start, reactifyArgNode.end)}"` };
        }
    }

    traverse(ast, {
        pre: function(node) {
            if (node.type == 'ImportDeclaration') {
                if (node.source.value.match(OLD_MODULE_PATTERN) || node.source.value.match(MODULE_PATTERN)) {

                    if (node.source.value.match(OLD_MODULE_PATTERN)) {
                        compilation.warnings.push(`${module.resource}: ${node.source.value} is deprecated, use @extjs/ext-react instead.`);
                    }

                    // look for: import { Grid } from '@extjs/reactor
                    for (let spec of node.specifiers) {
                        types[spec.local.name] = {xtype: `"${spec.imported.name.toLowerCase().replace(/_/g, '-')}"`};
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
                        if (!attribute.name) continue; // will get here when using object spread, for example: <Panel {...props}/>
                        const name = attribute.name.name;
                        const valueNode = attribute.value;

                        if (!valueNode) {
                            configs[name] = 'true';
                        } else if (valueNode.type === 'JSXExpressionContainer') {
                            try {
                                const { expression } = valueNode;

                                if (expression.type.indexOf('Function') === -1) {
                                    configs[name] = js.slice(expression.start, expression.end);
                                }
                            } catch (e) {
                                // will get here if the value contains jsx or something else that can't be converted back to js
                            }
                        } else if (valueNode.type.match(/Literal$/i)) {
                            configs[name] = `"${valueNode.value.replace(/"/g, '\\"')}"`;
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

    // ensure that all imported classes are present in the build even if they aren't used,
    // otherwise the call to reactify will fail
    for (let key in types) {
        const type = types[key];
        const config = Object.keys(type).map(key => `${key}: ${type[key]}`).join(', ');
        statements.push(`Ext.create({${config}})`)
    }

    return statements;
};