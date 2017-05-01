import React from 'react';
import { connect } from 'react-redux';
import { Button, TitleBar } from '@extjs/ext-react';
import { toggleMenu, toggleSearch } from './actions';

function AppBar({ dispatch, title, selectedNavNode, children, backButtonURL }) {
    return (
        <TitleBar 
            docked="top"
            titleAlign="left"
            shadow
            style={{zIndex: 100}}
            title={Ext.os.is.Phone ? title : ''}
            platformConfig={{
                '!desktop': {
                    titleAlign: 'center'
                }
            }}
        >
            { !Ext.os.is.Phone && (
                <div>
                    <div className="ext ext-sencha app-icon"/>
                    <a href="#" className="app-title">{selectedNavNode && false ? selectedNavNode.get('text') : 'ExtReact Conference'}</a>
                </div>
            ) }

            { Ext.os.is.Phone && backButtonURL && (
                <Button align="left" handler={() => location.hash = backButtonURL} iconCls="md-icon-arrow-back"/>
            )}
            { Ext.os.is.Phone && !backButtonURL && (
                <Button align="left" iconCls="md-icon-menu" handler={() => dispatch(toggleMenu(true))}/>
            )}
            { Ext.os.is.Phone && (
                <Button align="right" iconCls="md-icon-search" handler={() => dispatch(toggleSearch())}/>
            )}
            { children }
        </TitleBar>
    )
}

const mapStateToProps = ({ root }) => root;

export default connect(mapStateToProps)(AppBar);
