import ReactDOM from 'react-dom';

export default Ext.define('Ext.ReactTemplate', {
    extend: 'Ext.Template', 

    /**
     * @param {Function} fn A function that takes data values as an object and returns a React.Element to be rendered.
     */
    constructor(fn) {
        this.fn = fn;
    },

    apply(values) {
        const child = document.createElement('div');
        this.doRender(values, child);
        return child.innerHTML;
    },

    doInsert(where, el, values, returnElement) {
        const child = document.createElement('div');
        this.doRender(values, child);
        return Ext.dom.Helper.doInsert(el, child, returnElement, where);
    },

    overwrite(el, values, returnElement) {
        const dom = this.doRender(values, Ext.getDom(el));
        return returnElement ? new Ext.Element(dom) : dom;
    },

    doRender(values, target) {
        const reactElement = this.fn(values);
        return ReactDOM.render(reactElement, target);
    }
});