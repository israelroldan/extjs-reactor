import React, { Component } from 'react';
import { Grid, Toolbar, Button, Label, SliderField, TextField, CheckBoxField, Column, TextColumn, WidgetCell, SparkLineLine, Container } from '@extjs/reactor/modern';
import model from './StockTickerModel';
import './Ticker.css';

export default class StockTickerGridExample extends Component {

    state = {
        tickDelay: 200,
        flashBackground: false
    };

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: null,
        proxy: {
            type: 'ajax',
            url: '/data/CompanyData.json',
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

    onTickDelayChange = (slider, value, oldValue) => {
        this.setState({ tickDelay: value });
    }

    destroy = () => {
        clearInterval(this.timer);
    }

    toggleFlashBackground = (checkbox) => {
        this.setState({ flashBackground: !this.state.flashBackground })
    }

    render() {
        const { tickDelay, flashBackground } = this.state;

        return (
            <Grid 
                title='Ticker Grid'
                ref={grid => this.grid = grid}
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
                    data: {
                        flashBackground
                    },
                    scheduler: {
                        tickDelay
                    }
                }}
            >
                <TextColumn text="Company" dataIndex="name" flex="1" sortable={true}/>
                <TextColumn text="Price" width="95" align="right" cell={{bind:'{record.price:usMoney}'}} sortable={true}/>
                <Column text="Trend" width="200">
                    <WidgetCell forceWidth bind="{trend}">
                        <SparkLineLine tipTpl='Price: {y:number("0.00")}'/>
                    </WidgetCell>
                </Column>
                <TextColumn text="Change" width="90" align="right" cell={{bind:{value:'{record.change:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
                <TextColumn text="% Change" width="100" align="right" cell={{bind:{value:'{record.pctChange:number(".00")}', cls:'{cellCls}', bodyCls:'{record.change:sign("ticker-body-loss", "ticker-body-gain")}'}}} sortable={false}/>
                <TextColumn text="Last Updated" hidden width="115" cell={{bind:'{record.LastChange:date("m/d/Y H:i:s")}'}} sortable={false}/>
                
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
                    <Container><div>{tickDelay}ms</div></Container>
                    <CheckBoxField 
                        margin="0"
                        boxLabel="Flash background color on change"
                        checked={flashBackground}
                        onChange={this.toggleFlashBackground}
                    />
                </Toolbar>
            </Grid>
        )
    }
}