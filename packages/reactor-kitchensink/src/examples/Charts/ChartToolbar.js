import React, { Component } from 'react';
import { SelectField, Label, Spacer, Button, Toolbar, SegmentedButton } from '@extjs/reactor/modern';

Ext.require([
    'Ext.chart.theme.Blue',
    'Ext.chart.theme.Green',
    'Ext.chart.theme.Muted',
    'Ext.chart.theme.Red',
    'Ext.chart.theme.Sky',
    'Ext.chart.theme.Yellow'
]);

const toolbarItemDefaults = {
    margin: '0 0 0 10px'
}

const downloadChart = (chart) => {
    if(Ext.is.Desktop) {
        chart.download({ filename: 'Chart' });
    } else {
        chart.preview();
    }
}
    
export default function ChartToolbar({ 
    theme, 
    onThemeChange, 
    onToggleZoomOnPan, 
    onToggleCrosshair,
    onRefreshClick,
    downloadChartRef,
    onStackGroup
}) {
    return (
        <Toolbar docked="top">
            { theme && <Label>Theme:</Label> }
            { theme && (
                    <SelectField
                    {...toolbarItemDefaults}
                    onChange={onThemeChange}
                    value={theme}
                    options={[
                        { text: 'default', value: 'default' },
                        { text: 'green', value: 'green' },
                        { text: 'midnight', value: 'midnight' },
                        { text: 'muted', value: 'muted' },
                        { text: 'red', value: 'red' },
                        { text: 'sky', value: 'sky' },
                        { text: 'yellow', value: 'yellow' },
                    ]}
                />                    
            )}
            <Spacer/>
            { downloadChartRef && (
                <Button 
                    iconCls="x-fa fa-eye" 
                    text="Preview" 
                    handler={downloadChart.bind(null, downloadChartRef)}
                    platformConfig={{
                        desktop: {
                            text: 'Download',
                            iconCls: 'x-fa fa-download'
                        }
                    }}
                />
            )}
            { onRefreshClick && (
                <Button {...toolbarItemDefaults} iconCls="x-fa fa-refresh" handler={onRefreshClick}>Refresh</Button>
            )}
            { onStackGroup && (
                <SegmentedButton onToggle={onStackGroup}>
                    <Button ui="default-toolbar" text="Stack" pressed/>
                    <Button ui="default-toolbar" text="Group"/>
                </SegmentedButton>
            )}
            { onToggleZoomOnPan && (
                <SegmentedButton {...toolbarItemDefaults}>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(false)} pressed text="Pan"/>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(true)} text="Zoom"/>
                    { onToggleCrosshair && <Button ui="default-toolbar" handler={() => onToggleCrosshair(true)} text="Crosshair"/> }
                </SegmentedButton>
            )}
        </Toolbar>
    )
}
