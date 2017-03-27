import React, { Component } from 'react';
import { Container, Button, TabPanel, Panel, Toolbar, SearchField, EdgeMenu, List } from '@extjs/reactor/modern';
import AppBar from '../AppBar';
import { toggleSearch, filterByDay, toggleFavorite, filterByFavorites } from './actions';
import { connect } from 'react-redux';
import { Template } from '@extjs/reactor';

class Schedule extends Component {

    itemTpl = new Template(data => {
        return (
            <div>
                <div className="app-list-item-title">{data.name}</div>
                <div className="app-list-item-details">{data.speaker ? `by ${data.speaker}`: ''}{data.category} - {data.location}</div>
                <div onClick={this.onFavoriteClick.bind(this, data)} className={`x-fa fa-star app-favorite${data.favorite ? '-selected' : ''}`}/>
            </div>
        )
    })

    onFavoriteClick = (data, e) => this.props.dispatch(toggleFavorite(data.id));
    onSearchClick = () => this.props.dispatch(toggleSearch())
    hideSearch = () => this.props.dispatch(toggleSearch(false))
    filter = day => this.props.dispatch(filterByDay(day))

    componentDidMount() {
        this.ct.getParent().getScrollable().on('scroll', this.onParentScroll)
    }

    onParentScroll = () => {

    }

    render() {
        const { showSearch, store, favorites } = this.props;

        const listDefaults = {
            grouped: true,
            pinHeaders: true,
            rowLines: true,
            itemCls: "app-list-item",
            itemTpl: this.itemTpl,
            maxWidth: 600,
            cls: "app-list"
        }

        const storeDefaults = { 
            type: 'chained', 
            source: store 
        };

        return (
            <Container layout="vbox" ref={ct => this.ct = ct}>
                { !Ext.platformTags.desktop && (
                    <AppBar title="Schedule"/>
                )}
                { !Ext.platformTags.desktop && (
                    <Container cls="app-banner">
                        ExtReact Conference
                    </Container>
                )}
                { Ext.platformTags.desktop && (
                    <SearchField style={{position: 'absolute', right: '10px', top: '8px', zIndex: 101}} width="200" height="32" ui="app-search-field" />
                )}
                <TabPanel 
                    ref={tp => this.tabPanel = tp}
                    height="600"
                    platformConfig={{
                        desktop: {
                            cls: 'app-desktop-tabs'
                        }
                    }}
                >
                    <Panel title="TUES" scrollable>
                        <List {...listDefaults} store={{ ...storeDefaults, filters: [{ property: 'day', value: 1 }]}}/>
                    </Panel>
                    <Panel title="WED" scrollable>
                        <List {...listDefaults} store={{ ...storeDefaults, filters: [{ property: 'day', value: 2 }]}}/>
                    </Panel>
                    <Panel title="THURS" scrollable>
                        <List {...listDefaults} store={{ ...storeDefaults, filters: [{ property: 'day', value: 3 }]}}/>
                    </Panel>
                    <Panel iconCls="x-fa fa-star" scrollable>
                        <List {...listDefaults} store={{ ...storeDefaults, filters: [{ property: 'favorite', value: true }]}}/>
                    </Panel>
                </TabPanel>  
            </Container>
        )
    }

}

const mapStateToProps = ({ schedule }) => {
    return schedule;
}

export default connect(mapStateToProps)(Schedule);