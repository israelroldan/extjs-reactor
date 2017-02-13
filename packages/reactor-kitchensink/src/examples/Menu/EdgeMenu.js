import React, { Component } from 'react';
import { reactify } from '@extjs/reactor';

export default reactify(Ext.define('Ext.EdgeMenu', {
    extend: 'Ext.Menu',

    config: {
        side: 'left',
        reveal: true,
        hidden: true
    },

    updateHidden: function(hidden) {
        if (hidden) {
            Ext.Viewport.hideMenu(this.side);
        } else {
            console.log('showing', this);

            Ext.Viewport.setMenu(this, {
                side: this.side,
                reveal: this.reveal
            });
            Ext.Viewport.showMenu(this.side);
        }
    }
}));
