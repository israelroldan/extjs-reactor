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
export function reactify<Class, Props, State>(target: string | Function): Class & React.Component<Props, State>;
export function reactify<Class1, Props1, State1, Class2, Props2, State2>(target1: string | Function, target2: string | Function): [Class1 & React.Component<Props1, State1>, Class2 & React.Component<Props2, State2>];
export function reactify<Class1, Props1, State1, Class2, Props2, State2, Class3, Props3, State3>(target1: string | Function, target2: string | Function, target3: string | Function): [Class1 & React.Component<Props1, State1>, Class2 & React.Component<Props2, State2>, Class3 & React.Component<Props3, State3>];
export function reactify<Class1, Props1, State1, Class2, Props2, State2, Class3, Props3, State3, Class4, Props4, State4>(target1: string | Function, target2: string | Function, target3: string | Function, target4: string | Function): [Class1 & React.Component<Props1, State1>, Class2 & React.Component<Props2, State2>, Class3 & React.Component<Props3, State3>, Class4 & React.Component<Props4, State4>];
export function reactify(...targets: (string | Function)[]): React.Component<any, any>[];
