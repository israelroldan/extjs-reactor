import React, { Component } from 'react';
import { Container, Panel, Toolbar, RadioField, FieldSet, SegmentedButton, Button } from '@extjs/reactor/modern';
import colors from '../colors';

export default class CardLayoutExample extends Component {

    state = { 
        card: 0, 
        animation: 'slide' 
    };

    render() {
        const { card, animation } = this.state;

        return (
            <Container layout="vbox">
                <Panel shadow ui="instructions" margin="0 0 20 0">
                    A card layout shows one item at a time.  Each item takes on the full height and width of the container.
                    Card layouts can optionally be configured to animate when switching cards.
                </Panel>
                <Panel flex={1} layout={{ type: 'card', animation: 'slide' }} activeItem={card} shadow height={200}>
                    <Container {...cardDefaults} style={{...styles.card, ...colors.card.red }}>Card 3</Container>
                    <Container {...cardDefaults} style={{...styles.card, ...colors.card.green }}>Card 2</Container>
                    <Container {...cardDefaults} style={{...styles.card, ...colors.card.blue }}>Card 1</Container>
                </Panel>
                <Toolbar shadow margin="20 0 0 0" layout="vbox">
                    <div style={{marginBottom: '10px'}}>Switch Cards</div>
                    <SegmentedButton>
                        <Button ui="toolbar-default" handler={() => this.changeCard(0)} pressed text="Card 1"/>
                        <Button ui="toolbar-default" handler={() => this.changeCard(1)} text="Card 2"/>
                        <Button ui="toolbar-default" handler={() => this.changeCard(2)} text="Card 3"/>
                    </SegmentedButton>
                </Toolbar>
            </Container>
        )
    }

    changeCard = (card) => {
        this.setState({ card })
    }

}

const cardDefaults = {
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    }
}

const styles = {
    card: {
        fontSize: '18px',
        color: '#666'
    }
}
