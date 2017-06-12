import React from 'react';
import { create } from 'react-test-renderer'
import MyComponent from '../src/MyComponent';

describe('ExampleTest', () => {
    it('should work', () => {
        const result = create(<MyComponent/>);
        console.log(JSON.stringify(result.toJSON(), null, '\t'));
    })
});