import React, {Component} from 'react';
import { Grid, Column } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import model from './GridModel';

Ext.require(['Ext.grid.plugin.RowExpander'])

export default class RowExpanderGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: null,
        model,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                implicitIncludes: false
            }
        }
    })

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

    tpl = new Template( data => (
        <div>
            <div>Industry: {data.industry}</div>
            <div>Last Updated: {formatDate(data.lastChange)}</div>
            <div style={{marginTop:'1em'}}>{data.desc}</div>
        </div>
    ));
    
    render(){
        return(
            <Grid 
                title="Row Expander Grid"
                store={this.store}
                plugins="rowexpander"
                shadow
            >
                <Column text="Company" dataIndex="name" flex="1"/>
                <Column text="Price" dataIndex="price" width="75" formatter="usMoney"/>
                <Column text="Change" dataIndex="priceChange" width="90" renderer={this.renderChange} cell={{encodeHtml: false}}/>
                <Column text="% Change" dataIndex="priceChangePct" width="100" renderer={this.renderPercent} cell={{encodeHtml: false}} />
                <Column text="Last Updated" dataIndex="lastChange" width="125" formatter="date('m/d/Y')" />
            </Grid>
        )
    }
}