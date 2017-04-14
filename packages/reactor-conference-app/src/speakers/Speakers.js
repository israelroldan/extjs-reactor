import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, List, Button, TabPanel, Panel } from '@extjs/ext-react';
import AppBar from '../AppBar';
import { Template } from '@extjs/reactor';

import { 
    loadSpeakers
} from './actions';

class Speakers extends Component {

    constructor({ children }) {
        super();
        this.state = { children };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.children) this.setState({ children: nextProps.children });
    }

    itemTpl = new Template(data => (
        <div className="app-list-content">
            <div className="app-list-headshot" style={{backgroundImage: `url(${data.avatar_url})`}}></div>
            <div className="app-list-text">
                <div className="app-list-item-title">{data.name}</div>
                <div className="app-list-item-details">{data.title}</div>
            </div>
        </div>
    ))

    onItemTap = (list, index, target, record) => {
        self.location.hash = `/speakers/${record.id}`;
    }

    componentDidMount() {
        this.props.dispatch(loadSpeakers())
    }

    render() {
        const { store, filterFavorites, filtered, showSpeaker } = this.props;
        const { children } = this.state;

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