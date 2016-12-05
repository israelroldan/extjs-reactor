import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { install } from '@extjs/reactor';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
install();

// launch the react app once Ext JS is ready
Ext.onReady(() => ReactDOM.render(<App/>, document.getElementById('root')));
