import React = require('react')

export interface InstallOptions {
    /**
     * Adds a stylesheet that mimics an Ext JS Viewport by setting the html, body, and react root element to height: 100%.
     * Set this to true when using an Ext JS component at the root of your app.
     */
    viewport: boolean;
}

/**
 * Configures React.
 */
export function install(options: Partial<InstallOptions>): void;

/**
 * Creates a react component for a given Ext JS component.
 * For example: const Grid = reactify('grid');
 * @param target xtype or instance of Ext.Class.
 */
export function reactify<Class, Property, State>(target: string | Function): Class & React.Component<Property, State>;
