import React, { Component } from 'react';
import { Container, Panel, SearchField } from '@extjs/reactor/modern'

export default class SearchFieldExample extends Component {
    
    state = { };

    search = (field, value) => {
        this.setState({ query: value });
    }

    render() {
        const { query } = this.state;

        return (
            <Container layout={{ type: 'vbox', align: 'left' }}>
                <Panel shadow height="200" width="300">
                    <SearchField 
                        value={query}
                        placeholder="Search..."
                        onChange={this.search}
                    />
                    { query && <div>You searched for "{query}"</div> }
                </Panel>
            </Container>
        )
    }

}
