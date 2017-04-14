import React from 'react';
import { Container, Button, Menu, MenuItem } from '@extjs/ext-react';

export default function Rel() {
    return (
        <Container>
            <Button text="Menu" itemId="button">
                <Menu rel="menu" itemId="menu">
                    <MenuItem text="Option 1"/>
                    <MenuItem text="Option 2"/>
                    <MenuItem text="Option 3"/>
                </Menu>
            </Button>
        </Container>
    )
}