import React, { Component } from 'react';
import { Grid, Toolbar, Button, Label, SliderField, TextField, CheckBoxField, Column, TextColumn, WidgetCell, SparkLineLine } from '@extjs/reactor/modern';
import model from './StockTickerModel';
import '../../CompanyData';
import './Ticker.css';

export default class StockTickerGridExample extends Component {

    state = {
        tickDelay: 200
    };

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
    });

    componentDidMount() {
        this.viewModel = this.grid.viewModel;
    }

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

        let count = store.getCount(),
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
        this.setState({ tickDelay: value });
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

    render() {
        const { tickDelay } = this.state;

        return (
            <Grid 
                title='Ticker Grid'
                ref={grid => this.grid = grid}
                store={this.store}
                onInitialize={this.init}
                itemConfig={{
                    viewModel: {
                        formulas: {
                            cellCls: {
                                get: get => get('flashBackground') ? Ext.util.Format.sign(get('record.change'), 'ticker-cell-loss', 'ticker-cell-gain') : ''
                            }
                        }
                    }
                }}
                viewModel={{
                    data: {
                        flashBackground: false
                    },
                    scheduler: {
                        tickDelay
                    }
                }}
            >
                <TextColumn text="Company" dataIndex="name" flex="1" sortable={true}/>
                <TextColumn text="Price" width="95" align="right" cell={{bind:'{record.price:usMoney}'}} sortable={true}/>
                <Column text="Trend" width="200">
                    <WidgetCell bind='{record.trend}' forceWidth>
                        <SparkLineLine tipTpl='Price: {y:number("0.00")}'/>
                    </WidgetCell>
                </Column>
                <TextColumn text="Change" width="90" align="right" cell={{bind:{value:'{record.change:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
                <TextColumn text="% Change" width="100" align="right" cell={{bind:{value:'{record.pctChange:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
                <TextColumn text="Last Updated" hidden={true} width="115" cell={{bind:'{record.LastChange:date("m/d/Y H:i:s")}'}} sortable={false}/>
                
                <Toolbar docked="bottom" defaults={{ margin: '0 20 0 0' }}>
                    <Label>Tick Delay:</Label>
                    <SliderField
                        minValue={200}
                        maxValue={2000}
                        increment={10}
                        onChange={this.onTickDelayChange}
                        value={tickDelay}
                        flex={1}
                    />
                    <span style={{ marginRight: '10px' }}>{tickDelay}ms</span>
                    <CheckBoxField 
                        margin="0"
                        boxLabel="Flash background color on change"
                        checked={false}
                        onChange={this.changeCheckBoxField}
                    />
                </Toolbar>
            </Grid>
        )
    }
}