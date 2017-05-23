# generator-ext-react 
A Yeoman generator for ExtReact apps.

## Installation

First, install [Yeoman](http://yeoman.io) and `@extjs/generator-ext-react` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo @extjs/generator-ext-react
```

## Creating a new ExtReact App

To create a new ExtReact app, run:

```bash
yo @extjs/ext-react
```

The app that is generated is based on the [ExtReact Boilerplate](https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-boilerplate).

## Development

To make changes to the generator, run:

```
git clone git@github.com:sencha/extjs-reactor.git
cd extjs-reactor
npm install
cd packages/generator-ext-react
npm link
```

Now `yo @extjs/ext-react` will use your local copy of the generator.

## License

MIT © [Sencha, Inc.]()
