export default Ext.define(null, {
    extend: 'Ext.d3.legend.Color',

    renderItems: function (items) {
        var me = this,
            ticks = [200,100,40,20,10,6,2];

        me.onAddItems(me.getRenderedItems().data(ticks).enter());
        me.onUpdateItems(me.getRenderedItems().data(ticks));
        me.onRemoveItems(me.getRenderedItems().data(ticks).exit());
    }
});