import ReactDOM from 'react-dom';

/**
 * Use this class to render a React element inside of a grid cell.
 *
 *      <Grid>
 *          <Column>
 *              <ComponentCell
 *                  renderer={record => (
 *                      <Button text={`Call ${name}`} handler={this.call.bind(this, record)}/>
 *                  )}
 *              />
 *          </Column>
 *      </Grid>
 *
 */
Ext.define('Ext.grid.cell.Component', {
    extend: 'Ext.grid.cell.Base',
    xtype: 'componentcell',

    config: {
        /**
         * @cfg {Boolean} forceWidth
         * `true` to measure the available width of the cell and set that
         * width on the underlying widget. If `false`, the widget width will auto
         * size.
         */
        forceWidth: false,

        /**
         * @cfg {Function} A function that takes an instance of Ext.data.Model and returns a React.Component to be rendered.
         *
         *      <Grid>
         *          <Column>
         *              <ComponentCell
         *                  renderer={record => (
         *                      <Button text={`Call ${name}`} handler={this.call.bind(this, record)}/>
         *                  )}
         *              />
         *          </Column>
         *      </Grid>
         */
        renderer: null
    },

    align: 'center',

    classCls: Ext.baseCSSPrefix + 'widgetcell',

    /**
     * @cfg {Boolean} selectable
     * @inheritdoc
     */
    selectable: false,

    setValue: function (value) {
        const renderer = this.getRenderer();

        if (renderer) {
            const result = ReactDOM.render(renderer(this.getRecord()), this.bodyElement.dom);

            if (result instanceof Ext.Widget) {
                this.widget = result;
            } else {
                this.widget = null;
            }
        }

        return this;
    },

    updateWidth: function(width, oldWidth) {
        Ext.grid.cell.Component.superclass.updateWidth.call(this, width, oldWidth);

        if (this.getForceWidth()) {
            this.setWidgetWidth(width);
        }
    },

    onRender: function() {
        var me = this;

        if (me.getForceWidth()) {
            me.setWidgetWidth(me.getWidth());
        }
    },

    doDestroy: function() {
        this.widget = null;
        ReactDOM.unmountComponentAtNode(this.bodyElement.dom)
        Ext.grid.cell.Component.superclass.doDestroy.call(this, value);
    },

    privates: {
        setWidgetWidth: function(width) {
            var me = this,
                el = me.bodyElement,
                widget, column, leftPad, rightPad;

            if (!me.rendered) {
                return;
            }

            widget = me.widget;

            if (widget) {
                column = me.getColumn();
                leftPad = parseInt(column.getCachedStyle(el, 'padding-left'), 10) || 0;
                rightPad = parseInt(column.getCachedStyle(el, 'padding-right'), 10) || 0;
                // Give the widget a reference to ourself to allow it to do any extra measuring
                widget.measurer = column;
                widget.setWidth(width - leftPad - rightPad);
            }
        }
    }
});
