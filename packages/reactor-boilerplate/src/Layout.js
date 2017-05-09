import React, { Component } from 'react'
import { Container, TitleBar, Button, Sheet, Panel } from '@extjs/ext-react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home/Home';
import About from './About/About';
import NavMenu from './NavMenu';
import { withRouter } from 'react-router-dom'
import { medium, large } from './responsiveQueries';

/**
 * The main application view and routes
 */
class Layout extends Component {

    state = {
        showAppMenu: false
    }

    toggleAppMenu = () => {
        this.setState({ showAppMenu: !this.state.showAppMenu });
    }

    onHideAppMenu = () => {
        this.setState({ showAppMenu: false });
    }

    navigate = (path) => {
        this.setState({ showAppMenu: false });
        this.props.history.push(path);
    }

    render() {
        const { showAppMenu } = this.state;
        const { location } = this.props;

        const navMenuDefaults = {
            onSelectionChange: this.navigate,
            selection: location.pathname
        }

        return (
            <Container fullscreen layout="fit">
                <TitleBar title="ExtReact Boilerplate" docked="top">
                    {Ext.platformTags.phone && (
                        <Button align="left" iconCls="x-fa fa-bars" handler={this.toggleAppMenu}/>
                    )}
                </TitleBar>
                {Ext.platformTags.phone ? (
                    <Sheet displayed={showAppMenu} side="left" onHide={this.onHideAppMenu}>
                        <Panel scrollable title="ExtReact Boilerplate">
                            <NavMenu {...navMenuDefaults} width="250"/>
                        </Panel>
                    </Sheet>
                ) : (
                    <Panel scrollable docked="left" shadow zIndex={2}>
                        <NavMenu
                            {...navMenuDefaults}
                            plugins="responsive"
                            responsiveConfig={{
                                [medium]: {
                                    micro: true,
                                    width: 56
                                },
                                [large]: {
                                    micro: false,
                                    width: 250
                                }
                            }}
                        />
                    </Panel>
                )}
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/about" component={About}/>
                </Switch>
            </Container>
        );
    }
}

export default withRouter(Layout);