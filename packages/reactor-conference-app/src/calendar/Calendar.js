import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Calendar_Days } from '@extjs/reactor/modern';
import AppBar from '../AppBar';

class Calendar extends Component {
    render() {
        const { store } = this.props;

        return (
            <Calendar_Days
                visibleDays={3}
                startTime={8}
                endTime={22}
                value={new Date(2017, 3, 4)}
                store={store}
                dayHeader={{
                    xtype: 'calendar-daysheader',
                    format: 'D',
                    compactOptions: {
                        format: 'D'
                    }
                }}
                editForm={null}
                draggable={false}
                resizeEvents={false}
                gestureNavigation={false}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.calendar };
}

export default connect(mapStateToProps)(Calendar);