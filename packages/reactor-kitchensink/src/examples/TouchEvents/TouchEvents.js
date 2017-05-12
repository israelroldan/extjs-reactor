import React, { Component } from 'react';
import { Container, Panel } from '@extjs/ext-react';

export default class TouchEventsExample extends Component {

    constructor() {
        super();

        this.state = {
            events: []
        }
    }

    componentDidMount() {
        const fn = this.onTouchEvent.bind(this);

        this.refs.touchpad.el.on({
            scope: this,
            touchstart: fn,
            touchend: fn,
            touchmove: fn,
            swipe: fn,
            dragstart: fn,
            drag: fn,
            dragend: fn,
            tap: fn,
            singletap: fn,
            doubletap: fn,
            longpress: fn,
            pinch: fn,
            rotate: fn
        });
    }

    onTouchEvent(e, target, options) {
        this.setState({events: [e.type, ...this.state.events]});
    }

    clearEventLog = () => {
        this.setState({ events: [] })
    }

    render() {
        const { events } = this.state;

        const touchPad = (
            <Container ref="touchpad" flex={1} layout={{type: 'vbox', pack: 'center', align: 'stretch'}} style={{border: '8px dashed #d6d6d6', borderRadius: '30px'}}>
                <div style={{textAlign: 'center', fontSize: '48px'  , color: '#ccc'}}>Touch Here</div>
            </Container>
        )

        const eventLog = (
            <Panel title="Event Log" height="300" scrollable bodyPadding="10" shadow
                header={{
                    items: [{
                        xtype: 'button',
                        align: 'right',
                        text: 'clear',
                        ui: 'alt',
                        handler: this.clearEventLog
                    }]
                }}
            >
                <div>{ events.map((e, i) => <div key={i}>{e}</div>) }</div>
            </Panel>            
        )

        if (Ext.os.is.Phone) {
            return (
                <Container layout="vbox" defaults={{ margin: '10' }}>
                    { eventLog }
                    { touchPad }
                </Container>
            )
        } else {
            return (
                <Container layout="hbox">
                    <Container flex={1} layout="vbox" padding={10} margin="0 20 0 0">
                        <Panel shadow margin="0 0 20 0" bodyPadding="10">
                            <div>
                                <div>Ext JS comes with a multitude of touch events available on components. Included touch events that can be used are:</div>
                                <ul>
                                    <li>touchstart</li>
                                    <li>touchmove</li>
                                    <li>touchend</li>
                                    <li>dragstart</li>
                                    <li>drag</li>
                                    <li>dragend</li>
                                    <li>tap</li>
                                    <li>singletap</li>
                                    <li>doubletap</li>
                                    <li>longpress</li>
                                    <li>swipe</li>
                                    <li>pinch (on iOS and Android 3+)</li>
                                    <li>rotate (on iOS and Android 3+)</li>
                                </ul>
                            </div>
                        </Panel>
                        { eventLog }
                    </Container>
                    { touchPad }
                </Container>
            )
        }
    }
}