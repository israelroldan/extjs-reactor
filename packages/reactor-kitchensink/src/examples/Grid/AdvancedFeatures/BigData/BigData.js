import React, { Component } from 'react';
import { Grid, ActionSheet, Container, Button, SparkLineLine, RendererCell, Column, TextColumn, CheckColumn, NumberColumn, DateColumn, Rating, GridSummaryRow } from '@extjs/reactor/modern';
import model from './GridModel';
import './data';
import './style.css';

Ext.require([
    'Ext.grid.plugin.*',
    'Ext.tip.ToolTip',
    'Ext.data.summary.Sum',
    'Ext.exporter.*'
]);

export default class BigDataGridExample extends Component {

    state = {
        showExportSheet: false
    };

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        groupField: 'department',
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/BigData'
        }            
    });

    rowBodyTpl = data => (
        <div>
            <img src={data.avatar} height="100px" style={{float:'left', margin:'0 10px 5px 0'}}/>
            <p>{formatDate( data.dob)}</p>
        </div>
    );

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

    onExportClick = () => {
        this.setState({ showExportSheet: true })
    }

    render() {
        const { showExportSheet } = this.state;

        return (
            <Container layout="fit" shadow>
                <ActionSheet displayed={showExportSheet}>
                    <Button handler={this.exportToXlsx} text="Excel xlsx"/>
                    <Button handler={this.exportToXml} text="Excel xml"/>
                    <Button handler={this.exportToCSV} text="CSV"/>
                    <Button handler={this.exportToTSV} text="TSV"/>
                    <Button handler={this.exportToHtml} text="HTML"/>
                    <Button handler={() => this.setState({ showExportSheet: false })} text="Cancel"/>
                </ActionSheet>
                <Grid
                    ref={grid => this.grid = grid}
                    title="Big Data Grid"
                    store={this.store}
                    shadow
                    grouped
                    rowNumbers
                    plugins={{
                        grideditable: true,
                        gridviewoptions: true,
                        summaryrow: true,
                        rowexpander: true,
                        gridexporter: true,
                        rowoperations: true
                    }}
                    groupFooter={{
                        xtype: 'gridsummaryrow'
                    }}
                    itemConfig={{
                        body: {
                            tpl: this.rowBodyTpl
                        }
                    }}
                    onBeforeDocumentSave={view => {
                        view.mask({
                            xtype: 'loadmask',
                            message: 'Document is prepared for export. Please wait ...'
                        })
                    }}
                    onDocumentSave={view => view.unmask()}
                    titleBar={{
                        shadow: false,
                        items: [{
                            align: 'right',
                            xtype: 'button',
                            text: `Export to${Ext.os.is.Phone ? '...' : ''}`,
                            menu: Ext.os.is.Desktop && {
                                indented: false,
                                items: [
                                    { text: 'Excel xlsx', handler: this.exportToXlsx },
                                    { text: 'Excel xml', handler: this.exportToXml },
                                    { text: 'CSV', handler: this.exportToCSV },
                                    { text: 'TSV', handler: this.exportToTSV },
                                    { text: 'HTML', handler: this.exportToHtml },
                                ]
                            },
                            handler: !Ext.os.is.Desktop && this.onExportClick
                        }]
                    }}
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
                    <Column text="Ratings">
                        <NumberColumn
                            text="Avg"
                            dataIndex="averageRating"
                            width="75"
                            summary="average"
                            renderer={this.renderRating}
                            cell={{
                                cls:'big-data-ratings-cell'
                            }}
                        />
                        <Column
                            text="All"
                            dataIndex="rating"
                            ignoreExport
                        >
                            <RendererCell 
                                forceWidth 
                                bodyStyle={{ padding: 0 }}
                                renderer={rating => (
                                    <SparkLineLine 
                                        height={16} 
                                        values={rating} 
                                        tipTpl='Price: {y:number("0.00")}'
                                    />
                                )}
                            />
                        </Column>
                    </Column>
                    <DateColumn
                        text="Date of Birth"
                        dataIndex="dob"
                        editable
                        format='d-m-Y'
                        exportStyle={[{
                            // no type key is defined here which means that this is the default style
                            // that will be used by all exporters
                            format: 'Medium Date',
                            alignment: {
                                horizontal: 'Right'
                            }
                        }, {
                            // the type key means that this style will only be used by the csv exporter
                            // and for all others the default one, defined above, will be used
                            type: 'csv',
                            format: 'Short Date'
                        }]}
                    />
                    <Column
                        text=""
                        width="100"
                        ignoreExport
                        dataIndex="verified"
                        align="center"
                    >
                        <RendererCell
                            renderer={(value, record) => (
                                <Container>
                                    <Button
                                        text={value ? 'Verified' : 'Verify'}
                                        ui="action"
                                        handler={this.onVerify.bind(this, record)}
                                    />
                                </Container>
                            )}
                            summaryRenderer={(value, record, dataIndex, cell) => (
                                <Container>
                                    <Button 
                                        ui="action"
                                        text="All"
                                        handler={this.onVerifyAll.bind(this, cell)}
                                    />
                                </Container>
                            )}
                            bodyStyle={{ padding: 0 }}
                        />
                    </Column>
                    <DateColumn
                        text="Join Date"
                        dataIndex="joinDate"
                        editable
                        format="d-m-Y"
                        exportStyle={{
                            format: 'Medium Date',
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
                    <Column text='Absences'>
                        <TextColumn
                            text="Illness"
                            dataIndex="sickDays"
                            align='center'
                            summary='sum'
                        />
                        <TextColumn
                            text="Holidays"
                            dataIndex="holidayDays"
                            align='center'
                            summary='sum'
                        />
                        <TextColumn
                            text="Holiday Allowance"
                            dataIndex="holidayAllowance"
                            align='center'
                            summary='sum'
                            summaryFormatter='number("0.00")'
                            formatter='number("0.00")'
                        />
                    </Column>
                    <Column 
                        text="Rating<br/>This Year" 
                        dataIndex="ratingThisYear"
                        groupable={false}
                        renderer={(value) => (
                            <Rating value={value} tip='Set to {tracking:plural("Star")}'/>
                        )}
                    />
                    <TextColumn
                        text='Salary'
                        dataIndex='salary'
                        renderer={Ext.util.Format.usMoney}
                        width='150'
                        editable
                        summary='sum'
                        summaryRenderer={this.salarySummaryRenderer}
                        exportStyle={{
                            format: 'Currency',
                            alignment: {
                                horizontal: 'Right'
                            }
                        }}
                    />
                </Grid>
            </Container>
        )
    } // end render

    exportToXlsx = () => {
        this.doExport({
            type: 'excel07',
            title: 'Grid Export Demo',
            fileName: 'GridExport.xlsx',
            includeGroups: true,
            includeSummary: true
        });
    }

    exportToXml = () => {
        this.doExport({
            type: 'excel03',
            title: 'Grid Export Demo',
            fileName: 'GridExport.xml',
            includeGroups: true,
            includeSummary: true
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
            fileName:   'GridExport.tsv'
        });
    }

    exportToHtml = () => {
         this.doExport({
            type:       'html',
            title:      'Grid Export Demo',
            fileName:   'GridExport.html'
        });
    }

    onVerify = (record) => {
        record.set('verified', !record.get('verified'));
    }

    onVerifyAll = (cell) => {
        let row = cell.up('gridrow'),
            group = row.getGroup(),
            store = this.store,
            count;

        if (group) {
            count = group.length;
        } else {
            count = store.getCount();
        }
        
        Ext.Msg.confirm('Verify All',
            'Are you sure you want to verify all ' + count + ' items?',
            answer => {
                if (answer === 'yes') {
                    // Don't want to grid to update on each change:
                    store.suspendEvent('update');

                    (group || store).each(function (rec) {
                        rec.set('verified', true);
                    });

                    store.resumeEvent('update');

                    // Now update all the things
                    this.grid.refresh();
                }
            }
        );
    }

    salarySummaryRenderer = (value) => {
        return Ext.util.Format.usMoney(value);
    }

    doExport(config) {
        this.setState({ showExportSheet: false });
        this.grid.saveDocumentAs(config);
    }

    renderRating = (value, record) => {
        const age = record.get('averageRating');
        let group = "over6";

        if (age < 4) {
            group = "under4";
        } else if (age < 5) {
            group = "under5";
        } else if (age < 6) {
            group = "under6";
        }

        return <div className={group}>{value.toFixed(2)}</div>

    }
}

function formatDate(date) {
     return Ext.util.Format.date(date, "d/m/Y")
};
