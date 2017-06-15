import React from 'react';
import { create } from 'react-test-renderer';
import About from '../src/App';

describe('About', () => {
    it('should render without crashing', () => {
        const result = create(<App/>);
        expect(result).toMatchSnapshot();
    })
});