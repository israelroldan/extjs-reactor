import React from 'react';
import ReactTestRenderer from 'react-test-renderer'
import MyComponent from '../src/MyComponent';

describe('ExampleTest', () => {
    it('should work', () => {
        const result = ReactTestRenderer.create(<MyComponent/>);
        console.log(result.toJSON());
    })
});