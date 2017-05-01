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
        const { dispatch } = this.props;
        const id = this.props.match.params.id;

        if (!prevProps || prevProps.match.params.id !== id) {
            dispatch(loadEvent(id, 'Schedule'))
        }
    }

    render() {
        const { store, event, match } = this.props;
        const showEvent = match.params.id && (Ext.os.is.Phone || event);

        const storeDefaults = { 
            type: 'chained',
            source: store, 
            autoDestroy: true,
            grouper: {
                property: 'start_time',
                sortProperty: 'startDate'
            }
        };

        const banner = (
            <Container docked="top" className="app-banner">
                <span className="app-banner-content">ExtReact Conference</span>
            </Container>
        )

        return (
            <Container 
                activeItem={showEvent ? 1 : 0}
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
                { !Ext.os.is.Phone && banner }
                <TabPanel 
                    flex={1}
                    tabBar={{ shadow: true}}
                    maxWidth={showEvent && 500}
                    platformConfig={{
                        "!phone": {
                            flex: 1
                        }
                    }}
                >
                    { Ext.os.is.Phone && banner }
                    <ScheduleList 
                        title={Ext.os.is.Phone ? "MON" : 'MONDAY'}
                        eagerLoad={!Ext.os.is.Phone}
                        event={event}
                        dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Monday, November 7' }]}}
                        pinHeaders
                    />
                    <ScheduleList 
                        title={Ext.os.is.Phone ? "TUE" : 'TUESDAY'}
                        event={event}
                        dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Tuesday, November 8' }]}}
                        pinHeaders
                    />
                    <ScheduleList 
                        title={Ext.os.is.Phone ? "WED" : 'WEDNESDAY'}
                        event={event}
                        dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Wednesday, November 9' }]}}
                        pinHeaders
                    />
                    <ScheduleList 
                        iconCls="md-icon-star" 
                        event={event}
                        tab={{ maxWidth: Ext.os.is.Phone ? 60 : 90 }}
                        dataStore={{ ...storeDefaults, filters: [{ property: 'favorite', value: true }]}}
                        pinHeaders
                    />
                </TabPanel>  
                { (Ext.os.is.Phone || showEvent) && <Event event={event} flex={1} header={!Ext.os.is.Phone}/> }
            </Container>
        )
    }
}

const mapStateToProps = ({ schedule, event }) => {
    return { ...schedule, event: (event || {}).record };
}

export default connect(mapStateToProps)(Schedule);