import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterChange } from './actions';
import { Grid, TitleBar, SearchField, Label } from '@extjs/ext-react';

Ext.require(['Ext.grid.plugin.*']);

class Employees extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['employeeNo', 'forename', 'surname', 'email', {
            name: 'fullName',
            calculate: ({forename, surname}) => `${forename} ${surname}`
        }],
        autoLoad: true,
        groupField: 'department',
        pageSize: 50,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/BigData'
        }     
    });

    componentDidUpdate(prevProps, prevState) {
        const { filter } = this.props;

        if (filter !== prevProps.filter) {
            this.store.filter({
                property: 'fullName', 
                value: filter,
                disableOnEmpty: true,
                anyMatch: true
            })
        }
    }

    render() {
        const { dispatch } = this.props;
    
        return (
            <Grid
                store={this.store}
                shadow
                grouped
                plugins={[
                    { type: 'gridpagingtoolbar' },
                    { type: 'columnresizing' }
                ]}
                columns={[{ 
                    xtype: 'rownumberer' 
                }, {
                    text: 'Id',
                    dataIndex: 'employeeNo',
                    width: 150
                }, {
                    text: 'Name',
                    dataIndex: 'fullName',
                    styleHtmlContent: true,
                    width: 150
                }, {
                    text: 'Email',
                    dataIndex: 'email',
                    flex: 1
                }]}
            >
                <TitleBar title="Employees" docked="top" ui="titlebar-search">
                    <SearchField 
                        ui="alt"
                        align="right"
                        placeholder="Search Name..."
                        onChange={(me, value) => dispatch(filterChange(value))}
                    />
                </TitleBar>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(Employees);