# Ext JS Reactor

The @extjs/reactor package makes it easy to use [Ext JS](https://www.sencha.com/products/extjs) components in your [React](https://facebook.github.io/react) app. 

[![Join the chat at https://gitter.im/sencha/extjs-reactor](https://badges.gitter.im/gitterHQ/gitterHQ.github.io.svg)](https://gitter.im/sencha/extjs-reactor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Requirements

* React 15.4.0+ (peer dependency)
* Ext JS 6.5+
* Sencha Cmd 6.5+

## Installation

```bash
# Be sure to install react>=15.4.0 before
npm install --save @extjs/reactor
npm install --save-dev @extjs/reactor-webpack-plugin @extjs/reactor-babel-plugin
```

## Getting Started

If you're starting from scratch with Ext JS and React, we recommend cloning one of the boilerplates and following the instructions there:

* [ExtReact Boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-boilerplate)
* [React + Ext JS Classic Boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-classic-boilerplate)
* [React + Ext JS Modern Boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-modern-boilerplate)

## Basic Concepts

### Launching Your App

To launch your app, add the following to your index.js file (your webpack entry point):

```jsx
import { launch } from '@extjs/reactor';
import App from './App';

launch(<App/>);
```

The `launch` function renders `<App/>` into the document body as a fullscreen component.  If you do not want this component to be fullscreen, you can render it to a target element using:

```jsx
import ReactDOM from 'react-dom';
import { launch } from '@extjs/reactor';
import App from './App';

launch(() => ReactDOM.render(<App/>, document.getElementById('root')));
```

The call to `launch` replaces the typical code for launching a React app, which generally looks something like:

```jsx
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));
```

### Hello World

Here's a minimal React app that renders an `Ext.Panel` from the classic toolkit:

```jsx
import React from 'react';
import { launch } from '@extjs/reactor';
import { Panel } from '@extjs/reactor/classic';

launch(
    <Panel title="ExtReact">
        Hello World!
    </Panel>
);
```

### Importing Components

Any Ext JS component can be imported by the capitalized, camel-cased version of it's xtype.  For example, 

```jsx
import { Grid } from '@extjs/reactor/classic';
```

Dashes in xtypes should be converted to underscores.  For example:

```jsx
import { D3_HeatMap } from '@extjs/reactor/classic';
```

### Configuring Components

React props are converted to Ext JS configs.  Here's a typical use of `Ext.grid.Panel`:

```jsx
import React, { Component } from 'react';
import { Grid } from '@extjs/reactor/classic';

export default class MyComponent extends Component {

    render() {        
        return (
            <Grid
                columns={[
                    { text: 'Name', dataIndex: 'name' },
                    { text: 'Email', dataIndex: 'email' }
                ]}
                store={{
                    fields: ['name', 'email'],
                    data: [
                        { name: 'Tim Smith', email: 'tim101@gmail.com' },
                        { name: 'Jill Lindsey', email: 'jlindsey890@gmail.com' }
                    ]
                }}
            />
        )
    }

}
```

### Handling Events

Any prop starting with "on" followed by a capital letter is automatically converted to an Ext JS event listener.  Since Ext JS events are all lower-case, case is not preserved.  You're free to use camel-case, which is common in React.

```jsx
import React, { Component } from 'react';
import { Slider } from '@extjs/@extjs/reactor/classic';

export default function MyComponent() {
    return (
        <Slider
            minValue={0}
            maxValue={100}
            onChange={(slider, value) => console.log(`Value set to ${value}`)}
        />
    )
}
```

Event handler props can also take an object with additional options:

```jsx
<Button 
    onAfterRender={{
        single: true, // handler will only be called once
        fn: () => {...}
    }}
/>
```

You can also use a listeners object as is common in traditional Ext JS:

```jsx
import React, { Component } from 'react';
import { Slider } from '@extjs/reactor/classic';

export default function MyComponent() {
    return (
        <Slider
            minValue={0}
            maxValue={100}
            listeners={{
                change: (slider, value) => console.log(`Value set to ${value}`)
            }}
        />
    )
}
```

### Special Props

#### defaults

Use the defaults prop to apply a set of props to all children.  For example, to use flex: 1 for all items in a container:

```jsx
<Container layout="vbox" defaults={{ flex: 1 }}>
    <Container>Item</Container>
</Container>
```

### Refs

Refs point to Ext JS component instances:

```jsx
import React, { Component } from 'react';
import { Slider } from '@extjs/reactor/classic';

export default class MyComponent {
    render() {
        return (
            <Slider
                ref={ slider => this.slider = slider }
                minValue={0}
                maxValue={100}
                onChange={() => this.onChange()}
            />         
        )
    }

    onChange() {
        console.log('Slider value', this.slider.getValue()); // this.slider is an Ext.slider.Single
    }
}
```

### Docked Items (Classic Toolkit)

When using the Ext JS classic toolkit, any component with a `dock` prop is automatically added to (dockedItems)[http://docs.sencha.com/extjs/6.2.0/classic/Ext.panel.Panel.html#cfg-dockedItems].

Here is an example which docks a toolbar above a grid:

```jsx
import { Grid, Panel, Toolbar, TextField } from '@extjs/reactor/classic';

function MyComponent(props) {
    return (
        <Panel layout="fit">
            <Toolbar dock="top">
                <TextField emptyText="Search..." flex={1}/>
            </Toolbar>
            <Grid>...</Grid>
        </Panel>
    )
}
```

### Using HTML Elements and Non-Ext JS Components Inside of Ext JS Components

HTML elements and other non-Ext JS React components are wrapped in an Ext.Component instance when they appear within an Ext JS Component.  This is allows Ext JS layouts to work with non-Ext JS components.  For example...

```jsx
<Panel layout="hbox">
    <div>left</div>
    <div>right</div>
</Panel>
```
... will result in two divs side-by-side.  The component structure created is equivalent to:

```javascript
Ext.create({
    xtype: 'panel',
    layout: 'hbox'
    items: [{
        xtype: 'component',
        html: '<div>left</div>'
    }, {
        xtype: 'component',
        html: '<div>right</div>'
    }]
});
```

When an Ext JS component contains only text, that text will be set as the html config of the component.  For example...

```jsx
<Panel>Hello World!</Panel>
```

... results in ...

```javascript
Ext.create({
    xtype: 'panel',
    html: 'Hello World!'
});
```

### Using Custom Ext JS Components

You can import custom Ext JS components in much the same way you would those from Ext JS itself.  Just reference the camel-case version of the component's xtype.

For example, given the following component:

```javascript
Ext.define('MyPackage.view.MyGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'mygrid'
})
```

You could import and use that component using:

```jsx
import { MyGrid } from '@extjs/reactor/classic';
```

If your component doesn't have an xtype, you can using the `reactify` function to convert any Ext JS component into a react component:

```jsx
import { reactify } from '@extjs/reactor';

const MyGrid = reactify(MyPackage.view.MyGrid);

function MyComponent() {
    return (
        <MyGrid/>
    )
}
```

### Building

Select your toolkit, theme, and packages using [@extjs/reactor-webpack-plugin](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-webpack-plugin). The plugin scans your code and only includes the classes you need in the final bundle.  Here's an example:

```JavaScript
const ExtJSReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new ExtJSReactWebpackPlugin({
            sdk: 'ext', // location of Ext JS SDK.  You can either copy the sdk into your project or create a symbolic link to it.
            theme: 'theme-material', // the name of an Ext JS theme or a relative path to a custom theme
            toolkit: 'classic',
            packages: ['charts']
        })
    ]
    ...
}
```

We recommend creating a symbolic link called "ext" in the root of your project that points to your local copy of the Ext JS SDK.  You can do this on Mac OS and linux with the following command:

```
ln -s /path/to/ext-6.x.x ext
```

Or on windows:

```
mklink ext c:\path\to\ext-6.5.x
```



If you're using Babel, we recommend adding `@extjs/reactor-babel-plugin` to your .babelrc.  The `reactor-babel-plugin` require module compilation to be turned off.  For example:

```javascript
{
  "presets": [
    [ "es2015", { "modules": false } ],
    "stage-2",
    "react"
  ],
  "plugins": [
    "@extjs/reactor-babel-plugin",
    "transform-runtime"
  ]
}
```

# Development
This is a monorepo that uses lerna.  After cloning, run `npm install` at the root of the project tree to install and link dependencies in all packages.

# Packages

* [@extjs/reactor](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor) - A custom React renderer that lets you to use any Ext JS xtype as a JSX tag
* [@extjs/reactor-webpack-plugin](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-webpack-plugin) - Integrates Webpack with Sencha Cmd to produce optimized builds of Ext JS
* [@extjs/reactor-babel-plugin](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-babel-plugin) - Allows you to load reactified Ext JS components using ES6 import syntax.
* [@extjs/reactor-boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-boilerplate) - An example project using React, Webpack, and Ext JS 6 with the modern toolkit.
* [@extjs/reactor-classic-boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-classic-boilerplate) - An example project using React, Webpack, and Ext JS 6 with the classic toolkit.

# Contributing

## Contributor License Agreement

We'd love to accept patches and new boilerplates.  Before we can take them, we need you to sign [this CLA](Sencha-CLA.pdf).

Once we receive it, we'll be able to accept your pull requests.

## Contributing a Patch
1. Submit an issue describing your proposed change.
2. The repo owner will respond to your issue promptly.
3. If your proposed change is accepted, fork the repo, develop and test your code changes.
4. Submit a pull request.
