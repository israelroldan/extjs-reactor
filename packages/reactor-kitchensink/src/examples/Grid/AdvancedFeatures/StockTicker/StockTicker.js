import React, { Component } from 'react';
import { Grid, Toolbar, Button, Label, SliderField, TextField, CheckBoxField, Column, TextColumn, WidgetCell, SparkLineLine, Container } from '@extjs/ext-react';
import model from '../../CompanyModel';
import './Ticker.css';

export default class StockTickerGridExample extends Component {

    state = {
        tickDelay: 200
    }

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: null,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                // Do not attempt to load orders inline.
                // They are loaded through the proxy
                implicitIncludes: false
            }
        }
    });

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

    destroy = () => {
        clearInterval(this.timer);
    }

    toggleFlashBackground = (checkbox) => {
        const vm = this.viewModel;
        vm.set('flashBackground', !vm.get('flashBackground'));
    }

    onTickDelayChange = (slider, value, oldValue) => {
        this.setState({ tickDelay: value });
        this.viewModel.getScheduler().setTickDelay(value);
    }

    gridRef = grid => this.viewModel = grid.getViewModel();

    render() {
        const { tickDelay } = this.state;

        return (
            <Grid 
                title='Ticker Grid'
                ref={this.gridRef}
                store={this.store}
                onInitialize={this.init}
                shadow
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
                    scheduler: {
                        tickDelay
                    }
                }}
            >
                <TextColumn text="Company" dataIndex="name" width="150" sortable={true}/>
                <TextColumn text="Price" width="95" align="right" cell={{bind:'{record.price:usMoney}'}} sortable={true}/>
                <Column text="Trend" width="200">
                    <WidgetCell forceWidth bind="{record.trend}">
                        <SparkLineLine tipTpl='Price: {y:number("0.00")}'/>
                    </WidgetCell>
                </Column>
                <TextColumn text="Change" width="90" align="right" cell={{bind:{value:'{record.change:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
                <TextColumn text="% Change" width="100" align="right" cell={{bind:{value:'{record.pctChange:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
                <TextColumn text="Last Updated" hidden width="115" cell={{bind:'{record.LastChange:date("m/d/Y H:i:s")}'}} sortable={false}/>
                
                <Toolbar docked="bottom" defaults={{ margin: '0 20 0 0' }}>
                    <Label html="Tick Delay"/>
                    <SliderField
                        padding="0 5"
                        minValue={200}
                        maxValue={2000}
                        increment={10}
                        onChange={this.onTickDelayChange}
                        value={tickDelay}
                        flex={1}
                    />
                    <Container><div>{tickDelay}ms</div></Container>
                    <CheckBoxField 
                        margin="0"
                        boxLabel="Flash background color on change"
                        onChange={this.toggleFlashBackground}
                    />
                </Toolbar>
            </Grid>
        )
    }
}