import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // app components
import { launch } from '@extjs/reactor'; 
import Data from './Data';
import * as d3 from 'd3';
 
window.d3 = d3;
   
require('./index.css');
 
launch(() => {         
    let top = Ext.get('loadingSplashTop'), wrapper = Ext.get('loadingSplash');
    top.on('transitionend', wrapper.destroy, wrapper, { single: true });
    wrapper.addCls('app-loaded');        
    return <App/>;
}, { debug: false }, {
    quickTips: {
        tooltip: {
            // show qtips on tap on mobile
            showOnTap: true
        },
        overflowTip: {
            // This means that mouseover (or a touch)
            // cancels the auto dismiss timer to give the
            // user an opportunity to read long text.
            // Tap outside of the tip then closes it.
            allowOver: true
        }
    }    
})    
