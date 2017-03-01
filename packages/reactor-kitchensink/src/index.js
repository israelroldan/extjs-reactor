import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { install } from '@extjs/reactor';
import Data from './Data';
import * as d3 from 'd3';

window.d3 = d3;

require('./index.css');

install({ 
    viewport: true,
    launch: target => ReactDOM.render(<App/>, target)
});
