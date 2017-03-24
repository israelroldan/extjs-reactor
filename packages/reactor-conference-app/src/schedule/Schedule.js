import React, { Component } from 'react';
import { Container, Button, TabPanel, Panel, Toolbar, SearchField, EdgeMenu } from '@extjs/reactor/modern';
import AppBar from '../AppBar';
import { toggleSearch } from './actions';
import { connect } from 'react-redux';

class Schedule extends Component {
    
    onSearchClick = () => {
        this.props.dispatch(toggleSearch())
    }

    hideSearch = () => {
        this.props.dispatch(toggleSearch(false))
    }

    render() {
        const { showSearch } = this.props;

        return (
            <Container>
                <Container cls="app-banner">
                    ExtReact Conference
                </Container>
                <EdgeMenu side="top" displayed={showSearch} modal={false} layout="fit">
                    <Container layout="hbox" padding="11">
                        <Button iconCls="x-fa fa-arrow-left" handler={this.hideSearch}/>
                        <SearchField flex={1} placeholder="Search by speaker or category"/>
                    </Container>
                </EdgeMenu>
                <TabPanel>
                    <Panel title="TUES"/>
                    <Panel title="WED"/>
                    <Panel title="THURS"/>
                    <Panel iconCls="x-fa fa-star"/>
                </TabPanel>
            </Container>
        )
    }

}

const mapStateToProps = ({ schedule }) => {
    return schedule;
}

export default connect(mapStateToProps)(Schedule);