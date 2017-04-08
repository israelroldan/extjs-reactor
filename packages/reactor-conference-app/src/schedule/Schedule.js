import React, { Component } from 'react';
import { Container, Button, TabPanel, Panel, Toolbar, SearchField, EdgeMenu, List } from '@extjs/reactor/modern';
import AppBar from '../AppBar';
import { toggleSearch, filterByDay, toggleFavorite, filterByFavorites } from './actions';
import { connect } from 'react-redux';
import { Template } from '@extjs/reactor';
import ScheduleList from './ScheduleList';
import { setTitle } from '../actions';

class Schedule extends Component {
    
    constructor({ children }) {
        super();
        this.state = { children };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children) this.setState({ children: nextProps.children });
    }

    onSearchClick = () => this.props.dispatch(toggleSearch())
    hideSearch = () => this.props.dispatch(toggleSearch(false))
    filter = day => this.props.dispatch(filterByDay(day))

    render() {
        const { showSearch, store, favorites, showEvent } = this.props;
        const { children } = this.state;

        const storeDefaults = { 
            type: 'chained', 
            source: store, 
            autoDestroy: true,
            grouper: {
                property: 'start_time',
                sorterFn: (record1, record2) => {
                    const time1 = Ext.Date.parse(record1.get('start_time'), 'g:i A'),
                        time2 = Ext.Date.parse(record2.get('start_time'), 'g:i A');

                    return time1.getTime() - time2.getTime();
                }
            }
        };

        return (
            <Container layout={{ type: 'card', animation: 'slide' }} activeItem={showEvent && children ? 1 : 0}>
                <Container key="schedule" layout="vbox" ref={ct => this.ct = ct} scrollable className="app-banner-tabs">
                    <Container className="app-banner" ref={banner => this.banner = banner}>
                        <span className="app-banner-content">ExtReact Conference</span>
                    </Container>
                    { Ext.platformTags.desktop && (
                        <SearchField style={{position: 'absolute', right: '10px', top: '8px', zIndex: 101}} width="200" height="32" ui="app-search-field" />
                    )}
                    <TabPanel 
                        ref={tp => this.tabPanel = tp}
                        height="1000"
                        platformConfig={{
                            desktop: {
                                cls: 'app-desktop-tabs'
                            }
                        }}
                    >
                        <ScheduleList 
                            title="MON" 
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Monday, November 7' }]}}
                        />
                        <ScheduleList 
                            title="TUE" 
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Tuesday, November 8' }]}}
                        />
                        <ScheduleList 
                            title="WED" 
                            dataStore={{ ...storeDefaults, filters: [{ property: 'date', value: 'Wednesday, November 9' }]}}
                        />
                        <ScheduleList 
                            iconCls="md-icon-star" 
                            tab={{
                                maxWidth: 60
                            }}
                            dataStore={{ ...storeDefaults, filters: [{ property: 'favorite', value: true }]}}
                        />
                    </TabPanel>  
                </Container>
                {children}
            </Container>
        )
    }

    componentDidMount() {
        this.ct.getScrollable().on('scroll', this.onParentScroll)
    }

    onParentScroll = () => {
        const tabPanel = this.tabPanel;
        const tabBarEl = tabPanel.getTabBar().el;
        const top = tabBarEl.getY();
        const scrollTop = this.ct.getScrollable().getElement().getY();

        if (tabBarEl.stuck) {
            if (tabBarEl.parent().getY() > scrollTop) {
                tabBarEl.stuck = false;
                tabBarEl.setStyle({ position: '', top: '', width: '', zIndex: '' })
                tabPanel.bodyElement.setStyle({ paddingTop: '' });
            }
        } else {
            if (top < scrollTop) {
                tabBarEl.stuck = true;
                tabBarEl.setStyle({ position: 'fixed', top: '0', width: `${this.tabPanel.el.getWidth()}px`, zIndex: 100 })
                tabPanel.bodyElement.setStyle({ paddingTop: `${tabBarEl.getHeight()}px` });
            }
        }

        const padding = 60;
        const paddingBottom = (top - scrollTop - this.banner.bodyElement.getHeight()) / 2;
        const paddingTop = padding - paddingBottom;
        const opacity = paddingBottom / (padding / 2.0);
        const fontSize = 30 * (top - scrollTop) / (padding + 37);

        this.banner.setStyle({ paddingBottom: `${paddingBottom}px`, paddingTop: `${paddingTop}px` });
        this.banner.el.down('.app-banner-content').setStyle({ opacity })
    }
}

const mapStateToProps = ({ schedule, event }) => {
    return {...schedule, ...event};
}

export default connect(mapStateToProps)(Schedule);