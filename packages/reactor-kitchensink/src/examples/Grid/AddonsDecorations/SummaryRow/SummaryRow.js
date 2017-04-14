import React, {Component} from 'react';
import { Grid, Column } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import model from './GridModel';

Ext.require(['Ext.grid.plugin.SummaryRow']);

export default class RowBodyGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json'
        } 
    });

    renderChange = (value) => {
        return this.renderSign(value, '0.00');
    };

    renderPercent = (value) => {
        return this.renderSign(value, '0.00%');
    };

    renderSign = (value, format) => {
        var text = Ext.util.Format.number(value, format),
            tpl;

        if (Math.abs(value) > 0.1) {
            if (value > 0) {
                tpl = new Template(data => <span style={{color:'green'}}> {data.text} </span>);
            } else if (value < 0) {
                tpl = new Template(data => <span style={{color:'red'}}> {data.text} </span>);
            }
            text = tpl.apply({
                text: text,
                value: value
            });
        }
        return text;
    };

    render(){
        return(
            <Grid
                title="Summary Row Grid"
                ref="grid"
                store={this.store}
                plugins="gridsummaryrow"
                shadow
            >
                <Column text="Company" dataIndex="name" flex="1"/>
                <Column text="Price" dataIndex="price" width="75" formatter="usMoney" summaryFormatter="usMoney" summaryType="average"/>
                <Column text="Change" dataIndex="priceChange" width="90" renderer={this.renderChange}  summaryType="max" cell={{encodeHtml:false}}/>
                <Column text="% Change" dataIndex="priceChangePct" width="100" renderer={this.renderPercent} summaryFormatter="round(2)" summaryType="average" cell={{encodeHtml:false}}/>
                <Column text="Last Updated" dataIndex="lastChange" width="125" formatter="date('m/d/Y')" summaryFormatter="date('m/d/Y')" summaryType="max"/>
            </Grid>
        )
    }
}