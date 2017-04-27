import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Button, Toolbar } from '@extjs/ext-react';

export default class Main extends Component {

    static propTypes = {
        component: PropTypes.element
    }

    render() {
        return (
            <Container layout={{ type: 'card' }}>
                { item1 }
                { item2 }
            </Container>
        )
    }    

}