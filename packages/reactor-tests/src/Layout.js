import React from 'react';
import { Container } from '@extjs/ext-react';

export default function Layout({ children }) {
    return (
        <Container layout="fit">
            { children }
        </Container>
    )
}