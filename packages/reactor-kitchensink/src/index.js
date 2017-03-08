import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { launch } from '@extjs/reactor';
import Data from './Data';
import * as d3 from 'd3';

window.d3 = d3;

require('./index.css');

launch(<App/>)