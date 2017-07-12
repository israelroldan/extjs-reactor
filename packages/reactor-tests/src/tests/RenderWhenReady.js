import React, { Component } from 'react';
import { renderWhenReady } from '@extjs/reactor'
import { Button } from '@extjs/ext-react'

class App extends Component {
    render() {
        return <Button itemId="button" text="Button"/>
    }
}

const AppWhenReady = renderWhenReady(App);

export default function RenderWhenReadyTest() {
    return <AppWhenReady/>
}