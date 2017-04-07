import React, { Component } from 'react';
import { Container, Panel } from '@extjs/reactor/modern';
import ScheduleList from '../schedule/ScheduleList';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

class Speaker extends Component {

    render() {
        const { speakers, schedule } = this.props;
        const speaker = speakers.speaker;
        const scheduleStore = schedule.store;
        return (
            <Container masked={!speaker} padding={20} layout="vbox">
                { speaker && (
                    <div>
                        <div className="app-speaker-ct">
                            <img className="app-speaker-image" src={speaker.image}/>
                            <div className="app-speaker-text">
                                <div className="app-speaker-name">{speaker.name}</div>
                                <div className="app-speaker-title">{speaker.title}</div>
                            </div>
                        </div>
                        <Panel title="Events" style={{paddingTop: '20px'}}>
                            <ScheduleList
                                dataStore={{
                                    type: 'chained',
                                    source: scheduleStore,
                                    autoDestroy: true,
                                    grouper: { property: 'time' },
                                    filters: [{ property: 'speaker', value: speaker.name }]
                                }}
                            />
                        </Panel>
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