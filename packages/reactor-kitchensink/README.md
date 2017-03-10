# Ext JS Reactor KitchenSink

This project shows off all Ext JS components running within React.

# Running

1. Fork/clone this repo
2. `git checkout kitchensink`
3. `npm install`
4. `lerna bootstrap` - If this fails, ensure ./node_modules/.bin is in your path by adding the following to ~/.bash_profile and restarting terminal: `export PATH=./node_modules/.bin:$PATH`
5. `cd packages/reactor-kitchensink`
7. `ln -s /path/to/ExtJS ext` - or, for Windows: `mklink ext /path/to/ExtJS` 
8. `npm start`  - or, if running against a clone of the SDK repo - `npm run local`

The application runs on [http://localhost:8084](http://localhost:8084)
