import React from 'react';
import { create } from 'react-test-renderer'
import { reactify } from '@extjs/reactor';

const Container = reactify('Container');
const Button = reactify('Button');
const [ Grid, Column, Toolbar ] = reactify('Grid', 'Column', 'Toolbar');

describe('ReactTestRenderer snapshots', () => {
    
    it('should support html child elements', () => {
        const result = create(
            <Container>
                <div className="foo" style={{color: 'red'}}>
                    <b>F</b>oo
                </div>
                <div className="bar">Bar</div>
            </Container>
        );

        expect(result).toMatchSnapshot();
    });

    it('should support function props', () => {
        const result = create(
            <Button text="Button" handler={() => console.log('clicked')}/>
        )

        expect(result).toMatchSnapshot();
    });

    it('should omit complex props', () => {
        const store = new Ext.data.Store({
            fields: ['name']
        });

        class Foo {

        }

        const result = create(
            <Grid 
                title="Employees"
                store={store}
                foo = {new Foo()}
            />
        )

        expect(result).toMatchSnapshot();
    });

    it('should support nested ExtReact components', () => {
        const store = new Ext.data.Store({
            fields: ['name']
        });

        const result = create(
            <Grid 
                title="Employees"
                store={store}
            >
                <Toolbar>
                    <Button text="Add Record"/>
                </Toolbar>
                <Column dataIndex="name" text="Name"/>
            </Grid>
        )

        expect(result).toMatchSnapshot();
    });

    it('should support ExtReact components inside html elements', () => {
        const result = create(
            <div>
                <Container>
                    <Button text="Button"/>
                    <div>Test</div>
                </Container>
            </div>
        );

        expect(result).toMatchSnapshot();
    })
});