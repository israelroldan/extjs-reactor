# React + Ext JS Classic Boilerplate

A foundation for React apps that use the Ext JS modern toolkit.

## Requirements

* Ext JS 6.2+

## Quick Start

If you haven't already, download Ext JS 6.2+.

Then, run the following to clone and build the project:

    git clone https://github.com/sencha/extjs-reactor.git
    cd extjs-reactor/packages/reactor-classic-boilerplate
    npm install

Copy or link your Ext JS SDK into packages/reactor-classic-boilerplate/ext.  On Mac OS and Linux, this can be done with the following command:

```
ln -s /path/to/ext-6.x.x ext
```

Or on windows:

```
mklink ext c:\path\to\ext-6.5.x
```

Then run:

    npm start

This builds and serves the app using webpack-dev-server.

You can view the app by pointing your browser to [http://localhost:8081](http://localhost:8081)

