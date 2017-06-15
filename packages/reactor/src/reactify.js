import ExtJSComponent from './ExtJSComponent';

const Ext = window.Ext;

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
        let componentName;

        if (typeof(target) === 'string') {
            componentName = target;
            const xtype = target.toLowerCase().replace(/_/g, '-')
            target = Ext.ClassManager.getByAlias(`widget.${xtype}`);
            if (!target) throw new Error(`No Ext JS component with xtype "${xtype}" found.  Perhaps you're missing a package?`);
        }

        const className = target.$className;
        let cached = classCache[className];
        componentName = componentName || name; // use the Ext JS class name for the node type in jest when reactifying a class directly

        if (!cached) cached = classCache[className] = class extends ExtJSComponent {
            static get name() {
                return componentName;
            }

            get extJSClass() {
                return target;
            }

            get reactorSettings() {
                return settings;
            }

            createExtJSComponent(config) {
                if (settings.debug) console.log('create', componentName, config);
                const result = new target(config)
                result.$createdByReactor = true;
                result.$reactorComponentName = componentName;
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