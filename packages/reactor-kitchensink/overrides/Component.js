Ext.define('Kitchen.override.Component', {
    override: 'Ext.Component',

    config: {
        displayed: true
    },

    updateDisplayed: function(displayed) {
        if (displayed === this.getHidden()) {
            if (displayed) {
                this.show();
            } else {
                this.hide();
            }
        }
    }
})