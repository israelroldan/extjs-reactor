import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, List, Button } from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';

import { 
    toggleFavorite, 
    loadSpeakers, 
    toggleFilterFavorites 
} from './actions';

class Speakers extends Component {

    itemTpl = new Template(data => (
        <div>
            <div className="app-speaker-headshot" style={{backgroundImage: `url(${data.image})`}}></div>
            <div className="app-speaker-text">
                <div className="app-speaker-name">{data.name}</div>
                <div className="app-speaker-title">{data.title}</div>
            </div>
            <div onClick={this.onFavoriteClick.bind(this, data)} className={`x-fa fa-star app-favorite${data.favorite ? '-selected' : ''}`}/>
        </div>
    ));

    componentDidMount() {
        this.props.dispatch(loadSpeakers())
    }

    onItemTap = (list, index, target, record, e) => {
        // prevent selection
        return false;
    }

    onFavoriteClick = (data, e) => {
        this.props.dispatch(toggleFavorite(data.name));
        // Ext.fly(e.target).ripple({ bound: false })
    }

    onFilterFavorites = () => {
        this.props.dispatch(toggleFilterFavorites());
    }

    render() {
        const { store, filterFavorites } = this.props;

        return (
            <List
                store={store}
                itemTpl={this.itemTpl}
                onItemTap={this.onItemTap}
                itemCls="app-speaker-item"
                emptyText="You have not added any speakers to your favorites list."
                rowLines
            />
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state.speakers };
}

export default connect(mapStateToProps)(Speakers);