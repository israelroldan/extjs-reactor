import ReactDOM from 'react-dom';
import './overrides';
import { configure } from './reactify';

export { reactify } from './reactify';
export { default as Template } from './Template';
export { default as Transition } from './Transition';

/**
 * Launches an ExtReact application, creating a viewport and rendering the specified root component into it.
 * @param {React.Component/Function} rootComponent You application's root component, or a function that returns the root component.
 * @param {Object} [appConfig] Additional config parameters for Ext.application
 * @param {Object} [reactorSettings] Additional config parameters for reactor.
 * @param {Object} reactorSettings.debug Set to true to show debug information in the console related to creating, updating, and destroying Ext JS components.
 */
export function launch(rootComponent, appConfig = { }, reactorSettings = { debug: false }) {
    configure(reactorSettings);

    Ext.application({
        name: '$ExtReactApp',
        ...appConfig,
        launch: () => {
            if (typeof rootComponent === 'function') rootComponent = rootComponent();
            ReactDOM.render(rootComponent, Ext.Viewport.getRenderTarget().dom)
        }
    });
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
    
    configure({ viewport });

    if (viewport) {
        const style = document.createElement('style');
        style.innerHTML = 'html, body, div[data-reactroot] { height: 100%; }';
        document.head.appendChild(style);
    }
};


