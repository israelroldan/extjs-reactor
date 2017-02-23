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
    
export default function ChartToolbar({ 
    theme, 
    onThemeChange, 
    onToggleZoomOnPan, 
    onToggleCrosshair,
    onRefreshClick 
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
            { onRefreshClick && (
                <Button {...toolbarItemDefaults} iconCls="x-fa fa-refresh" handler={onRefreshClick}>Refresh</Button>
            )}
            { onToggleZoomOnPan && (
                <SegmentedButton {...toolbarItemDefaults}>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(false)} pressed>Pan</Button>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(true)}>Zoom</Button>
                    { onToggleCrosshair && <Button ui="default-toolbar" handler={() => onToggleCrosshair(true)}>Crosshair</Button> }
                </SegmentedButton>
            )}
        </Toolbar>
    )
}
