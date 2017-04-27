import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleSearch, filterByDay, toggleFavorite, filterByFavorites } from './actions';
import { setTitle } from '../actions';
import { loadEvent } from '../event/actions';

import { Container, Button, TabPanel, Panel, Toolbar, SearchField, List } from '@extjs/ext-react';
import ScheduleList from './ScheduleList';
import Event from '../event/Event';

class Schedule extends Component {
    
    constructor({ children }) {
        super();
        this.state = { children };
    }

    componentDidMount = () => this.updateData();
    componentDidUpdate = (prevProps) => this.updateData(prevProps);

    updateData = (prevProps) => {
        const id = this.props.match.params.id;
        
        if (!prevProps || prevProps.match.params.id !== id) {
            this.props.dispatch(loadEvent(id, 'Schedule'))
        }
    }

    render() {
        const { store, event, match } = this.props;

        const storeDefaults = { 
            type: 'chained',
            source: store, 
            autoDestroy: true,
            grouper: {
                property: 'start_time',
                sortProperty: 'startDate'
            }
        };

        return (
            <Container layout={{ type: 'card', animation: 'slide' }} activeItem={match.params.id ? 1 : 0}>
                <Container layout="vbox" className="app-banner-tabs">
                    <Container className="app-banner" ref={banner => this.banner = banner}>
                        <span className="app-banner-content">ExtReact Conference</span>
                    </Container>
                    { Ext.platformTags.desktop && (
                        <SearchField style={{position: 'absolute', right: '10px', top: '8px', zIndex: 101}} width="200" height="32" ui="app-search-field" />
                    )}
                    <TabPanel 
                        ref={tp => this.tabPanel = tp}
                        flex={1}
                        platformConfig={{
                            desktop: {
                                cls: 'app-desktop-tabs'
                            }
                        }}
                    >
                        <ScheduleList 
                            title="MON" 
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Monday, November 7' }]}}
                        />
                        <ScheduleList 
                            title="TUE" 
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Tuesday, November 8' }]}}
                        />
                        <ScheduleList 
                            title="WED" 
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Wednesday, November 9' }]}}
                        />
                        <ScheduleList 
                            iconCls="md-icon-star" 
                            tab={{
                                maxWidth: 60
                            }}
                            dataStore={{ ...storeDefaults, filters: [{ property: 'favorite', value: true }]}}
                        />
                    </TabPanel>  
                </Container>
                <Event event={event}/>
            </Container>
        )
    }
}

const mapStateToProps = ({ schedule, event }) => {
    return {...schedule, event};
}

export default connect(mapStateToProps)(Schedule);