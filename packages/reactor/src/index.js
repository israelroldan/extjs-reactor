import ReactDOM from 'react-dom';
import './overrides';
import { configure } from './reactify';

export { reactify } from './reactify';
export { default as Template } from './Template';
export { default as renderWhenReady } from './renderWhenReady';

const Ext = window.Ext;

/**
 * Launches an ExtReact application, creating a viewport and rendering the specified root component into it.
 * @param {React.Component/Function} rootComponent You application's root component, or a function that returns the root component.
 * @param {Object} [options] Additional config parameters for reactor.
 * @param {Object} options.debug Set to true to show debug information in the console related to creating, updating, and destroying Ext JS components.
 * @param {Object} options.viewport  When using Ext JS classic, set to true to have the root component sized to the full height and width of the window.
 * @param {Object} [appConfig] Additional config parameters for Ext.application
 */
export function launch(rootComponent, options = { debug: false, viewport: false }, appConfig = { }) {
    configure(options);

    Ext.namespace('Ext.reactor').ReactDOM = ReactDOM; // needed for RendererCell and any other components that can render React elements;

    Ext.application({
        name: '$ExtReactApp',
        ...appConfig,
        launch: () => {
            if (Ext.Viewport && Ext.Viewport.getRenderTarget) {
                // modern, ext-react
                const target = Ext.Viewport.getRenderTarget().dom;
    
                if (typeof rootComponent === 'function') {
                    rootComponent = rootComponent(target);
                }
    
                if (rootComponent) {
                    ReactDOM.render(rootComponent, target);
                }
            } else {
                // classic
                if (options.viewport || rootComponent) {
                    const style = document.createElement('style');
                    style.innerHTML = 'html, body, div[data-reactroot] { height: 100%; }';
                    document.head.appendChild(style);
                }

                const target = document.createElement('div');
                target.setAttribute('data-reactroot', 'on');
                document.body.appendChild(target);

                if (typeof rootComponent === 'function') {
                    rootComponent = rootComponent(target);
                }

                if (rootComponent) {
                    ReactDOM.render(rootComponent, target);
                }
            }
        }
    });
}

/**
 * Configures React to resolve jsx tags.
 * @deprecated
 * @param {Object} options
 * @param {String} options.viewport When true, adds a stylesheet that mimics an Ext JS Viewport
 *  by setting the html, body, and react root element to height: 100%. Set this to true when using an
 *  Ext JS component at the root of your app.
 */
export function install(options) {
    if (options.viewport) {
        console.warn('[@extjs/reactor] Warning: install({ viewport: true }) is deprecated.  Use launch(<App/>) in place of Ext.onReady(() => ReactDOM.render(<App/>, document.getElementById(\'root\'))).')
    } else {
        console.warn('[@extjs/reactor] Warning: install() is deprecated.  Use launch(() => ReactDOM.render(<App/>, document.getElementById(\'root\'))) in place of Ext.onReady(() => ReactDOM.render(<App/>, document.getElementById(\'root\'))).')
    }
    
    launch(null, options);
};
