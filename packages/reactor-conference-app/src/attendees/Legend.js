export default Ext.define(null, {
    extend: 'Ext.d3.legend.Color',

    updateItems: function (items) {
        var me = this,
            itemSelection = me.getRenderedItems(),
            ticks, updateSelection;

        ticks = [200,100,40,20,10,6,2];

        updateSelection = itemSelection.data(ticks);

        me.onAddItems(updateSelection.enter());
        me.onUpdateItems(updateSelection);
        me.onRemoveItems(updateSelection.exit());
    }
});