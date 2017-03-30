import React, { Component } from 'react';
import { Toolbar, Container, SearchField, List, Button } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { toggleSearch, search } from './actions';
import { Template } from '@extjs/reactor';
import ScheduleList from './schedule/ScheduleList';

class Search extends Component {
    
    constructor(props) {
        super();

        this.store = Ext.create('Ext.data.ChainedStore', {
            autoDestroy: true,
            source: props.store
        })
    }

    componentDidUpdate(oldProps) {
        let { query, store } = this.props;

        if (oldProps.query !== query) {
            query = query.toLowerCase();
            this.store.clearFilter();
            this.store.filterBy(record => {
                const { name, speaker } = record.data;

                return query.trim().split(/\s+/).some(token => {
                    return name.toLowerCase().indexOf(token) !== -1 || 
                        (speaker && speaker.toLowerCase().indexOf(token) !== -1)
                })
            });
        }
    }

    render() {
        const { dispatch, store, query='' } = this.props;

        return (
            <Container layout={{ type: 'vbox', align: 'stretch' }} onShow={this.onShow}>
                <Toolbar>
                    <SearchField ref={this.fieldRefHandler} flex={1} placeholder="Search" onChange={this.onSearch}/>
                    <Button text="CLOSE" handler={this.onCancel} margin="0 0 0 10"/>
                </Toolbar>
                <ScheduleList
                    flex={1} 
                    dataStore={this.store} 
                    query={query} 
                    showTime
                />
            </Container>
        )
    }

    fieldRefHandler = field => this.field = field;
    onShow = () => setTimeout(() => {
        this.field.focus();
        this.field.select();
    }, 250);
    onHide = () => this.field.blur()
    onSearch = () => this.props.dispatch(search(this.field.getValue()))
    onCancel = () => this.props.dispatch(toggleSearch())
}

const mapStateToProps = (state) => {
    return {
        ...state.root,
        store: state.schedule.store
    };
}

export default connect(mapStateToProps)(Search);