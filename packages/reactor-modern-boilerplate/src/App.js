import React, { Component } from 'react';

import Person from './Person';
import data from './data';
import { Panel, Grid, Toolbar, SearchField } from '@extjs/reactor/modern';

// enable responsiveConfig globally
Ext.require('Ext.plugin.Responsive');
Ext.require('Ext.Toast');

export default class App extends Component {

    state = {
        person: null
    };

    store = Ext.create('Ext.data.Store', {
        data
    });

    render() {
        const { person } = this.state;
        
        return (
            <Panel layout="fit" title="Employees">
                { person && (
                    <Person
                        person={person}
                        onSave={this.onSavePerson}
                        onClose={() => this.setState({ person: null })}
                    />
                )}
                <Toolbar docked="top">
                    <SearchField 
                        ui="faded" 
                        placeholder="Search" 
                        onChange={(field, value) => this.onSearch(value)} flex={1}
                        plugins="responsive"
                        responsiveConfig={{
                            "width <= 600": {
                                flex: 1
                            },
                            "width > 600": {
                                flex: undefined
                            }
                        }}
                    />
                </Toolbar>
                <Grid
                    store={this.store}
                    columns={[
                        { text: 'Name', dataIndex: 'name', flex: 1 },
                        { text: 'Email', dataIndex: 'email', flex: 1 }
                    ]}
                    onItemTap={(grid, index, target, record) => this.onRowClick(record.data)}
                />
            </Panel>
        );
    }

    onSearch = (value) => {
        value = value.toLowerCase();
        this.store.clearFilter();
        this.store.filterBy(record => {
            return record.get('name').toLowerCase().indexOf(value) !== -1 ||
                record.get('email').toLowerCase().indexOf(value) !== -1
        });
    }

    onRowClick = (person) => {
        this.setState({ person });
    }

    onSavePerson = (person) => {
        Ext.toast(`Person ${person.name} saved.`);
        this.store.getById(person.id).set(person, { dirty: false });
        this.setState({ person: null });
    }

    onPersonDialogClose = () => {
        this.setState({ person: null });
    }
    
}