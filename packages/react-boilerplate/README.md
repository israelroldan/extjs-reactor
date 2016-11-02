# React Ext JS Boilerplate

A foundation for React apps that use Ext JS components.

## Requirements

* Ext JS 6.2+
* Sencha Cmd 6.2+

## Quick Start

If you haven't already, download Ext JS 6.2+ and Sencha Cmd 6.2+.

Then, run the following to clone and build the project:

    git clone git@github.com:sencha/react-extjs.git
    cd react-extjs
    npm install
    lerna bootstrap

Copy your Ext JS SDK into react-extjs/react-extjs-boilerplate/ext, then run:

    cd packages/react-extjs-boilerplate
    npm run build
    npm start

Go to http://localhost:8080

If you'd like to play around and make changes, you can run `npm run watch` to rebuild on save.
