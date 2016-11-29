import React from 'react';
import ReactDOM from 'react-dom';

import { install } from '@extjs/reactor';
install({ viewport: true });

// app components
import App from './App';

Ext.onReady(() => {
    ReactDOM.render(<App/>, document.getElementById('root'));
})
