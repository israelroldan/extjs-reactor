'use strict';

import React from 'react';
import configureExtJS from '../index';
import ReactTestUtils from 'react-addons-test-utils';
import { getInstanceFromNode } from 'react/lib/ReactDOMComponentTree';
import ReactDOM from 'react-dom';
import expectDOMStructure from './expectDOMStructure';
import mockExt from './mockExt';

configureExtJS();

describe('ExtJSComponent', () => {
    let container;

    beforeEach(() => {
        mockExt();
        container = document.createElement('div');
    });

    it('renders the host component', () => {
        const component = <div><x-panel><x-button></x-button></x-panel></div>;
        ReactDOM.render(component, container);
        
        expectDOMStructure(container.firstChild, {
            nodeName: 'DIV',
            children: [{
                nodeName: 'DIV',
                class: 'react-extjs-host',
                children: [{
                    nodeName: 'DIV', 
                    class: 'x-panel'
                }]
            }]
        })
    });

    it('renders an Ext JS Component at the root', () => {
        const component = <x-panel><x-button></x-button></x-panel>;
        ReactDOM.render(component, container);
        
        expectDOMStructure(container.firstChild, {
            nodeName: 'DIV',
            class: 'react-extjs-host',
            children: [{
                nodeName: 'DIV', 
                class: 'x-panel'
            }]
        })
    })

    it('destroys removed components', () => {
        ReactDOM.render(<div><x-panel>Test</x-panel></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div></div>, container);

        expect(panel.destroy.calledOnce).toBe(true);
        expectDOMStructure(container.firstChild, {
            nodeName: 'DIV'
        })
    });

    it('inserts new components', () => {
        ReactDOM.render(<div><x-panel></x-panel></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div><x-panel><x-button/></x-panel></div>, container);
        expect(panel.add.calledOnce).toBe(true);

        expectDOMStructure(container.firstChild.firstChild, {
            nodeName: 'DIV',
            class: 'react-extjs-host',
            children: [{
                nodeName: 'DIV', 
                class: 'x-panel',
                children: [{
                    nodeName: 'DIV', 
                    class: 'x-button'
                }]
            }]
        });
    });

    it('swaps components', () => {
        ReactDOM.render(<div><x-panel/></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div><x-button/></div>, container);
        expect(panel.destroy.calledOnce).toBe(true);
        expectDOMStructure(container.firstChild.firstChild, {
            nodeName: 'DIV',
            class: 'react-extjs-host',
            children: [{
                nodeName: 'DIV', 
                class: 'x-button'
            }]
        });
    });

    it('inserts a component before an existing child', () => {
        ReactDOM.render(<div><x-panel><x-panel/></x-panel></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div><x-panel><x-button/><x-panel/></x-panel></div>, container);
        expect(panel.insert.calledOnce).toBe(true);

        expectDOMStructure(container.firstChild.firstChild, {
            nodeName: 'DIV',
            class: 'react-extjs-host',
            children: [{
                nodeName: 'DIV', 
                class: 'x-panel',
                children: [{
                    nodeName: 'DIV', 
                    class: 'x-button'
                }, {
                    nodeName: 'DIV', 
                    class: 'x-panel'
                }]
            }]
        });
    })
});

