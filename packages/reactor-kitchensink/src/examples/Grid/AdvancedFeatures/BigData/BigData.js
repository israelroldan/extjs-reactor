import React, { Component } from 'react';
import { Grid, ActionSheet, Toolbar, Container, Button, SparkLineLine, WidgetCell, Column, TextColumn, CheckColumn, NumberColumn, DateColumn } from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import model from './GridModel';
import './data';
import './style.css';

Ext.require([
    'Ext.grid.plugin.*',
    'Ext.tip.ToolTip'
]);

export default class BigDataGridExample extends Component {

    state = {
        showExportSheet: false
    };

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        groupField: 'department',
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/BigData'
        }            
    });

    ratingTpl = new Template ( (data) => {
        return (
           <div>
               <img src={data.avatar} height="100px" style={{float:'left', margin:'0 10px 5px 0'}}/>
                <p>
                    {formatDate( data.dob)}
                </p>
            </div>
       )
    });

    nameSorter = (rec1, rec2) => {
        // Sort prioritizing surname over forename as would be expected.
        var rec1Name = rec1.get('surname') + rec1.get('forename'),
            rec2Name = rec2.get('surname') + rec2.get('forename');

        if (rec1Name > rec2Name) {
            return 1;
        }
        if (rec1Name < rec2Name) {
            return -1;
        }
        return 0;
    }

    render() {
        const { showExportSheet } = this.state;

        return (
            <Container layout="fit" shadow>
                <ActionSheet displayed={showExportSheet}>
                    <Button handler={this.exportToXlsx} text="Excel xlsx (all Items)"/>
                    <Button handler={this.exportToXml} text="Excel xml (all Items)"/>
                    <Button handler={this.exportToCSV} text="CSV (all Items)"/>
                    <Button handler={this.exportToTSV} text="TSV (all Items)"/>
                    <Button handler={this.exportToHtml} text="HTML (all Items)"/>
                    <Button handler={() => this.setState({ showExportSheet: false })} text="Cancel"/>
                </ActionSheet>
                <Grid
                    ref="grid"
                    store={this.store}
                    shadow
                    grouped
                    rowNumbers
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
                            type: 'grid-bigdatagrid-row'
                        },
                        body: {
                            tpl: this.ratingTpl
                        }
                    }}
                    onBeforeDocumentSave={(view) => {
                        view.mask({
                            xtype: 'loadmask',
                            message: 'Document is prepared for export. Please wait ...'
                        })
                    }}
                    onDocumentSave={(view) => view.unmask()}
                >

                    <TextColumn
                        text="Id"
                        dataIndex="employeeNo"
                        flex="1"
                        minWidth="100"
                        exportStyle={{
                            format: 'General Number',
                                alignment: {
                                    horizontal: 'Right'
                                }
                        }}
                    />
                    <TextColumn
                        text="Name"
                        dataIndex="fullName"
                        minWidth="150"
                        sorter={{
                            sorterFn:this.nameSorter
                        }}
                    />
                    <CheckColumn
                        text="Verified"
                        dataIndex="verified"
                        headerCheckbox
                    />
                    <Column
                        text="Ratings"
                    >
                        <NumberColumn
                            text="Avg"
                            dataIndex="averageRating"
                            width="75"
                            cell={{
                                cls:'big-data-ratings-cell',
                                    bind: {
                                        bodyCls: '{ratingGroup:pick("under4","under5","under6","over6")}'
                                    }
                            }}
                        />
                        <Column
                            text="All"
                            dataIndex="rating"
                            ignoreExport
                        >
                            <WidgetCell forceWidth>
                                <SparkLineLine tipTpl='Price: {y:number("0.00")}'/>
                            </WidgetCell>
                        </Column>
                    </Column>
                    <DateColumn
                        text="Date of Birth"
                        dataIndex="dob"
                        editable
                        format='d-m-Y'
                        exportStyle={[{
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
                        }]}
                    />
                    <Column
                        text=""
                        width="100"
                        ignoreExport
                    >
                        <WidgetCell>
                            <Button
                                text="Verify"
                                ui="action"
                                handler={this.onVerify}
                            />
                        </WidgetCell>
                    </Column>
                    <DateColumn
                        text="Join Date"
                        dataIndex="joinDate"
                        editable
                        format="d-m-Y"
                        exportStyle={{
                            format: 'medium Date',
                                alignment: {
                                    horizontal: 'Right'
                                }
                        }}
                    />
                    <TextColumn
                        text="Notice Period"
                        dataIndex='noticePeriod'
                        editable
                    />
                    <TextColumn
                        text="Email"
                        dataIndex="email"
                        width="250"
                        editable
                        editor={{
                            xtype:'emailfield'
                        }}
                    />
                    <Column
                        text='Absences'
                    >
                        <TextColumn
                            text="Illness"
                            dataIndex="sickDays"
                            align='center'
                            summaryType='sum'
                        />
                        <TextColumn
                            text="Holidays"
                            dataIndex="holidayDays"
                            align='center'
                            summaryType='sum'
                        />
                        <TextColumn
                            text="Holiday Allowance"
                            dataIndex="holidayAllowance"
                            align='center'
                            summaryType='sum'
                            summaryFormatter='number("0.00")'
                            formatter='number("0.00")'
                        />
                    </Column>
                    <TextColumn
                        text='Salary'
                        dataIndex='salary'
                        renderer={Ext.util.Format.usMoney}
                        width='150'
                        editable
                        summaryType='sum'
                        summaryRenderer={this.salarySummaryRenderer}
                        exportStyle={{
                            format: 'Currency',
                                alignment: {
                                    horizontal: 'Right'
                                }
                        }}
                    />
                    <Toolbar docked="top">
                        <Button text="Export to..." handler={() => this.setState({ showExportSheet: true })}/>
                    </Toolbar>
                </Grid>
            </Container>
        )
    } // end render

    exportToXlsx = () => {
        this.doExport({
            type: 'excel07',
            title: 'Grid Export Demo',
            fileName: 'GridExport.xlsx'
        });
    }

    exportToXml = () => {
        this.doExport({
            type:       'excel03',
            title:      'Grid Export Demo',
            fileName:   'GridExport.xml'
        });
    }

    exportToCSV = () => {
        this.doExport({
            type:       'csv',
            title:      'Grid Export Demo',
            fileName:   'GridExport.csv'
        });
    }

    exportToTSV = () => {
         this.doExport({
            type:       'tsv',
            title:      'Grid Export Demo',
            fileName:   'GridExport.csv'
        });
    }

    exportToHtml = () => {
         this.doExport({
            type:       'html',
            title:      'Grid Export Demo',
            fileName:   'GridExport.html'
        });
    }

    onVerify = (btn) => {
        const cell = btn.getParent(), record = cell.getRecord();
        record.set('verified', true);
        Ext.Msg.alert('Verify', `Verify ${record.get('forename')} ${record.get('surname')}`);
    }

    salarySummaryRenderer = (value) => {
        return Ext.util.Format.usMoney(value);
    }

    doExport(config) {
        this.setState({ showExportSheet: false });
        this.refs.grid.saveDocumentAs(config);
    }
}

Ext.define('KitchenSink.view.grid.BigDataGridRowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.grid-bigdatagrid-row',
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

function formatDate(date) {
     return Ext.util.Format.date(date, "d/m/Y")
};
