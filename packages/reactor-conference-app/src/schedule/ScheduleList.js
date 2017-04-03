import React, { Component, PropTypes } from 'react';
import { List } from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import highlight from '../util/highlight';
import { toggleFavorite } from './actions';
import { connect } from 'react-redux';
import days from '../util/days';
import { push } from 'react-router';

class ScheduleList extends Component {
    
    static propTypes = {
        dataStore: PropTypes.any.isRequired,
        onFavoriteClick: PropTypes.func,
        showTime: PropTypes.bool,
        flex: PropTypes.number,
        onSelect: PropTypes.func
    }

    itemTpl = new Template(data => {
        const mark = highlight.bind(null, this.props.query);

        return (
            <div className="app-list-content">
                <div className="app-list-text">
                    <div className="app-list-item-title" dangerouslySetInnerHTML={mark(data.name)}/>
                    <div className="app-list-item-details">{data.speaker ? <span>by <span dangerouslySetInnerHTML={mark(data.speaker)}/></span> : ''}{data.category} - {data.location}</div>
                    { this.props.showTime && (<div className="app-list-item-details">{days[data.day]} {data.time}</div>) }
                </div>
                <div 
                    onClick={this.onFavoriteClick.bind(this, data)} 
                    className={`x-font-icon md-icon-star app-list-tool app-favorite${data.favorite ? '-selected' : ''}`}
                />
            </div>
        )
    })

    onItemTap = (list, index, target, record) => {
        const { onSelect } = this.props;
        if (onSelect) onSelect(record);
        self.location.hash = `/events/${record.id}`;
    }

    onFavoriteClick = (data, e) => {
        this.props.dispatch(toggleFavorite(data.id));
    }

    render() {
        const { query, dataStore, onSelect, ...listProps } = this.props;

        return (
            <List 
                {...listProps}
                store={dataStore}
                itemTpl={this.itemTpl}
                grouped
                rowLines
                itemCls="app-list-item"
                maxWidth={600}
                disableSelection
                cls="app-list"
                onItemTap={this.onItemTap}
                emptyText="No events found."
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(ScheduleList);