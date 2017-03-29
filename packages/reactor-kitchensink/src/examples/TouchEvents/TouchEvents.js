import React, { Component } from 'react';
import { Container, Panel } from '@extjs/reactor/modern';

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

    render() {
        const { events } = this.state;

        return (
            <Container layout={{type: 'hbox', align: 'stretch'}}>
                <Container flex={1} layout={{type: 'vbox', align: 'stretch'}} margin="0 20 0 0">
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
                    <Panel title="Event Log" flex={1} scrollable bodyPadding="10">
                        { events.map((e, i) => <div key={i}>{e}</div>) }
                    </Panel>
                </Container>
                <Container ref="touchpad" flex={1} layout={{type: 'vbox', pack: 'center', align: 'stretch'}} style={{border: '8px dashed #d6d6d6', borderRadius: '30px'}}>
                    <div style={{textAlign: 'center', fontSize: '48px'  , color: '#ccc'}}>Touch Here</div>
                </Container>
            </Container> 
        );
    }
}