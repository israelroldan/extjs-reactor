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
});