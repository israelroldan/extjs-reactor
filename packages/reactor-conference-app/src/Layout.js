import React, { Component } from 'react';
import { Container, Button, TitleBar } from '@extjs/ext-react';
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
        const { title, dispatch, children, filterFavorites } = this.props

        return (
            <Container layout="fit" fullscreen>
                <AppBar/>
                <Menu onSelect={this.onNavChange}/>
                <Search/>
                { children }
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