import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterChange } from './reducer';
import { Grid, Toolbar, TextField, Label } from '@extjs/reactor/modern';

class SimpleGrid extends Component {
    render() {
        const {store, dispatch} = this.props;
        return (
            <Grid
                store={store}
                shadow
                grouped
                plugins={[
                    { type: 'gridviewoptions' },
                    { type: 'pagingtoolbar' },
                    { type: 'columnresizing' }
                ]}
                columns={[
                    { 
                        xtype: 'rownumberer' 
                    }, {
                        text: 'Id',
                        dataIndex: 'employeeNo',
                        width: 150
                    }, {
                        text: 'Name',
                        dataIndex: 'fullName',
                        styleHtmlContent: true,
                        width: 150
                    }, {
                        text: 'Email',
                        dataIndex: 'email',
                        flex: 1
                    }]}
            >
                <Toolbar docked="top">
                    <TextField 
                        label="Search name"
                        labelAlign="placeholder"
                        onChange={(me, value) => dispatch(filterChange(value))}
                    />
                </Toolbar>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.gridStore,
        searchStr: state.searchStr
    }
};
export default connect(mapStateToProps)(SimpleGrid);