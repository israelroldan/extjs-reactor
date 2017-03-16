import React from 'react';
import { TitleBar, Button, Container } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { toggleOptions } from './actions';
import EmployeesGrid from './EmployeesGrid';
import SearchOptions from './SearchOptions';

function Layout({ dispatch, showOptions }) {
    return (
        <Container layout="fit">
            <TitleBar title="Employee Database" docked="top">
                <Button 
                    align="left" 
                    iconCls="x-fa fa-bars" 
                    handler={() => dispatch(toggleOptions())}
                    ripple={{
                        bound: false
                    }}
                />
            </TitleBar>
            <SearchOptions docked="left" hidden={!showOptions}/>
            <EmployeesGrid shadow/>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(Layout);
