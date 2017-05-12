import React from 'react';
import * as tests from './tests';
import { Link } from 'react-router';

export default function TestIndex() {
    return (
        <div>
            <h1>Tests</h1>
            <ul>
                { Object.keys(tests).map(name => (
                    <li key={name}><Link to={`/${name}`}>{name}</Link></li>
                ))}
            </ul>
        </div>        
    )
}