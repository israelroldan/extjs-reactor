import React, { Component } from 'react';
import { Container, Button, TitleBar } from '@extjs/reactor/modern';
import Menu from './Menu';
import { connect } from 'react-redux';
import { toggleMenu } from './actions';
import AppBar from './AppBar';
import { toggleFilterFavorites as toggleFavoriteSpeakers } from './speakers/actions';
import Search from './Search';

class Layout extends Component {
    
    onNavChange = (path) => {
        const { router, location } = this.props;
        if (location.pathname !== path) router.push(path);
    }

    onFilterFavorites = () => {
        this.props.dispatch(toggleFavoriteSpeakers());
    }

    onSearchClick = () => {
        
    }

    render() {
        const { title, dispatch, children, filterFavorites, showSearch } = this.props

        return (
            <Container layout={{ type: 'card', animation: { type: showSearch ? 'cover' : 'reveal', direction: 'up', duration: 250 } }} activeItem={showSearch ? 1 : 0}>
                <Container layout="fit">
                    <AppBar/>
                    <Menu onSelect={this.onNavChange}/>
                    { children }
                </Container>
                <Search/>
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        ...state.root,
        filterFavorites: state.speakers.filterFavorites
    }
}

export default connect(mapStateToProps)(Layout);