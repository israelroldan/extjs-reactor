import React, { Component } from 'react';
import { Grid, ActionSheet, Toolbar, Container, Button } from '@extjs/reactor/modern';
import './data';
import model from './model';

Ext.require('Ext.grid.plugin.*');
Ext.require('Ext.tip.ToolTip');
Ext.require('Ext.*');

Ext.define('KitchenSink.view.grid.BigDataRowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.grid-bigdata-row',
    formulas: {
        ratingGroup: function (get) {
            const age = get('record.averageRating');

            if (age < 4) {
                return 0;
            }
            if (age < 5) {
                return 1;
            }
            if (age < 6) {
                return 2;
            }

            return 3;
        }
    }
});

export default class GridExample extends Component {
    constructor() {
        super();
        this.store = Ext.create('Ext.data.Store', {
            model: model,
            autoLoad: true,
            groupField: 'department',
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/KitchenSink/BigData'
            }            
        }); 
    }

    exportToXlsx() {
        this.doExport({
            type: 'excel07',
            title: 'Grid Export Demo',
            fileName: 'GridExport.xlsx'
        });
    }

    exportToXml() {
        this.doExport({
            type:       'excel03',
            title:      'Grid Export Demo',
            fileName:   'GridExport.xml'
        });
    }

    exportToCSV() {
        this.doExport({
            type:       'csv',
            title:      'Grid Export Demo',
            fileName:   'GridExport.csv'
        });
    }

    exportToTSV() {
         this.doExport({
            type:       'tsv',
            title:      'Grid Export Demo',
            fileName:   'GridExport.csv'
        });
    }

    exportToHtml() {
         this.doExport({
            type:       'html',
            title:      'Grid Export Demo',
            fileName:   'GridExport.html'
        });
    }

    doExport(config) {
        this.refs.exportMenu.hide();
        this.refs.grid.saveDocumentAs(config);
    }

    onVerify(btn) {
        const cell = btn.getParent(), record = cell.getRecord();
        record.set('verified', true);
        Ext.Msg.alert('Verify', 'Verify ' + record.get('forename') + ' ' + record.get('surname'));
    }

    salarySummaryRenderer(value) {
        return Ext.util.Format.usMoney(value);
    }

    render() {
        return (
            <Container layout="fit">
                <ActionSheet ref="exportMenu">
                    <Button handler={this.exportToXlsx.bind(this)} text="Excel xlsx (all Items)"/>
                    <Button handler={this.exportToXml.bind(this)} text="Excel xml (all Items)"/>
                    <Button handler={this.exportToCSV.bind(this)} text="CSV (all Items)"/>
                    <Button handler={this.exportToTSV.bind(this)} text="TSV (all Items)"/>
                    <Button handler={this.exportToHtml.bind(this)} text="HTML (all Items)"/>
                    <Button handler={() => this.refs.exportMenu.hide()} text="Cancel"/>
                </ActionSheet>
                <Grid
                    ref="grid"
                    store={this.store}
                    shadow
                    grouped
                    plugins={[
                        { type: 'grideditable' },
                        { type: 'gridviewoptions' },
                        { type: 'pagingtoolbar' },
                        { type: 'summaryrow' },
                        { type: 'columnresizing' },
                        { type: 'rowexpander' },
                        { type: 'multiselection' },
                        { type: 'gridexporter' }
                    ]}
                    itemConfig={{
                        viewModel: {
                            type: 'grid-bigdata-row'
                        },
                        body: {
                            tpl: '<img src="{avatar}" height="100px" style="float:left;margin:0 10px 5px 0"><b>{name}<br></b>{dob:date}'
                        }
                    }}
                    columns={[
                        { 
                            xtype: 'rownumberer' 
                        }, {
                            text: 'Id',
                            dataIndex: 'employeeNo',
                            flex: 1,
                            minWidth: 100,
                            exportStyle: {
                                format: 'General Number',
                                alignment: {
                                    horizontal: 'Right'
                                }
                            }
                        }, {
                            text: 'Name',
                            dataIndex: 'fullName',
                            minWidth: 150
                        }, {
                            xtype: 'checkcolumn',
                            headerCheckbox: true,
                            dataIndex: 'verified',
                            text: 'Verified'
                        }, {
                            text: 'Ratings',
                            columns: [{
                                text: 'Avg',
                                xtype: 'numbercolumn',
                                dataIndex: 'averageRating',
                                width: 75,
                                cell:{
                                    cls:'big-data-ratings-cell'
                                    //innerCls: '(get) => under4'
                                }
                                    
                            }, {
                                text: 'All',
                                dataIndex: 'rating',
                                ignoreExport: true,
                                cell: {
                                    xtype: 'widgetcell',
                                    forceWidth: true,
                                    widget: {
                                        xtype: 'sparklineline'
                                    }
                                }
                            }]
                        }, {
                            text: 'Date of Birth',
                            dataIndex: 'dob',
                            editable: true,
                            xtype: 'datecolumn',
                            format: 'd-m-Y',
                            // you can define an export style for a column
                            // you can set alignment, format etc
                            exportStyle: [{
                                // no type key is defined here which means that me is the default style
                                // that will be used by all exporters
                                format: 'medium Date',
                                alignment: {
                                    horizontal: 'Right'
                                }
                            }, {
                                // the type key means that me style will only be used by the csv exporter
                                // and for all others the default one, defined above, will be used
                                type: 'csv',
                                format: 'Short Date'
                            }]
                        }, {
                            text: '',
                            width: 100,
                            ignoreExport: true,
                            cell: {
                                xtype: 'widgetcell',
                                widget: {
                                    xtype: 'button',
                                    ui: 'action',
                                    text: 'Verify',
                                    handler: this.onVerify.bind(this)
                                }
                            }
                        }, {
                            text: 'Join Date',
                            dataIndex: 'joinDate',
                            editable: true,
                            xtype: 'datecolumn',
                            format: 'd-m-Y',
                            exportStyle: {
                                format: 'medium Date',
                                alignment: {
                                    horizontal: 'Right'
                                }
                            }
                        },
                        {
                            text: 'Notice Period',
                            dataIndex: 'noticePeriod',
                            editable: true
                        },
                        {
                            text: 'Email',
                            dataIndex: 'email',
                            editable: true,
                            editor: {
                                xtype: 'emailfield'
                            },
                            width: 250
                        },
                        {
                            text: 'Absences',
                            columns: [{
                                text: 'Illness',
                                dataIndex: 'sickDays',
                                align: 'center',
                                summaryType: 'sum'
                            }, {
                                text: 'Holidays',
                                dataIndex: 'holidayDays',
                                align: 'center',
                                summaryType: 'sum'
                            }, {
                                text: 'Holiday Allowance',
                                dataIndex: 'holidayAllowance',
                                align: 'center',
                                summaryType: 'sum',
                                summaryFormatter: 'number("0.00")',
                                formatter: 'number("0.00")'
                            }]
                        },
                        {
                            text: 'Salary',
                            dataIndex: 'salary',
                            renderer: Ext.util.Format.usMoney,
                            editable: true,
                            width: 150,
                            summaryType: 'sum',
                            summaryRenderer: this.salarySummaryRenderer.bind(this),
                            exportStyle: {
                                format: 'Currency',
                                alignment: {
                                    horizontal: 'Right'
                                }
                            }
                        }
                    ]}
                    onBeforeDocumentSave={(view) => {
                        view.mask({
                            xtype: 'loadmask',
                            message: 'Document is prepared for export. Please wait ...'
                        })
                    }}
                    onDocumentSave={(view) =>
                        view.unmask()
                    }
                >
                    <Toolbar docked="top">
                        <Button text="Export to..." handler={() => this.refs.exportMenu.show()}/>
                    </Toolbar>
                </Grid>
            </Container>
        )
    }
}