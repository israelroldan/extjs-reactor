import React, { Component } from 'react';
import { Container, Panel } from '@extjs/reactor/modern';
import colors from '../../colors';

export default class VBoxLayoutExample extends Component {

    render() {
        return (
            <Container layout="vbox" padding={10}>
                <Panel shadow ui="instructions" margin="0 0 20 0">
                    <div>An <b>hbox</b> layout positions items horizontally with optional 'pack', and 'align' configs.</div>
                </Panel>
                <Container layout="hbox" flex={1}>
                    <Container layout="vbox" flex={1} padding="10">
                        <div style={styles.heading}>align: 'stretch'</div>
                        <Panel shadow layout="hbox" flex={1}>
                            <Container {...itemDefaults} style={colors.card.red} flex={1}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue} flex={1}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green} flex={1}>Item 3</Container>
                        </Panel>
                        <div style={styles.heading}>align: 'top'</div>
                        <Panel shadow layout={{ type: 'hbox', align: 'top' }} flex={1}>
                            <Container {...itemDefaults} style={colors.card.red} flex={1}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue} flex={1}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green} flex={1}>Item 3</Container>
                        </Panel>
                        <div style={styles.heading}>align: 'bottom'</div>
                        <Panel shadow layout={{ type: 'hbox', align: 'bottom' }} flex={1}>
                            <Container {...itemDefaults} style={colors.card.red} flex={1}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue} flex={1}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green} flex={1}>Item 3</Container>
                        </Panel>
                    </Container>
                    <Container layout="vbox" flex={1} margin="0 0 0 20" padding="10">
                        <div style={styles.heading}>pack: 'start'</div>
                        <Panel shadow layout={{ type: 'hbox', pack: 'start' }} flex={1}>
                            <Container {...itemDefaults} style={colors.card.red}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green}>Item 3</Container>
                        </Panel>
                        <div style={styles.heading}>pack: 'center'</div>
                        <Panel shadow layout={{ type: 'hbox', pack: 'center' }} flex={1}>
                            <Container {...itemDefaults} style={colors.card.red}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green}>Item 3</Container>
                        </Panel>
                        <div style={styles.heading}>pack: 'end'</div>
                        <Panel shadow layout={{ type: 'hbox', pack: 'end' }} flex={1}>
                            <Container {...itemDefaults} style={colors.card.red}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green}>Item 3</Container>
                        </Panel>
                        <div style={styles.heading}>pack: 'space-between'</div>
                        <Panel shadow layout={{ type: 'hbox', pack: 'space-between' }} flex={1}>
                            <Container {...itemDefaults} style={colors.card.red}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green}>Item 3</Container>
                        </Panel>
                        <div style={styles.heading}>pack: 'space-around'</div>
                        <Panel shadow layout={{ type: 'hbox', pack: 'space-around' }} flex={1}>
                            <Container {...itemDefaults} style={colors.card.red}>Item 1</Container>
                            <Container {...itemDefaults} style={colors.card.blue}>Item 2</Container>
                            <Container {...itemDefaults} style={colors.card.green}>Item 3</Container>
                        </Panel>
                    </Container>                    
                </Container>
            </Container>
        )
    }

}

const itemDefaults = {
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    }
}

const styles = {
    heading: {
        fontSize: '14px',
        fontFamily: 'Menlo, Courier',
        margin: '20px 0 8px 0'
    }
}
