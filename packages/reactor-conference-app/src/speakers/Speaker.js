import React, { Component } from 'react';
import { Container, Panel } from '@extjs/ext-react';
import ScheduleList from '../schedule/ScheduleList';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

class Speaker extends Component {

    constructor({speakers, schedule}) {
        super();

        this.store = Ext.create('Ext.data.ChainedStore', {
            autoDestroy: true,
            source: schedule && schedule.store
        });

        this.filterStore(speakers && speakers.speaker && speakers.speaker.sessions);
    }

    componentWillReceiveProps({speakers}) {
        this.filterStore(speakers && speakers.speaker && speakers.speaker.sessions);
    }

    filterStore = value => {
        if(value) {
            this.store.filter({
                value,
                property: 'id',
                operator: 'in'
            });
            this.store.getSource().reload();
        }
    }

    render() {
        const { speakers } = this.props;
        const speaker = speakers.speaker;

        const sessions = speakers && speakers.speaker && speakers.speaker.sessions;

        return (
            <Container masked={!speaker} padding={20} layout="vbox" scrollable>
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
                            <div>
                                <div className="speakers-session-title">Sessions</div>
                                <ScheduleList
                                    dataStore={this.store}
                                    showTime
                                    eagerLoad
                                />
                            </div>
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