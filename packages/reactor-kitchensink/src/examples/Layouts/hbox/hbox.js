import React, { Component } from 'react';
import { Panel, Container } from '@extjs/ext-react';
import colors from '../../colors';

export default class HBoxLayoutExample extends Component {

    render() {
        const panelProps = {
            height: 75,
            margin: '0 0 40 0',
            defaults: {
                layout: 'center'
            }
        };

        return (
            <Container padding={Ext.os.is.Phone ? 20 : 30}>
                <Panel shadow ui="instructions" margin="0 0 40 0">
                    <div>An <b>hbox</b> layout positions items horizontally with optional 'pack', and 'align' configs.</div>
                </Panel>
                <div style={styles.heading}>align: 'stretch'</div>
                <Panel shadow layout="hbox" {...panelProps}>
                    <Container style={colors.card.red} flex={1}>Item 1</Container>
                    <Container style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <div style={styles.heading}>align: 'top'</div>
                <Panel shadow layout={{ type: 'hbox', align: 'top' }} {...panelProps}>
                    <Container style={colors.card.red} flex={1}>Item 1</Container>
                    <Container style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <div style={styles.heading}>align: 'bottom'</div>
                <Panel shadow layout={{ type: 'hbox', align: 'bottom' }} {...panelProps}>
                    <Container style={colors.card.red} flex={1}>Item 1</Container>
                    <Container style={colors.card.blue} flex={1}>Item 2</Container>
                    <Container style={colors.card.green} flex={1}>Item 3</Container>
                </Panel>
                <div style={styles.heading}>pack: 'start'</div>
                <Panel shadow layout={{ type: 'hbox', pack: 'start' }} {...panelProps}>
                    <Container style={colors.card.red}>Item 1</Container>
                    <Container style={colors.card.blue}>Item 2</Container>
                    <Container style={colors.card.green}>Item 3</Container>
                </Panel>
                <div style={styles.heading}>pack: 'center'</div>
                <Panel shadow layout={{ type: 'hbox', pack: 'center' }} {...panelProps}>
                    <Container style={colors.card.red}>Item 1</Container>
                    <Container style={colors.card.blue}>Item 2</Container>
                    <Container style={colors.card.green}>Item 3</Container>
                </Panel>
                <div style={styles.heading}>pack: 'end'</div>
                <Panel shadow layout={{ type: 'hbox', pack: 'end' }} {...panelProps}>
                    <Container style={colors.card.red}>Item 1</Container>
                    <Container style={colors.card.blue}>Item 2</Container>
                    <Container style={colors.card.green}>Item 3</Container>
                </Panel>
                <div style={styles.heading}>pack: 'space-between'</div>
                <Panel shadow layout={{ type: 'hbox', pack: 'space-between' }} {...panelProps}>
                    <Container style={colors.card.red}>Item 1</Container>
                    <Container style={colors.card.blue}>Item 2</Container>
                    <Container style={colors.card.green}>Item 3</Container>
                </Panel>
                <div style={styles.heading}>pack: 'space-around'</div>
                <Panel shadow layout={{ type: 'hbox', pack: 'space-around' }} {...panelProps}>
                    <Container style={colors.card.red}>Item 1</Container>
                    <Container style={colors.card.blue}>Item 2</Container>
                    <Container style={colors.card.green}>Item 3</Container>
                </Panel>
            </Container>
        )
    }

}

const styles = {
    heading: {
        fontSize: '14px',
        fontFamily: 'Menlo, Courier',
        margin: '20px 0 8px 0'
    }
}
