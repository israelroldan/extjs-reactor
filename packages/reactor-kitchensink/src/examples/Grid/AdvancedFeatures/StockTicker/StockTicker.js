import React, { Component } from 'react';
import { Grid, Toolbar, Button, Label, SliderField, TextField, CheckBoxField, Column } from '@extjs/reactor/modern';
import model from './StockTickerModel';
import '../../CompanyData';
import './Ticker.css';

export default class StockTickerGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: null,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Company',
            reader: {
                type: 'json',
                rootProperty: 'data',
                // Do not attempt to load orders inline.
                // They are loaded through the proxy
                implicitIncludes: false
            }
        }
    })

    init = () => {
        if(this.store.isLoaded() && this.store.getCount()) {
            this.startTicker(this.store);
        }
        this.store.on('load', 'onStoreLoad', this);
    }

    onStoreLoad = (store) => {
        this.startTicker(store);
    }

    startTicker = (store) => {
        if (this.timer) {
            return;
        }
        store.removeAt(15, 70);
        var count = store.getCount(),
            i, j, rec;

        for (i = 0; i < count; i++) {
            rec = store.getAt(i);
            rec.beginEdit();
            for (j = 0; j < 10; j++) {
                rec.addPriceTick();
            }
            rec.endEdit(true);
        }
        this.timer = setInterval(function () {
            rec = store.getAt(Ext.Number.randomInt(0, store.getCount() - 1));
            rec.addPriceTick();
        }, Ext.isIE || !Ext.is.Desktop ? 100 : 20);
        
    }

    onTickDelayChange = (slider, value, oldValue) => {
        this.viewModel.getScheduler().setTickDelay(value);
        this.setState({textfield:value})// => TypeError: Cannot read property 'viewModel' of null
    }

    destroy = () => {
        clearInterval(this.timer);
    }

    changeCheckBoxField = (checkbox) => {
        if(checkbox.isChecked()){
            this.viewModel.set('flashBackground', true)
        }
        else{
            this.viewModel.set('flashBackground', false)
        }
    }

    state = {
        textfield:200
    }

    render(){
        return(
            <Grid 
                title='Ticker Grid'
                ref={grid => this.viewModel = grid.viewModel}
                store={this.store}
                onInitialize={this.init}
                viewModel={{
                    data: {
                        flashBackground: false
                    },
                    scheduler:{
                        tickDelay: 200
                    }
                }}
                itemConfig={{
                    viewModel: {
                        formulas: {
                            cellCls: {
                                get: function(get) {
                                    return get('flashBackground') ? Ext.util.Format.sign(get('record.change'), 'ticker-cell-loss', 'ticker-cell-gain') : '';
                                }
                            }
                        }
                    }
                }}>
            <Column xtype="textcolumn" text="Company" dataIndex="name" flex="1" sortable={true}/>
            <Column xtype="textcolumn" text="Price" width="95" align="right" cell={{bind:'{record.price:usMoney}'}} sortable={true}/>
            <Column text="Trend" width="200" cell={{bind:'{record.trend}', xtype:"widgetcell", forceWidth:true, widget:{xtype:'sparkline', tipTpl:'Price: {y:number("0.00")}'}}}/>
            <Column xtype="textcolumn" text="Change" width="90" align="right" cell={{bind:{value:'{record.change:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
            <Column xtype="textcolumn" text="% Change" width="100" align="right" cell={{bind:{value:'{record.pctChange:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
            <Column xtype="textcolumn" text="Last Updated" hidden={true} width="115" cell={{bind:'{record.LastChange:date("m/d/Y H:i:s")}'}} sortable={false}/>
            <Toolbar
                docked="bottom"
                defaults={{
                    margin: '0 10 0 0'
                }}>
                <Label html="Bind tick delay"/>
                <SliderField
                    minValue= {200}
                    maxValue= {2000}
                    increment= {10}
                    liveUpdate
                    onChange={this.onTickDelayChange}
                    value={200}
                    flex='1'/>
                <TextField
                    editable={false}
                    width={80}
                    clearable={false}
                    readOnly
                    value={this.state.textfield}/>
                <CheckBoxField 
                    tooltip="Flash background color on change"
                    checked={false}
                    onChange={this.changeCheckBoxField}/>
            </Toolbar>
            </Grid>

        )
    }
}