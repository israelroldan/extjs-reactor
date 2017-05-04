import React, { Component } from 'react';
import { Panel, Container, Button, SearchField, TitleBar } from '@extjs/ext-react'

export default class SearchFieldExample extends Component {
    
    render() {
        return (
            <Container width="600" layout="vbox" padding={20}
                platformConfig={{
                    phone: {
                        width: '100%'
                    }
                }}
            >
                <div style={styles.heading}>alt</div>
                <TitleBar title="TitleBar" maxWidth="600" margin="0 0 30 0">
                    <SearchField 
                        align="right"
                        ui="alt"
                        width="200"
                        placeholder="Search"
                    />
                </TitleBar>

                <div style={styles.heading}>faded</div>
                <Container layout="vbox" padding="20 20" style={{backgroundColor: 'white'}} margin="0 0 30 0" shadow>
                    <SearchField 
                        ui="faded"
                        placeholder="Search"
                    />
                </Container>

                <div style={styles.heading}>solo</div>
                <Container layout="hbox" padding="20 20" style={{backgroundColor: '#F0F0F0'}} shadow>
                    <SearchField 
                        ui="solo"
                        shadow
                        placeholder="Search"
                        margin="0 10 0 0"
                        flex={1}
                    />
                    <Button 
                        iconCls="x-fa fa-arrow-right"
                        ui="action round raised"
                        height={36}
                        width={36}
                        platformConfig={{
                            phone: {
                                height: 40,
                                width: 40
                            }
                        }}
                    />
                </Container>
            </Container>
        )
    }

}

const styles = {
    heading: {
        fontSize: '13px',
        fontFamily: 'Menlo, Courier',
        margin: '0 0 8px 0'
    }
}
