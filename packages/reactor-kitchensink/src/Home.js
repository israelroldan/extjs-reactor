import React, { Component } from 'react'
import { Panel } from '@extjs/ext-react';

export default function Home(props) {
    return (
        <Panel {...props} padding={30}>
            <h1 style={styles.h1}>ExtReact Components</h1>
            <p style={styles.p}>ExtReact is a comprehensive set of powerful UI components for developing data-intensive enterprise applications using the <a target="_blank" href="https://facebook.github.io/react/">React</a> framework.</p>
            <p style={styles.p}>It includes Grids, Trees, Charts, Menus, Layouts, and many other components that can drastically reduce the time it takes you to develop your next app.</p>
        </Panel>
    )
}

const styles = {
    h1: {
        marginBottom: '30px'
    },
    p: {
        fontSize: '16px',
        lineHeight: '1.5'
    }
}