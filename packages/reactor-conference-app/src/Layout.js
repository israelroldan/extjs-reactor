import React, { Component } from 'react';
import { Container, Button } from '@extjs/reactor/modern';
import Menu from './Menu';
import { connect } from 'react-redux';
import { toggleMenu } from './actions';
import AppBar from './AppBar';
import { toggleFilterFavorites as toggleFavoriteSpeakers } from './speakers/actions';

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
            <Container layout="fit">
                <AppBar title={title}>
                    { title === 'Speakers' && (
                        <Button 
                            ui={filterFavorites ? 'app-filter-favorites-pressed' : 'app-filter-favorites'}
                            iconCls="x-fa fa-star app-favorite" 
                            align="right"
                            handler={this.onFilterFavorites}
                            margin="0 9 0 0"
                            platformConfig={{
                                desktop: {
                                    margin: "0 23 0 0"
                                }
                            }}
                        />
                    )}
                    { title === 'Schedule' && (
                        <Button align="right" iconCls="x-fa fa-search" handler={this.onSearchClick}/>
                    )}
                </AppBar>
                <Menu onSelect={this.onNavChange}/>
                { children }
            </Container>
        )

        return <div>{this.props.children}</div>
    }

}

const mapStateToProps = (state) => {
    return {
        ...state.root,
        filterFavorites: state.speaker && state.speaker.filterFavorites
    }
}

export default connect(mapStateToProps)(Layout);