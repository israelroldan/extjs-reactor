import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@extjs/reactor';
import App from './App'

const render = Component => {
  const target = Ext.Viewport.getRenderTarget().dom;

  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    target
  )
}

Ext.application({
  name: 'ExtReactApp',
  launch: () => {
    render(App)
  }
})

if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
}

