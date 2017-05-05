import React, {Component} from 'react';
import { Grid, Column } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';
import model from '../../CompanyModel';

Ext.require([
    'Ext.grid.plugin.SummaryRow',
    'Ext.data.summary.Average',
    'Ext.data.summary.Max',
]);

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

    state = {
        reveal: true
    }

    render() {
        return (
            <Grid
                title="Summary Row Grid"
                store={this.store}
                plugins={{
                    gridsummaryrow: true
                }}
                hidden={!this.state.reveal}
                onTransitionEnd={() => this.setState({ reveal: true })}
                shadow
            >
                <Column 
                    text="Company" 
                    dataIndex="name" 
                    flex="1" 
                    summaryRenderer={this.summarizeCompanies}
                />
                <Column 
                    text="Price" 
                    width="75" 
                    dataIndex="price" 
                    formatter="usMoney" 
                    summary="average"
                />
                <Column 
                    text="Change" 
                    width="90" 
                    dataIndex="priceChange" 
                    renderer={this.renderChange}  
                    summary="max" 
                    cell={{encodeHtml:false}}
                />
                <Column 
                    text="% Change" 
                    width="100"
                    dataIndex="priceChangePct" 
                    renderer={this.renderPercent} 
                    summary="average" 
                    summaryRenderer={this.renderPercent}
                    cell={{encodeHtml:false}}
                />
                <Column 
                    text="Last Updated" 
                    width="125" 
                    dataIndex="lastChange" 
                    formatter="date('m/d/Y')" 
                    summary="max"
                />
            </Grid>
        )
    }

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

    summarizeCompanies = (grid, context) => {
        return context.records.length + ' Companies';
    };
}