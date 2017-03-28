import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, List, Button, TabPanel, Panel } from '@extjs/reactor/modern';
import AppBar from '../AppBar';

import { 
    toggleFavorite, 
    loadSpeakers, 
    toggleFilterFavorites 
} from './actions';

class Speakers extends Component {

    itemTpl = new Template(data => (
        <div>
            <div className="app-speaker-headshot" style={{backgroundImage: `url(${data.image})`}}></div>
            <div className="app-speaker-text">
                <div className="app-list-item-title">{data.name}</div>
                <div className="app-list-item-details">{data.title}</div>
            </div>
            <div onClick={this.onFavoriteClick.bind(this, data)} className={`x-fa fa-star app-favorite${data.favorite ? '-selected' : ''}`}/>
        </div>
    ))

    componentDidMount() {
        this.props.dispatch(loadSpeakers())
    }

    onItemTap = (list, index, target, record, e) => {
        // prevent selection
        return false;
    }

    onFavoriteClick = (data, e) => {
        this.props.dispatch(toggleFavorite(data.name));
        // Ext.fly(e.target).ripple({ bound: false })
    }

    filterFavorites = (filter) => {
        this.props.dispatch(toggleFilterFavorites(filter));
    }

    render() {
        const { store, filterFavorites, filtered } = this.props;

        const listDefaults = {
            store,
            itemTpl: this.itemTpl,
            onItemTap: this.onItemTap,
            itemCls: "app-list-item",
            rowLines: true,
            maxWidth: "600",
            cls: "app-list"
        };

        if (Ext.platformTags.desktop) {
            return (
                <TabPanel cls="app-desktop-tabs">
                    <Panel title="ALL SPEAKERS" scrollable ui="app-background" onActivate={this.filterFavorites.bind(this, false)}>
                        <List {...listDefaults}/>                        
                    </Panel>
                    <Panel title="FAVORITES" scrollable ui="app-background" onActivate={this.filterFavorites.bind(this, true)}>
                        <List 
                            {...listDefaults} 
                            emptyText="You have not added any speakers to your favorites list."
                            store={{ type: 'chained', source: store, filters: [{ property: 'favorite', value: true }]}}
                        />
                    </Panel>
                </TabPanel>
            )
        } else {
            return (
                <Container scrollable>
                    <AppBar title="Speakers">
                        <Button 
                            ui={filtered ? 'app-filter-favorites-pressed' : 'app-filter-favorites'}
                            iconCls="x-fa fa-star app-favorite" 
                            align="right"
                            handler={this.filterFavorites.bind(this, undefined)}
                            margin="0 9 0 0"
                            platformConfig={{
                                desktop: {
                                    margin: "0 23 0 0"
                                }
                            }}
                        />
                    </AppBar>            
                    <List {...listDefaults}/> 
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return state.speakers;
}

export default connect(mapStateToProps)(Speakers);