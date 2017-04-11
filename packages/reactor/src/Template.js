import ReactDOM from 'react-dom';

/**
 * A implementation of Ext.Template that supports React elements (JSX).
 * 
 * Usage:
 * 
 *  const tpl = new Template(data => (
 *      <div>
 *          <div>{data.firstName} {data.lastName}</div>    
 *          <div>{data.title}</div>
 *      </div>
 *  ))
 * 
 *  const html = tpl.apply({ firstName: 'Joe', lastName: 'Smith', title: 'CEO' });
 */
const Template = Ext.define(null, {
    extend: 'Ext.Template', 

    /**
     * @param {Function} fn A function that takes data values as an object and returns a React.Element to be rendered.
     */
    constructor(fn) {
        this.fn = fn;
    },

    // overrides Ext.Template
    apply(values) {
        const target = this.getCachedTarget();
        this.doRender(values, target);
        const result = target.innerHTML;
        target.innerHTML = '';
        return result;
    },

    // overrides Ext.Template
    doInsert(where, el, values, returnElement) {
        const target = this.getCachedTarget();
        this.doRender(values, target);
        return Ext.dom.Helper.doInsert(el, target.firstChild, returnElement, where);
    },

    // overrides Ext.Template
    overwrite(el, values, returnElement) {
        const dom = this.doRender(values, Ext.getDom(el));
        return returnElement ? new Ext.Element(dom) : dom;
    },

    /**
     * @private
     * @return {HTMLElement}
     */
    getCachedTarget() {
        if (!this.cachedTarget) this.cachedTarget = document.createElement('div');
        return this.cachedTarget;
    },

    /**
     * Renders the result of this.fn to the specified target
     * @private
     * @param {Object} values Values to pass to this.fn
     * @param {HTMLElement} target The element into which the result should be rendered.
     * @return {HTMLElement} The newly rendered element
     */
    doRender(values, target) {
        const reactElement = this.fn(values);
        ReactDOM.render(reactElement, target);
        return target.firstChild;
    }
});

export default Template;

// Hook Ext.XTemplate.get so that we can just pass a function that returns JSX in place of a XTemplate.

