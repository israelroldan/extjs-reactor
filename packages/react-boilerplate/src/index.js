import React from 'react';
import ReactDOM from 'react-dom';
import installExtJSRenderer from '@extjs/react';

// app components
import App from './App';

// configure react to recognize jsx tags starting with "x-" as Ext JS components by xtype
installExtJSRenderer();

// launch the react app once Ext JS is ready
Ext.onReady(() => ReactDOM.render(<App/>, document.getElementById('root')));
