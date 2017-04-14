# Ext JS Reactor Babel Plugin

This [Babel](https://babeljs.io/) plugin allows you to import Ext JS Components as React Components using the following syntax...

```jsx
import { Grid, Panel } from '@extjs/ext-react';
```

... which this plugin converts to ...

```jsx
import { reactify } from '@extjs/reactor';
const Grid = reactify('grid');
const Panel = reactify('panel');
```

You can also use it to load components from the classic toolkit:

```jsx
import { Grid, Panel } from '@extjs/reactor/classic';
```

# Installation

Install via npm...

```bash
npm install --save-dev @extjs/reactor-babel-plugin
```

...then add to .babelrc:

```javascript
{
  "presets": ["es2015", "react"],
  "plugins": ["@extjs/reactor-babel-plugin"]
}
```