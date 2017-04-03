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
        }, {
            name: 'lastChange',
            type: 'date',
            calculate: function(data) {
                data.price;
                return new Date();
            }
        },
        {name: 'industry'},
        {name: 'desc'}
    ],
})