import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

class About extends Component {

    componentDidMount() {
        this.props.dispatch(setTitle('About'));
    }

    render() {
        const linkStyle = {
            'text-decoration': 'none'
        };

        const listStyle = {
            padding: '0 0 5px 0'
        };
        
        return (
            <div style={{padding: '10px'}}>
                <h2 style={{fontWeight: 100}}>ExtReact Conference App</h2>
                <p>
                    This app is built with <a href="https://github.com/sencha/extjs-reactor">Sencha ExtReact 1.0</a> and uses the following libraries:
                    <ul style={{'list-style': 'none', padding: '0'}}>
                        <li style={listStyle}><a href="https://facebook.github.io/react/">React 15.4</a></li>
                        <li style={listStyle}><a href="http://redux.js.org/">Redux 3.6</a></li>
                        <li style={listStyle}><a href="http://redux.js.org/">React Router 4.1</a></li>
                    </ul>
                </p>
                <p>
                    The source code for this app is available <a href="https://github.com/sencha/extjs-reactor/tree/master/packages/reactor-conference-app">here</a>.
                </p>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return { };
}

export default connect(mapStateToProps)(About);