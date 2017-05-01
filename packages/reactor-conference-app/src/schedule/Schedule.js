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
        const { store, dispatch } = this.props;
        const id = this.props.match.params.id;

        if (!id && !Ext.os.is.Phone) {
            store.on('load', () => location.hash = '/schedule/' + store.first().getId(), this, { single: true });
        } else if (!prevProps || prevProps.match.params.id !== id) {
            dispatch(loadEvent(id, 'Schedule'))
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
            <Container 
                activeItem={match.params.id ? 1 : 0}
                platformConfig={{
                    "!phone": {
                        layout: 'hbox'
                    },
                    "phone": {
                        layout: { 
                            type: 'card', 
                            animation: 'slide' 
                        }
                    }
                }}
            >
                <Container docked="top" className="app-banner">
                    <span className="app-banner-content">ExtReact Conference</span>
                </Container>
                <Container 
                    layout="vbox" 
                    platformConfig={{
                        "!phone": {
                            flex: 1,
                            maxWidth: 500
                        }
                    }}
                >
                    <TabPanel flex={1}
                        tabBar={{
                            shadow: true
                        }}
                    >
                        <ScheduleList 
                            title={Ext.os.is.Phone ? "MON" : 'MONDAY'}
                            selection={event}
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Monday, November 7' }]}}
                        />
                        <ScheduleList 
                            title={Ext.os.is.Phone ? "TUE" : 'TUESDAY'}
                            selection={event}
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Tuesday, November 8' }]}}
                        />
                        <ScheduleList 
                            title={Ext.os.is.Phone ? "WED" : 'WEDNESDAY'}
                            selection={event}
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Wednesday, November 9' }]}}
                        />
                        <ScheduleList 
                            iconCls="md-icon-star" 
                            selection={event}
                            tab={{
                                maxWidth: Ext.os.is.Phone ? 60 : 90
                            }}
                            dataStore={{ ...storeDefaults, filters: [{ property: 'favorite', value: true }]}}
                        />
                    </TabPanel>  
                </Container>
                <Event 
                    event={event} 
                    flex={1} 
                />
            </Container>
        )
    }
}

const mapStateToProps = ({ schedule, event }) => {
    return {...schedule, event};
}

export default connect(mapStateToProps)(Schedule);