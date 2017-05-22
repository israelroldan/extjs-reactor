import ExtJSComponent from './ExtJSComponent';

// map of Ext JS class name to reactified class
const classCache = {};

// global reactor settings
let settings = {};

/**
 * Store reactor settings from launch
 * @param {Object} reactorSettings 
 */
export function configure(reactorSettings) {
    settings = reactorSettings;
}

/**
 * Creates a react component for a given Ext JS component.
 *
 *  Single class example: const Grid = reactify('grid');
 *
 *  Multiple class example: const [ Grid, Panel ] = reactify('Grid', 'Panel');
 *
 * @param {String[]/Ext.Class[]} ...targets xtypes or instances of Ext.Class.
 * @returns {React.Component/React.Component[]} If a single argument is passed a single React.Component class is returned. If multiple arguments are passed, an array of React.Component classes is returned.
 */
export function reactify(...targets) {
    const result = [];

    for (let target of targets) {
        if (typeof(target) === 'string') {
            const name = target;
            target = Ext.ClassManager.getByAlias(`widget.${target}`);
            if (!target) throw new Error(`No Ext JS component with xtype "${name}" found.  Perhaps you're missing a package?`);
        }

        const name = target.$className;
        let cached = classCache[name];

        if (!cached) cached = classCache[name] = class extends ExtJSComponent {
            static get name() {
                return name;
            }

            get extJSClass() {
                return target;
            }

            get reactorSettings() {
                return settings;
            }

            createExtJSComponent(config) {
                if (settings.debug) console.log('create', target.$className, config);
                const result = new target(config)
                result.$createdByReactor = true;
                return result;
            }
        };

        result.push(cached);
    }

    if (targets.length === 1) {
        return result[0];
    } else {
        return result;
    }
}