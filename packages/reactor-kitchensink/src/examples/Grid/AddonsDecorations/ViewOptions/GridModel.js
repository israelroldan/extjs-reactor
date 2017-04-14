export default Ext.define('ViewOptionsGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'name'
        }, {
            name: 'phone',
            validators: [
                { 
                    type: 'format', 
                    matcher: /^\d{3}-?\d{3}-?\d{4}$/,
                    message: 'Must be in the format xxx-xxx-xxxx'
                }
            ]
        }, {
            name: 'price',
            type: 'float'
        }, {
            name: 'priceChange',
            type: 'float'
        }, {
            name: 'priceChangePct',
            type: 'float'
        }, {
            name: 'priceLastChange',
            type: 'date'
        }, {
            name: 'trend',
            calculate: function (data) {
                var trend = data['trend'] || (data['trend'] = []);
                trend.push(data.price);
                if (trend.length > 10) {
                    trend.shift();
                }
                return trend;
            },
            isEqual: function () {
                return false;
            }
        }, {
            name: 'lastChange',
            type: 'date',
            calculate: function (data) {
                data.price;
                return new Date();
            }
        }, {
            name: 'industry'
        }, {
            name: 'desc'
        }
    ],
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: 'resources/data/CompanyData.json'
    },
    validators: {
        name: 'presence'
    },
    addPriceTick: function () {
        this.set('price', this.generateNewPrice(), {dirty: false});
    },
    generateNewPrice: function () {
        var newPrice = Math.abs(this.data.price + Ext.Number.randomInt(-2345, 2345) / 100);
        return Math.round(newPrice * 100) / 100;
    }
})