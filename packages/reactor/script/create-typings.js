const fs = require('fs');
const path = require('path');
const components = {};
const byClassName = {};
const { capitalize } = require('lodash');

const words = [
    'split',
    'button',
    'calendar',
    'view',
    'field',
    'data',
    'table',
    'color',
    'picker',
    'slider',
    'tree',
    'grid',
    'cell',
    'column',
    'value',
    'record',
    'manager',
    'edit',
    'header',
    'map',
    'tab',
    'iframe',
    'panel',
    'bar',
    'tip',
    'spacer',
    'text',
    'widget',
    'selector',
    'separator',
    'list',
    'menu',
    'progress',
    'pivot',
    'pie',
    'box',
    'bullet',
    'item',
    'fill',
    'saturation',
    'select',
    'hue',
    'alpha',
    'line',
    'discrete',
    'heat',
    'area',
    'upload',
    'component',
    'check',
    'item',
    'container',
    'config',
    'row',
    'cell',
    'range',
    'group',
    'title',
    'slot',
    'tool',
    'trigger',
    'native'
]

const replacements = [
    { find: /preview/gi, replace: 'Preview' },
    { find: /^ux/i, replace: 'UX' },
    { find: /^tb/i, replace: 'TB' },
    { find: /toolbar/gi, replace: 'Toolbar' },
    { find: /tristate/gi, replace: 'TriState' },
    { find: /d3/gi, replace: 'D3' },
    { find: /mz/gi, replace: 'MZ' },
    { find: /svg/gi, replace: 'SVG' },
    { find: /^url/gi, replace: 'URL' }
];

function toComponentName(xtype) {
    xtype = xtype.split(/-/).map(capitalize).join('');

    for (let word of words) {
        xtype = xtype.replace(word, capitalize(word));
    }

    for (let replacement of replacements) {
        xtype = xtype.replace(replacement.find, replacement.replace);
    }

    console.log(xtype);

    return xtype;
}

function typeFor(doxiType) {
    if (!doxiType) return 'any';

    return Array.from(new Set(doxiType.split(/\//).map(type => {
        if (type.indexOf('Ext.') === 0) {
            return byClassName[type] || 'any'
        } else if (type.match(/^(string|number|boolean)(\[\])?$/i) || ['Array'].indexOf(type) !== -1) {
            return type.toLowerCase();
        } else if (type === 'HTMLElement') {
            return 'HTMLElement';
        } else if (['integer', 'decimal', 'float'].indexOf(type.toLowerCase()) !== -1) {
            return 'number';
        } else if (['integer[]', 'decimal[]', 'float[]'].indexOf(type.toLowerCase()) !== -1) {
            return 'number[]';
        } else if ('Object[]' === type) {
            return 'any[]';
        } else if ('Function' === type) {
            return 'Function'
        } else if (type.match(/^"[^"]*"$/) || type.match(/^'[^']*'$/)) {
            return 'string';
        } else if (type.match(/^[0-9]+$/)) {
            return 'number';
        } else {
            return 'any';
        }
    }))).join(' | ');
}

for (let toolkit of ['classic', 'modern']) {
    const output = [];
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'doxi', '6.2.1', `${toolkit}-all-classes.json`)));

    for (let cls of data.global.items) {
        if (cls.$type === 'class' && cls.alias && cls.alias.indexOf('widget.') === 0) {
            for (let alias of cls.alias.split(/,/)) {
                const xtype = alias.replace(/^widget\./, '');
                const name = cls.name.split(/\./);
                let componentName = name[name.length-1];

                if (xtype === componentName.toLowerCase()) {
                    byClassName[cls.name] = componentName;
                } else {
                    componentName = toComponentName(xtype);
                }

                if (componentName.indexOf('.') === -1) {
                    components[componentName] = cls;
                }
            }
        }
    }

    for (let name in components) {
        const cls = components[name];
        const propsInterface = `${name}Props`;
        const configs = cls.items && cls.items.find(i => i['$type'] === 'configs');

        output.push(`declare class ${name} extends React.Component<${propsInterface}, any> { }`);
        output.push(`export interface ${propsInterface} {`);

        if (configs) for (let { name, type, required, access } of configs.items) {
            
            if (access === 'private' || 
                access === 'public' ||
                name.indexOf('.') !== -1 || 
                name === 'items' || name === 'dockedItems') continue; // some configs erroneously have '.' in the name - this must be a bug in doxi

            output.push(`\t${name}${required ? '' : '?'}: ${typeFor(type)}`)
        }

        output.push('}');
    }

    const target = path.join(__dirname, '..', `${toolkit}.d.ts`);
    fs.writeFileSync(target, output.join('\n'), 'utf8');
    console.log(`Wrote ${target}`);
}

console.log('done');
