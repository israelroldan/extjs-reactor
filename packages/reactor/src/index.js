import React, { Component } from 'react';
import reactify from './reactify';

/**
 * Configures React to resolve jsx tags.
 * @param {String} [viewport=true] Adds a stylesheet that mimics an Ext JS Viewport
 *    by setting the html, body, and react root element to height: 100%. Set this to true when using an
 *    Ext JS component at the root of your app.
 */
export function install({ viewport=false } = {}) {
    let css = '.react-extjs-host { height: 100%; }';

    if (viewport) {
        css += '\nhtml, body, div[data-reactroot] { height: 100%; }';
    }

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
};

export { reactify };