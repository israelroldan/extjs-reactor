import ExtJSComponent from './ExtJSComponent';
import ReactHostComponent from 'react/lib/ReactHostComponent';

const original = ReactHostComponent.createInternalComponent;

/**
 * Configures React to resolve jsx tags.
 * @param {String} [prefix="x-"] All jsx tags with this prefix will be resolved to Ext JS xtypes
 * @param {String} [autoFillContainer=true] Adds a stylesheet that forces all Ext JS components to fill their non-Ext JS containers.
 */
export default function({ prefix="x-", autoFillContainer=true } = {}) {
    ReactHostComponent.createInternalComponent = function(element) {
        if (element.type.startsWith(prefix)) {
            return new ExtJSComponent(element);
        } else {
            return original(element);
        }
    };

    if (autoFillContainer) {
        const style = document.createElement('style')
        style.innerHTML = `
            div[data-reactroot],
            .react-extjs-host {
                height: 100%;
            }
        `;
        document.head.appendChild(style);
    }
}