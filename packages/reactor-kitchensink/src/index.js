import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { install } from '@extjs/reactor';
import Data from './Data';

require('./index.css');

install({ 
    viewport: true,
    launch: target => ReactDOM.render(<App/>, target)
});
