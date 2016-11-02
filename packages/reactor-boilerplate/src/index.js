import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components

// configure react to recognize jsx tags starting with "x-" as Ext JS components by xtype
import install from '@extjs/reactor';
install();

// launch the react app once Ext JS is ready
Ext.onReady(() => ReactDOM.render(<App/>, document.getElementById('root')));
