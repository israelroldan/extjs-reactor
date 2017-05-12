# Ext JS Reactor KitchenSink

This project shows off all Ext JS components running within React.

# Running Against Local SDK

1. Fork/clone this repo
2. `git checkout kitchensink`
3. `npm adduser --registry=test.npm.sencha.com --scope=@extjs` Use support portal credentials.  Replate "@" with ".." in username.
4. `npm install`
5. `cd packages/reactor-kitchensink`
6. `ln -s /path/to/ExtJS ext` - or, for Windows: `mklink ext /path/to/ExtJS` 
7. `npm run local`

The application runs on [http://localhost:8084](http://localhost:8084)
