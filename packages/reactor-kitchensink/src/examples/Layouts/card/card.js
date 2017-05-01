import React, { Component } from 'react';
import { Container, Panel, Button } from '@extjs/ext-react';

export default class CardLayoutExample extends Component {

    state = { 
        activeCard: 0 
    }

    switchCards(animation) {
        this.setState({ activeCard: this.state.activeCard === 0 ? 1 : 0, animation });
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
        const { animation, activeCard } = this.state;

        const body = (
            <Container 
                layout={{ type: 'card', animation }}
                activeItem={this.state.activeCard} 
                flex={1}
                margin={Ext.os.is.Phone ? '10' : ''}
                shadow
            >
                <Panel title="Card 1" layout={{ type: 'vbox', align: 'center', pack: 'center' }}>
                    {this.createCardContents()}
                </Panel>
                <Panel title="Card 2" layout={{ type: 'vbox', align: 'center', pack: 'center' }}>
                    {this.createCardContents()}
                </Panel>
            </Container>
        )

        if (Ext.os.is.Phone) {
            return body;            
        } else {
            return (
                <Container layout="vbox" padding="5 10 10 10">
                    <Panel shadow ui="instructions" margin="0 0 20 0">
                        <div>
                            A <b>card</b> layout shows one item at a time.  Each item takes on the full height and width of the container.
                            Card layouts can optionally be configured to animate when switching cards.
                        </div>
                    </Panel>
                    { body }                    
                </Container>
            )
        }
    }

}
