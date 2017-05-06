import React, { Component } from 'react';
import { Label, Spacer, Button, Toolbar, SegmentedButton, Menu, MenuItem } from '@extjs/ext-react';

Ext.require([
    'Ext.chart.theme.Blue',
    'Ext.chart.theme.Green',
    'Ext.chart.theme.Muted',
    'Ext.chart.theme.Red',
    'Ext.chart.theme.Sky',
    'Ext.chart.theme.Yellow'
]);

const toolbarItemDefaults = {
    margin: '0 10px 0 0'
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
        <Toolbar docked="top" ui="app-transparent-toolbar" shadow={false} margin={!Ext.os.is.Phone && "0 10"}>
            { theme && (
                <Button {...toolbarItemDefaults} iconCls="x-fa fa-picture-o" text="Theme" ui="action">
                    <Menu indented={false}>
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
                    {...toolbarItemDefaults}
                    ui="action"
                    iconCls="x-fa fa-eye" 
                    text="Preview" 
                    handler={downloadChart.bind(null, downloadChartRef)}
                    platformConfig={{
                        desktop: {
                            text: 'DOWNLOAD',
                            iconCls: 'x-fa fa-download'
                        }
                    }}
                />
            )}
            { onRefreshClick && (
                <Button ui="action" {...toolbarItemDefaults} iconCls="x-fa fa-refresh" handler={onRefreshClick} text="REFRESH"/>
            )}
            <Spacer/>
            { onStackGroup && (
                <SegmentedButton {...toolbarItemDefaults} onToggle={onStackGroup}>
                    <Button ui="default-toolbar" text="STACK" pressed/>
                    <Button ui="default-toolbar" text="GROUP"/>
                </SegmentedButton>
            )}
            { onToggleZoomOnPan && !Ext.supports.Touch && (
                <SegmentedButton>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(false)} pressed text="PAN"/>
                    <Button ui="default-toolbar" handler={() => onToggleZoomOnPan(true)} text="ZOOM"/>
                    { onToggleCrosshair && <Button ui="default-toolbar" handler={() => onToggleCrosshair(true)} text="CROSSHAIR"/> }
                </SegmentedButton>
            )}
        </Toolbar>
    )
}
