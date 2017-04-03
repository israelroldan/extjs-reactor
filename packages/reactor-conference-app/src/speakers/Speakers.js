import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, List, Button, TabPanel, Panel } from '@extjs/reactor/modern';
import AppBar from '../AppBar';
import { Template } from '@extjs/reactor';

import { 
    loadSpeakers
} from './actions';

class Speakers extends Component {

    itemTpl = new Template(data => (
        <div className="app-list-content">
            <div className="app-list-headshot" style={{backgroundImage: `url(${data.image})`}}></div>
            <div className="app-list-text">
                <div className="app-list-item-title">{data.name}</div>
                <div className="app-list-item-details">{data.title}</div>
            </div>
        </div>
    ))

    componentDidMount() {
        this.props.dispatch(loadSpeakers())
    }

    render() {
        const { store, filterFavorites, filtered, showSpeaker, children } = this.props;

        return (
            <Container layout={{ type: 'card', animation: 'slide' }} activeItem={showSpeaker && children ? 1 : 0}>
                <List 
                    store={store}
                    itemTpl={this.itemTpl}
                    onItemTap={this.onItemTap}
                    itemCls="app-list-item"
                    rowLines
                    maxWidth="600"
                    disableSelection
                    cls="app-list"
                /> 
                { children }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return state.speakers;
}

export default connect(mapStateToProps)(Speakers);