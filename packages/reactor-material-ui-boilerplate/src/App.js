import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Grid } from '@extjs/reactor/modern';
import data from './data';

/**
 * The main application view
 */
export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = { query: '' };

        this.store = Ext.create('Ext.data.Store', {
            data
        });
    }

    onSearch() {
        let value = this.refs.query.getValue();
        this.setState({ query: value });
        value = value.toLowerCase();
        this.store.clearFilter();
        this.store.filterBy(record => {
            return record.get('name').toLowerCase().indexOf(value) !== -1 ||
                record.get('email').toLowerCase().indexOf(value) !== -1
        });
    }

    render() {
        console.log(this.state);
        const { query } = this.state;

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="App"/>
                    <Card>
                        <CardHeader
                            title="Ext JS Grid"
                        />
                        <TextField ref="query" hintText="Search..." fullWidth={true} onChange={() => this.onSearch()} value={query}/>
                        <Grid
                            height={500}
                            width="100%"
                            store={this.store}
                            columns={[
                                { text: 'Name', dataIndex: 'name', flex: 1 },
                                { text: 'Email', dataIndex: 'email', flex: 1 }
                            ]}
                        />
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }

}
