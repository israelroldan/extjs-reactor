import React, {Component} from 'react';
import { Grid, Column, Toolbar } from '@extjs/ext-react';
import model from '../../CompanyModel';
import { Template } from '@extjs/reactor';

Ext.require(['Ext.grid.plugin.ViewOptions']);

export default class ViewOptionsGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json'
        } 
    });

    render() {
        return (
            <Grid
                title="Grid with View Options"
                store={this.store}
                plugins="gridviewoptions"
                signTpl={this.signTpl}
                shadow
            >
                <Toolbar docked="top">
                    <div style={{fontSize: '14px', fontWeight: 'normal'}}>Long press on a column header to customize this grid.</div>
                </Toolbar>
                <Column text="Company" dataIndex="name" width="150"/>
                <Column text="Phone" dataIndex="phone" width="100" hidden={true}/>
                <Column text="Industry" dataIndex="industry" width="150" hidden={true}/>
                <Column text="Price" dataIndex="price" width="75" formatter="usMoney" summaryFormatter="usMoney" summaryType="average"/>
                <Column text="Change" dataIndex="priceChange" width="90" renderer={this.renderChange}  summaryType="max" cell={{encodeHtml:false}}/>
                <Column text="% Change" dataIndex="priceChangePct" width="100" renderer={this.renderPercent} summaryFormatter="round(2)" summaryType="average" cell={{encodeHtml:false}}/>
                <Column text="Last Updated" dataIndex="lastChange" width="125" formatter="date('m/d/Y')" summaryFormatter="date('m/d/Y')" summaryType="max"/>
            </Grid>
        )
    }

    createSignTpl = format => new Template(value => (
        <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
            {Ext.util.Format.number(value, format)}
        </span>
    ));

    changeTpl = this.createSignTpl('0.00');
    percentTpl = this.createSignTpl('0.00%');
    renderChange = (value) => this.changeTpl.apply(value);
    renderPercent = (value) => this.percentTpl.apply(value);
}