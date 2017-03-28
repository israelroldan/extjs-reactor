import React, { Component } from 'react';
import { Container, Panel, Button } from '@extjs/reactor/modern';

export default class Animations extends Component {

    state = { 
        activeCard: 0 
    }

    switchCards(animation) {
        this.refs.cards.getLayout().setAnimation(animation);
        this.setState({ activeCard: this.state.activeCard === 0 ? 1 : 0 });
    }

    createCardContents() {
        return [
            { name: 'Slide Left', animation: { type: 'slide', direction: 'left', duration: 500 } },
            { name: 'Slide Right', animation: { type: 'slide', direction: 'right', duration: 500 } },
            { name: 'Slide Up', animation: { type: 'slide', direction: 'up', duration: 500 } },
            { name: 'Slide Down', animation: { type: 'slide', direction: 'down', duration: 500 } },
            { name: 'Cover Left', animation: { type: 'cover', direction: 'left', duration: 500 } },
            { name: 'Cover Right', animation: { type: 'cover', direction: 'right', duration: 500 } },
            { name: 'Cover Up', animation: { type: 'cover', direction: 'up', duration: 500 } },
            { name: 'Cover Down', animation: { type: 'cover', direction: 'down', duration: 500 } },
            { name: 'Reveal Left', animation: { type: 'reveal', direction: 'left', duration: 500 } },
            { name: 'Reveal Right', animation: { type: 'reveal', direction: 'right', duration: 500 } },
            { name: 'Reveal Up', animation: { type: 'reveal', direction: 'up', duration: 500 } },
            { name: 'Reveal Down', animation: { type: 'reveal', direction: 'down', duration: 500 } },
            { name: 'Fade', animation: { type: 'fade', duration: 500 } },
            { name: 'Pop', animation: { type: 'pop', duration: 500 } },
            { name: 'Flip', animation: { type: 'flip', duration: 500 } }
        ].map(({name, animation}, i) => <Button key={i} onTap={this.switchCards.bind(this, animation)} text={name}/>);
    }

    render() {
        return (
            <Container ref="cards" layout="card" activeItem={this.state.activeCard} shadow>
                <Panel title="Card 1" layout="vbox">
                    {this.createCardContents()}
                </Panel>
                <Panel title="Card 2" layout="vbox">
                    {this.createCardContents()}
                </Panel>
            </Container>
        )
    }

}
