import React, { Component } from 'react';
import { Container, Panel } from '@extjs/ext-react';
import ScheduleList from '../schedule/ScheduleList';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

class Speaker extends Component {

    render() {
        const { speakers, schedule } = this.props;
        const speaker = speakers.speaker;
        const scheduleStore = schedule.store;
        const sessions = speaker && speaker.sessions;
        return (
            <Container masked={!speaker} layout="vbox">
                { speaker && (
                    <div>
                        <div className="app-speaker-ct">
                            <img className="app-speaker-image" src={speaker.avatar_url}/>
                            <div className="app-speaker-text">
                                <div className="app-speaker-name">{speaker.name}</div>
                                <div className="app-speaker-title">{speaker.title}</div>
                                <div className="app-speaker-company">{speaker.company}</div>
                                <div className="app-speaker-bio">{speaker.bio}</div>
                            </div>
                        </div>
                        { sessions && sessions.length > 0 && (
                            <Panel title="Events" style={{paddingTop: '20px'}} ui="speaker-events-panel">
                                <ScheduleList
                                    dataStore={{
                                        type: 'chained',
                                        source: scheduleStore,
                                        autoDestroy: true,
                                        filters: [item => sessions.indexOf(item.getId()) >= 0]
                                    }}
                                />
                            </Panel>
                        )}
                    </div>
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({speakers, schedule}) => {
    return {speakers, schedule};
}

export default connect(mapStateToProps)(Speaker);
