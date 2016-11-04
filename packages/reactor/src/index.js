import ExtJSComponent from './ExtJSComponent';
import ReactHostComponent from 'react/lib/ReactHostComponent';

const original = ReactHostComponent.createInternalComponent;

/**
 * Configures React to resolve jsx tags.
 * @param {String} [prefix="x-"] All jsx tags with this prefix will be resolved to Ext JS xtypes
 * @param {String} [viewport=true] Adds a stylesheet that mimics an Ext JS Viewport
 *    by setting the html, body, and react root element to height: 100%. Set this to true when using an
 *    Ext JS component at the root of your app.
 */
export default function({ prefix="x-", viewport=false } = {}) {
    ReactHostComponent.createInternalComponent = function(element) {
        if (element.type.startsWith(prefix)) {
            return new ExtJSComponent(element);
        } else {
            return original(element);
        }
    };

    let css = '.react-extjs-host { height: 100%; }';

    if (viewport) {
        css += '\nhtml, body, div[data-reactroot] { height: 100%; }';
    }

    const style = document.createElement('style')
    style.innerHTML = css;
    document.head.appendChild(style);
}
