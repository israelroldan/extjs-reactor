import ReactDOM from 'react-dom';
import ExtJSComponent from './ExtJSComponent';

export { default as Template } from './Template';

let settings = {};

// map of Ext JS class name to reactified class
const classCache = {};

/**
 * Launches an ExtReact application, creating a viewport and rendering the specified root component into it.
 * @param {React.Component} rootComponent You application's root component
 * @param {Object} [appConfig] Additional config parameters for Ext.application
 */
export function launch(rootComponent, appConfig = { }) {
    Ext.application({
        name: '$ExtReactApp',
        ...appConfig,
        launch: () => ReactDOM.render(rootComponent, Ext.Viewport.getRenderTarget().dom)
    })
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
            if (!target) throw new Error(`No xtype "${name}" found.  Perhaps you need to require it with Ext.require("${name}")?`);
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
                console.log('create', config);
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

/**
 * Configures React to resolve jsx tags.
 * @deprecated
 * @param {String} [viewport=true] Adds a stylesheet that mimics an Ext JS Viewport
 *  by setting the html, body, and react root element to height: 100%. Set this to true when using an
 *  Ext JS component at the root of your app.
 */
export function install({ viewport=false } = {}) {
    console.warn('[@extjs/reactor] Warning: install(options) is deprecated.  Use launch(<App/>, options) in place of Ext.onReady(() => ReactDOM.render(<App/>)).')
    
    settings.viewport = viewport;

    if (viewport) {
        const style = document.createElement('style');
        style.innerHTML = 'html, body, div[data-reactroot] { height: 100%; }';
        document.head.appendChild(style);
    }
};


