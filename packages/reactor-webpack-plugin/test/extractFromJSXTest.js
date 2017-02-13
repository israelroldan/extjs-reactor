const { expect } = require('chai');
const extractFromJSX = require('../dist/extractFromJSX');

describe('extractFromJSX', () => {

    it('should parse object spread', () => {
        const statements = extractFromJSX(`
            import { Panel } from '@extjs/reactor/modern';
            const props = { foo: 'bar' };
            const comp = <Panel {...props}/>
        `);

        expect(statements).to.include('Ext.create({xtype: "panel"})')
    });

    it('should handle class properties', () => {
        const statements = extractFromJSX(`
            import { Panel } from '@extjs/reactor/modern';
            import { Component, PropTypes } from 'react';

            class MyComponent extends Component {
                static propTypes = {
                    foo: PropTypes.string.isRequired
                }

                render () {
                    return <Panel shadow/>
                }
            }
        `);

        expect(statements).to.include('Ext.create({xtype: "panel"})')
    });

    it('should handle a prop without a value', () => {
        const statements = extractFromJSX(`
            import { Panel } from '@extjs/reactor/modern';
            import { Component, PropTypes } from 'react';

            class MyComponent extends Component {
                render () {
                    return <Panel shadow/>
                }
            }
        `);

        expect(statements).to.include('Ext.create({xtype: "panel"})')
    });

    it('should handle reactify(class)', () => {
        const statements = extractFromJSX(`
            import { reactify } from '@extjs/reactor';
            const Panel = reactify(Ext.panel.Panel);

            class MyComponent extends Component {
                render () {
                    return <Panel shadow/>
                }
            }
        `);

        expect(statements).to.include('Ext.create({xclass: "Ext.panel.Panel"})')
    });
    
});