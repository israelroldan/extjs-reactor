import React, { Component } from 'react'
import data from './data';
import Employee from './Employee';

import { Grid, Panel, Container, SearchField } from '@extjs/reactor';

Ext.require([
    'Ext.plugin.Responsive',
    'Ext.grid.plugin.ColumnResizing'
]);

/**
 * The main application view
 */
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { person: null };
        this.store = Ext.create('Ext.data.Store', {
            fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
            data
        });
    }

    /**
     * Filter the store when the user types in the search box
     */
    onSearch() {
        const query = this.refs.query.getValue();
        this.store.clearFilter();

        if (query.length) this.store.filterBy(record => {
            const { name, email, phone } = record.data;
            return name.indexOf(query) !== -1 || email.indexOf(query) !== -1 || phone.indexOf(query) !== -1;
        });
    }

    /**
     * Update the component state based on the user's selection in the grid
     */
    onPersonSelect(grid, record) {
        this.setState({ employee: record.data });
    }

    render() {
        const { employee } = this.state;

        return (
            <Container
                plugins="responsive"
                responsiveConfig={{
                    tall: { layout: 'vbox' },
                    wide: { layout: 'hbox' }
                }}
            >
                <Panel title="Employees" layout="fit" flex={1} margin="20" shadow={true}>
                    <Grid
                        plugins={['columnresizing']}
                        onSelect={this.onPersonSelect.bind(this)}
                        store={this.store}
                        columns={[
                            { text: 'Name', dataIndex: 'name', flex: 2, resizable: true },
                            { text: 'Email', dataIndex: 'email', flex: 3, resizable: true, plugins: 'responsive', responsiveConfig: { tall: { hidden: true } } },
                            { text: 'Phone', dataIndex: 'phone', flex: 2, resizable: true }
                        ]}
                    >
                        <Container layout="hbox" docked="top" padding={5}>
                            <SearchField ref="query" placeHolder="Search..." flex={1} onChange={this.onSearch.bind(this)}/>
                        </Container>
                    </Grid>
                </Panel>
                { employee && <Employee employee={employee} onCloseClick={() => this.setState({ employee: null })}/> }
            </Container>
        )
    }

}
