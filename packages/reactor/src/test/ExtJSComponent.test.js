'use strict';

import React from 'react';
import { install, reactify } from '../index';
import { getInstanceFromNode } from 'react-dom/lib/ReactDOMComponentTree';
import ReactDOM from 'react-dom';
import expectDOMStructure from './expectDOMStructure';
import mockExt from './mockExt';

install();


describe('ExtJSComponent', () => {
    let container, Panel, Button;

    beforeEach(() => {
        mockExt();
        [ Panel, Button ] = reactify('panel', 'button');
        container = document.createElement('div');
    });

    it('renders the host component', () => {
        const component = <div><Panel><Button></Button></Panel></div>;
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
        const component = <Panel><Button></Button></Panel>;
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
        ReactDOM.render(<div><Panel>Test</Panel></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div></div>, container);

        expect(panel.destroy.calledOnce).toBe(true);
        expectDOMStructure(container.firstChild, {
            nodeName: 'DIV'
        })
    });

    it('inserts new components', () => {
        ReactDOM.render(<div><Panel></Panel></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div><Panel><Button/></Panel></div>, container);
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
        ReactDOM.render(<div><Panel/></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div><Button/></div>, container);
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
        ReactDOM.render(<div><Panel><Panel/></Panel></div>, container);
        const panel = container.firstChild.firstChild.firstChild._extCmp;
        ReactDOM.render(<div><Panel><Button/><Panel/></Panel></div>, container);
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

