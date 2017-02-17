module.exports = {
    sdk: 'ext', // you need to copy the Ext JS SDK to the root of this package, or you can specify a full path to some other location
    theme: './ext-material',
    asynchronous: true,
    packages: [
        'font-ext', 
        'ux', 
        'font-awesome', 
        'exporter', 
        'pivot', 
        'calendar', 
        'charts'
    ]
}