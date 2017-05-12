import React, { Component } from 'react';
import { Panel, TabBar } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { setTitle } from '../actions';
import { loadEvent } from './actions';
import days from '../util/days';

class Event extends Component {

    render() {
        const { record, header=true, ...props } = this.props;
        const data = record && record.data;
        const day = data && data.date && data.date.match(/(Monday|Tuesday|Wednesday)/)[1];
        const speaker = data && data.speakers && data.speakers.length > 0 && data.speakers.map(s => s.name).join(', ');

        return (
            <Panel 
                {...props}
                padding="20" 
                scrollable 
                header={header}
                tools={header && { close: () => location.hash = '/schedule' }}
            >
                { data && (
                    <div>
                        <div className="app-event-name">{data.title}</div>
                        <div className="app-event-speaker">{ data.speakerNames ? `by ${data.speakerNames}` : data.category }</div>
                        <div className="app-event-time">{day} {data.start_time} - {data.end_time}</div>
                        <div className="app-event-location">{data.location.name}</div>
                        { data.description && <hr/> }
                        <div className="app-event-abstract" dangerouslySetInnerHTML={{ __html: data.description }}/>
                    </div>
                )}
            </Panel>
        )
    }

}

const mapStateToProps = ({event}) => {
    return event;
}

export default connect(mapStateToProps)(Event);