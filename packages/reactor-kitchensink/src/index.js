import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { install } from '@extjs/reactor';

require('./index.css');

install({ viewport: true });

// launch the react app once Ext JS is ready
Ext.application({
    launch: () => {
        console.log(Ext.Viewport.el.dom);
        ReactDOM.render(<App/>, Ext.Viewport.el.dom);
    }
})
