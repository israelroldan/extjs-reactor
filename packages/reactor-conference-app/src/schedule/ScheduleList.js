import React, { Component, PropTypes } from 'react';
import { List } from '@extjs/ext-react';
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
        onSelect: PropTypes.func,
        eagerLoad: PropTypes.bool
    }

    itemTpl = new Template(data => {
        const mark = highlight.bind(null, this.props.query);
        const day = data.date && data.date.match(/(Monday|Tuesday|Wednesday)/)[1];

        return (
            <div className="app-list-content">
                <div className="app-list-text">
                    <div className="app-list-item-title" dangerouslySetInnerHTML={mark(data.title)}/>
                    <div className="app-list-item-details">{data.speakerNames ? <span>by <span dangerouslySetInnerHTML={mark(data.speakerNames)}/></span> : ''}{data.categoryName} - {data.location.name}</div>
                    { this.props.showTime && (<div className="app-list-item-details">{day} {data.start_time}</div>) }
                </div>
                <div 
                    onClick={this.onFavoriteClick.bind(this, data)} 
                    className={`x-item-no-tap x-font-icon md-icon-star app-list-tool app-favorite${data.favorite ? '-selected' : ''}`}
                />
            </div>
        )
    })

    onItemTap = (list, index, target, record) => {
        if (record) {
            self.location.hash = `/events/${record.id}`;
        }
    }

    onFavoriteClick = (data, e) => {
        this.props.dispatch(toggleFavorite(data.id));
        Ext.fly(e.target).ripple(e, { bound: false, color: '#999' });
    }

    scrollToTop = () => {
        if (this.list) {
            this.list.getScrollable().scrollTo(0, 0);
        }
    }

    render() {
        const { eagerLoad, query, dataStore, onSelect, ...listProps } = this.props;

        return (
            <List 
                onShow={this.scrollToTop}
                ref={list => this.list = list}
                {...listProps}
                store={eagerLoad && dataStore}
                itemTpl={this.itemTpl}
                grouped
                rowLines
                itemCls="app-list-item"
                maxWidth={600}
                cls="app-list"
                onItemTap={this.onItemTap}
                pinHeaders
                onShow={{
                    fn: (list) => { if(!eagerLoad) list.setStore(dataStore); },
                    single: true
                }}
                emptyText="No events found."
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(ScheduleList);