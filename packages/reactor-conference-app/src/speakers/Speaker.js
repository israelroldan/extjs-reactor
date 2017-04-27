import React, { Component } from 'react';
import { Container, Panel } from '@extjs/ext-react';
import ScheduleList from '../schedule/ScheduleList';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

class Speaker extends Component {

    constructor({ schedule }) {
        super();

        this.store = Ext.create('Ext.data.ChainedStore', {
            autoDestroy: true,
            source: schedule && schedule.store
        });
    }

    componentDidUpdate() {
        const { speaker } = this.props;

        if (speaker && speaker.sessions) {
            this.store.filter({
                value: speaker.sessions,
                property: 'id',
                operator: 'in'
            });
        }
    }

    render() {
        const { speaker } = this.props;

        return (
            <Container masked={!speaker} layout="vbox" scrollable>
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
                        <Panel title="Events" style={{paddingTop: '20px'}} ui="speaker-events-panel">
                            <ScheduleList
                                dataStore={this.store}
                                showTime
                                eagerLoad
                            />
                        </Panel>
                    </div>
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({ schedule }) => {
    return { schedule };
}

export default connect(mapStateToProps)(Speaker);
