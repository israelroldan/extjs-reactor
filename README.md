# Ext JS Reactor

The @extjs/reactor package is a custom renderer that makes it easy to use [Ext JS](https://www.sencha.com/products/extjs) components in your [React](https://facebook.github.io/react) app. Once installed, all JSX tags starting with "x-" are resolved to Ext JS components by xtype.

## Requirements

* Ext JS 6.2+
* Sencha Cmd 6.2+
* React 15.3.2+ (peer dependency)

## Installation

```bash
# Be sure to install react>=15.3.2 before
npm install --save-dev @extjs/reactor
```

## Getting Started

We recommend you start by cloning the [boilerplate project](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-boilerplate) and following the instructions there.

The boilerplate project uses the Ext JS modern toolkit. There is also a [boilerplate project using the Ext JS classic toolkit](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-classic-boilerplate).

## Basic Concepts

### Configuration

First, install the custom renderer.  We recommend doing this in your index.js file (your webpack entry point).  This only needs to be done once in your app.

```jsx
import install from '@extjs/reactor';
install();
```

If you choose to use an Ext JS component at the root of your app to handle the main layout, set the `viewport` option to `true` when installing the Ext JS renderer.  This will set the height of the html, body, and react root element to 100% so that your Ext JS root component will fill the full screen. For example:

```javascript
install({ viewport: true });
```

### Using Ext JS Components

With `@extjs/reactor` installed, all JSX tags that start with "x-" will be mapped to Ext JS components by xtype. You can override the default prefix when calling `install`, for example: `install("ext-")`.  Here's a minimal React app that renders an Ext.Panel:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import install from '@extjs/reactor';

// Install the Ext JS custom renderer
install();

// When Ext JS loads, initialize our React app
Ext.onReady(() => {
    ReactDOM.render(
        (
            <x-panel title="React Ext JS">
                Hello World!
            </x-panel>
        ),
        document.getElementById('root')
    );
});
```


React props are converted to Ext JS configs.  Here's a typical use of an Ext.grid.Grid:

```jsx
import React, { Component } from 'react';

export default class MyComponent extends Component {
    render() {        
        return (
            <x-grid
                plugins={[                
                    { type: 'columnresizing' }
                ]}
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

export default function MyComponent() {
    return (
        <x-slider
            minValue={0}
            maxValue={100}
            onChange={(slider, value) => console.log(`Value set to ${value}`)}
        />
    )
}
```


You can also use a listeners object as is common in traditional Ext JS:

```jsx
import React, { Component } from 'react';

export default function MyComponent() {
    return (
        <x-slider
            minValue={0}
            maxValue={100}
            listeners={{
                change: (slider, value) => console.log(`Value set to ${value}`)
            }}
        />
    )
}
```

### Refs

Refs point to Ext JS component instances:

```jsx
import React, { Component } from 'react';

export default class MyComponent {
    render() {
        return (
            <x-slider
                ref="slider"
                minValue={0}
                maxValue={100}
                onChange={() => this.onChange()}
            />         
        )
    }

    onChange() {
        console.log('Slider value', this.refs.slider.getValue()); // this.refs.slider is an Ext.slider.Slider
    }
}
```

### Docked Items (Classic Toolkit)

When using the Classic Toolkit, any component with a `dock` prop is automatically added to (dockedItems)[http://docs.sencha.com/extjs/6.2.0/classic/Ext.panel.Panel.html#cfg-dockedItems] for your convenience.

Here is an example which docks a toolbar above a grid:

```
<x-panel layout="fit">
    <x-toolbar dock="top">
        <x-textfield emptyText="Search..." flex={1}/>
    </x-toolbar>
    <x-grid>...</x-grid>
</x-panel>
```

### Building

Select your toolkit, theme, and packages using [@extjs/reactor-webpack-plugin]. The plugin scans your code and only includes the classes you need in the final bundle.  Here's an example:

```JavaScript
const ExtJSReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new ExtJSReactWebpackPlugin({
            sdk: 'ext', // location of Ext JS SDK
            theme: 'theme-material',
            packages: ['charts'],
            output: path.join('build', 'ext')
        })
    ]
    ...
}
```

# Development
This is a monorepo that uses lerna.  After cloning, run `npm install` then `lerna bootstrap` to install dependencies.

# Packages

* [@extjs/reactor](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor) - A custom React renderer that lets you to use any Ext JS xtype as a JSX tag
* [@extjs/reactor-webpack-plugin](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-webpack-plugin) - Integrates Webpack with Sencha Cmd to produce optimized builds of Ext JS
* [@extjs/reactor-boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-boilerplate) - An example project using React, Ext JS, and Webpack
