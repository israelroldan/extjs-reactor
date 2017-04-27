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
                <h2>ExtReact Conference App</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <h2>Resources</h2>
                <ul style={{'list-style': 'none', padding: '0'}}>
                    <li style={listStyle}><a style={linkStyle} href="javascript: void(0);">Link 1</a></li>
                    <li style={listStyle}><a style={linkStyle} href="javascript: void(0);">Link 2</a></li>
                    <li style={listStyle}><a style={linkStyle} href="javascript: void(0);">Link 3</a></li>
                </ul>

                <h2>Contact</h2>
                <span><a style={linkStyle} href="javascript: void(0);">extreact@email.com</a></span>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return { };
}

export default connect(mapStateToProps)(About);