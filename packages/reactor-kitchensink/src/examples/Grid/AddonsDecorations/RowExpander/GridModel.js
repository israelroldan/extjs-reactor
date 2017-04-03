export default Ext.define('RowExpanderGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name'},
        { name: 'phone',
            validators: [
                { 
                    type: 'format', 
                    matcher: /^\d{3}-?\d{3}-?\d{4}$/,
                    message: 'Must be in the format xxx-xxx-xxxx'
                }
            ]
        },
        { name: 'price', type: 'float'},
        { name: 'priceChange', type: 'float' },
        { name: 'priceChangePct', type: 'float' },
        { name: 'priceLastChange', type: 'date' },
        {
            name: 'trend',
            calculate: function(data) {
                var trend = data['trend'] || (data['trend'] = []);
                trend.push(data.price);
                if (trend.length > 10) {
                    trend.shift();
                }
                return trend;
            },
            isEqual: function() {
                return false;
            }
        },
        {
            name: 'change',
            type: 'float',
            calculate: function(data) {
                var trend = data.trend,
                    len = trend.length;
                return len > 1 ? trend[len - 1] - trend[len - 2] : 0;
            }
        },
        {
            name: 'pctChange',
            type: 'float',
            calculate: function(data) {
                var trend = data.trend,
                    len = trend.length;
                return len > 1 ? (data.change / trend[len - 2]) * 100 : 0;
            }
        },
        {
            name: 'lastChange',
            type: 'date',
            calculate: function(data) {
                data.price;
                return new Date();
            }
        },
        {name: 'industry'},
        {name: 'desc'},
        {
            name: 'rating',
            type: 'int',
            calculate: function(data) {
                var pct = data.pctChange;
                return (pct < 0) ? 2 : ((pct < 1) ? 1 : 0);
            }
        }
    ],
})