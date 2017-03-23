import React, { Component } from 'react';
import { FormPanel, SearchField } from '@extjs/reactor/modern'

export default class SearchFieldExample extends Component {
    
    state = { };

    search = (field, value) => {
        this.setState({ query: value });
    }

    render() {
        const { query } = this.state;

        return (
            <FormPanel shadow>
                <SearchField 
                    value={query}
                    width="300"
                    placeholder="Search..."
                    onChange={this.search}
                />
                { query && <div>You searched for "{query}"</div> }
            </FormPanel>
        )
    }

}
