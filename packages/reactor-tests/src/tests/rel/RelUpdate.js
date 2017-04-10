import React, { Component } from 'react';
import { Container, Button, Menu, MenuItem } from '@extjs/reactor/modern';

export default class RelUpdate extends Component  {

    state = {
        showMenu: true
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    render() {
        const { showMenu } = this.state;

        return (
            <Container id="RelUpdate">
                <Button text="Toggle Menu" handler={this.toggleMenu}/>
                <Button text="Menu">
                    { showMenu && (
                        <Menu id="menu">
                            <MenuItem text="Option 1"/>
                            <MenuItem text="Option 2"/>
                            <MenuItem text="Option 3"/>
                        </Menu>
                    )}
                </Button>
            </Container>
        )
    }

}