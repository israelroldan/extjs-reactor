import React, {Component} from 'react';
import { Grid, Column } from '@extjs/ext-react';
import model from '../../CompanyModel';
import { Template } from '@extjs/reactor';

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

    tpl = data => (
        <div>
            <div>Industry: {data.industry}</div>
            <div>Last Updated: {Ext.util.Format.date(data.lastChange, "Y-m-d g:ia")}</div>
            <div style={{marginTop:'1em'}}>{data.desc}</div>
        </div>
    );
    
    render() {
        return (
            <Grid
                title="Row Body Grid"
                store={this.store}
                shadow
                itemConfig={{
                    body:{
                        tpl: this.tpl
                    }
                }}
            >
                <Column text="Company" dataIndex="name" width="150"/>
                <Column text="Price" dataIndex="price" width="75" formatter="usMoney"/>
                <Column text="Change" dataIndex="priceChange" width="90" renderer={this.renderChange} cell={{encodeHtml: false}}/>
                <Column text="% Change" dataIndex="priceChangePct" width="100" renderer={this.renderPercent} cell={{encodeHtml: false}} />
                <Column text="Last Updated" dataIndex="lastChange" width="125" formatter="date('m/d/Y')" />
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