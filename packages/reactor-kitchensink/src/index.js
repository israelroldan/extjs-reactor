import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@extjs/reactor';
import App from './App'
import Data from './Data';
import * as d3 from 'd3';

window.d3 = d3;

let viewport;

require('./index.css');

const render = (Component, target) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        target
    )
}

launch(target => {
    let top = Ext.get('loadingSplashTop'), wrapper = Ext.get('loadingSplash');
    top.on('transitionend', wrapper.destroy, wrapper, { single: true });
    wrapper.addCls('app-loaded');        
    render(App, viewport = target);
}, { 
    debug: false 
}, {
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

if (module.hot) {
    module.hot.accept('./App', () => render(App, viewport));
}