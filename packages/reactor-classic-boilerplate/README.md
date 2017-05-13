# Ext JS Reactor Classic Boilerplate

A foundation for React apps that use Classic Ext JS components.

## Requirements

* Ext JS 6.2+
* Sencha Cmd 6.2+

## Quick Start

If you haven't already, download Ext JS 6.2+ and Sencha Cmd 6.2+.

Then, run the following to clone and build the project:

    git clone git@github.com:sencha/extjs-reactor.git
    cd extjs-reactor/packages/reactor-classic-boilerplate
    npm install

Copy or link your Ext JS SDK into packages/reactor-classic-boilerplate/ext.  On Mac OS and Linux, this can be done with the following command:

```
ln -s /path/to/ExtJS ext
```

Or on windows:

```
mklink ext /path/to/ExtJS
```

Then run:

    npm start

This builds and serves the app using webpack-dev-server.

You can view the app by pointing your browser to [http://localhost:8081](http://localhost:8081)

