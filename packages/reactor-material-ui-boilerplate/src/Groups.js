import React, { Component } from 'react';
import data from './data';
import TextField from 'material-ui/TextField';
import { Grid } from '@extjs/reactor/modern';
import styles from './styles';

export default class Groups extends Component {

    constructor(props) {
        super(props);

        this.store = Ext.create('Ext.data.Store', {
            data: [
                { name: 'Admins', members: 'Mark, John, Joe' }
            ]
        });
    }

    onSearch() {
        let value = this.refs.query.getValue();
        value = value.toLowerCase();
        this.store.clearFilter();
        this.store.filterBy(record => {
            return record.get('name').toLowerCase().indexOf(value) !== -1 ||
                record.get('members').toLowerCase().indexOf(value) !== -1
        });
    }

    render() {
        return (
            <div style={{ ...styles.vbox, margin: '0 10px', flex: 1 }}>
                <TextField
                    ref="query"
                    hintText="Find Group..."
                    style={{ margin: '10px' }}
                    onChange={() => this.onSearch()} 
                />
                <Grid
                    store={this.store}
                    shadow={true}
                    style={{flex: 1}}
                    margin="0 0 10 0"
                    columns={[
                        { text: 'Name', dataIndex: 'name', flex: 1 },
                        { text: 'Members', dataIndex: 'members', flex: 1 }
                    ]}
                />
            </div>
        )
    }
}