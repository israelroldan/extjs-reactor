import React from 'react';
import { Component, Carousel, Container } from '@extjs/reactor/modern';

export default function CarouselExample() {
    return (
        <Container layout={{ type: 'vbox', align: 'stretch' }} shadow={true}>
            <Carousel flex={1}>
                <Container {...cardProps}>
                    <div style={styles.card}>Swipe left to show the next card...</div>
                </Container>
                <Container {...cardProps}>
                    <div style={styles.card}>You can also tap on either side of the indicators.</div>
                </Container>
                <Container {...cardProps}>
                    <div style={styles.card}>Card #3</div>
                </Container>
            </Carousel>
            <Carousel ui="light" direction="vertical" flex={1}>
                <Container {...cardProps} style={styles.cardDark}>
                    <div style={styles.card}>Carousels can also be vertical <em>(swipe up)...</em></div>
                </Container>
                <Container {...cardProps} style={styles.cardDark}>
                    <div style={styles.card}>And can also use <code style={styles.code}>ui:light</code>.</div>
                </Container>
                <Container {...cardProps} style={styles.cardDark}>
                    <div style={styles.card}>Card #3</div>
                </Container>
            </Carousel>
        </Container>
    )
}

const cardProps = {
    flex: 1,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
};

const styles = {
    card: {
        fontSize: '18px'
    },
    cardDark: {
        backgroundColor: '#303030',
        color: 'white'
    },
    code: {
        color: '#859900'
    }
};
