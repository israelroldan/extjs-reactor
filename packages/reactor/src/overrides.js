import Template from './Template';

// add support for functions that return JSX elements in place of XTemplates

const getTpl = Ext.XTemplate.getTpl;
const originalGet = Ext.XTemplate.get;

Ext.XTemplate.get = function(fn) {
    if (typeof(fn) === 'function') {
        return new Template(fn);
    } else {
        return originalGet.apply(Ext.XTemplate, arguments);
    }
}

Ext.XTemplate.getTpl = function() {
    return getTpl.apply(Ext.XTemplate, arguments); 
}

// automatically persist event before rippling

const originalRipple = Ext.dom.Element.prototype.ripple;

Ext.dom.Element.prototype.ripple = function(event) {
    if (event && event.persist) event.persist();
    return originalRipple.apply(this, arguments);
} 
