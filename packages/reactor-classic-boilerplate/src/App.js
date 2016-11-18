import React, { Component } from 'react';

import Person from './Person';
import data from './data';

Ext.require('Ext.window.Toast');

export default class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            person: null,
            showCmp: false
        };

        this.store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax'
            },
            data           
        });

    }

    onSearch(value) {
        value = value.toLowerCase();
        this.store.clearFilter();
        this.store.filterBy(record => {
            return record.get('name').toLowerCase().indexOf(value) !== -1 ||
                record.get('email').toLowerCase().indexOf(value) !== -1
        });
    }

    onRowClick(person) {
        this.setState({ person });
    }

    onSavePerson(person) {
        Ext.toast(`Person ${person.name} saved.`);
        this.store.getById(person.id).set(person, { dirty: false });
        this.setState({ person: null });
    }

    onPersonDialogClose() {
        this.setState({ person: null });
    }
    
    render() {
        const { person } = this.state;
        
        return (
            <x-panel layout="fit" title="Employees">
                <x-toolbar dock="top">
                    <x-textfield emptyText="Search" onChange={(field, value) => this.onSearch(value)} flex={1}/>
                </x-toolbar>
                <x-grid
                    store={this.store}
                    columns={[
                        { text: 'Name', dataIndex: 'name', flex: 1 },
                        { text: 'Email', dataIndex: 'email', flex: 1 }
                    ]}
                    onRowClick={(grid, record) => this.onRowClick(record.data)}
                />
                { person && (
                    <Person
                        person={person}
                        onSave={person => this.onSavePerson(person)}
                        onClose={() => this.setState({ person: null })}
                    />
                ) }
            </x-panel>
        );
    }
}