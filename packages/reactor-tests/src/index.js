import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { launch } from '@extjs/reactor';

launch(<App/>, {}, { debug: true });