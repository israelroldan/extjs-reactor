import React, { Component } from 'react';
import { Container, Button, TitleBar } from '@extjs/reactor/modern';

export default class NavigationViewExample extends Component {
    
    state = {
        activeItem: 0,
        details: null
    }

    showDetails = () => {
        this.setState({ 
            details: { firstName: 'Tim', lastName: 'Jones' },
            activeItem: 1
        });
    }

    back = () => {
        this.setState({ 
            activeItem: 0
        });
    }

    removeDetails = () => {
        this.setState({ 
            details: null
        })
    }

    render() {
        const { details, activeItem } = this.state;

        return (
            <Container layout={{ type: 'card', animation: { type: 'slide' } }} activeItem={activeItem}>
                <Container title="Home">
                    <TitleBar title="Home" titleAlign="center"/>
                    <Button text="Show Details" handler={this.showDetails}/>
                </Container>
                { details && (
                    <Container onHide={() => this.removeDetails}>
                        <TitleBar title="Details" titleAlign="center">
                            <Button align="left" text="Back" handler={this.back} iconCls="x-fa fa-arrow-left"/>
                        </TitleBar>
                        <div>First Name: {details.firstName}</div>
                        <div>Last Name: {details.lastName}</div>
                    </Container>
                )}
            </Container>
        )
    }

}