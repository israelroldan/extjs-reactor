import React, { Component } from 'react';
import { Label, Spacer, Button, Toolbar, SegmentedButton, Menu, MenuItem } from '@extjs/reactor/modern';

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
            { theme && (
                <Button iconCls="x-fa fa-picture-o" text="Theme">
                    <Menu>
                        <MenuItem text="Default" handler={() => onThemeChange('default')}/>
                        <MenuItem text="Green" handler={() => onThemeChange('green')}/>
                        <MenuItem text="Midnight" handler={() => onThemeChange('midnight')}/>
                        <MenuItem text="Muted" handler={() => onThemeChange('muted')}/>
                        <MenuItem text="Red" handler={() => onThemeChange('red')}/>
                        <MenuItem text="Sky" handler={() => onThemeChange('sky')}/>
                        <MenuItem text="Yellow" handler={() => onThemeChange('yellow')}/>
                    </Menu>
                </Button>
            )}
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
                <Button {...toolbarItemDefaults} iconCls="x-fa fa-refresh" handler={onRefreshClick} text="Reload"/>
            )}
            <Spacer/>
            { onStackGroup && (
                <SegmentedButton onToggle={onStackGroup}>
                    <Button ui="default-toolbar" text="Stack" pressed/>
                    <Button ui="default-toolbar" text="Group"/>
                </SegmentedButton>
            )}
            { onToggleZoomOnPan && !Ext.supports.Touch && (
                <SegmentedButton {...toolbarItemDefaults}>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(false)} pressed text="Pan"/>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(true)} text="Zoom"/>
                    { onToggleCrosshair && <Button ui="default-toolbar" handler={() => onToggleCrosshair(true)} text="Crosshair"/> }
                </SegmentedButton>
            )}
        </Toolbar>
    )
}
