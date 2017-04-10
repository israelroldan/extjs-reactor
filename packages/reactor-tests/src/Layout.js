import React from 'react';
import { Container } from '@extjs/reactor/modern';

export default function Layout({ children }) {
    return (
        <Container layout="fit">
            { children }
        </Container>
    )
}