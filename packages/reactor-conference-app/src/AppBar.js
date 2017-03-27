import React from 'react';
import { connect } from 'react-redux';
import { Button, TitleBar } from '@extjs/reactor/modern';
import { toggleMenu } from './actions';

function AppBar({ dispatch, title, children }) {
    return (
        <TitleBar 
            docked="top"
            titleAlign="left"
            shadow
            style={{zIndex: 100}}
            title={Ext.platformTags.desktop ? '' : title}
            platformConfig={{
                '!desktop': {
                    titleAlign: 'center'
                }
            }}
        >
            { Ext.platformTags.desktop ? (
                <div>
                    <div className="ext ext-sencha app-icon"/>
                    <a href="#" className="app-title">ExtReact Conference</a>
                </div>
            ) : (
                <Button align="left" iconCls="x-fa fa-bars" handler={() => dispatch(toggleMenu(true))}/>
            )}
            { children }
        </TitleBar>
    )
}

const mapStateToProps = ({ root }) => {
    return { title: root.title }
};

export default connect(mapStateToProps)(AppBar);
