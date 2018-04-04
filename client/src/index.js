import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route, Link,
    Switch
} from 'react-router-dom'

import Home from './containers/Home';
import Profile from './containers/Profile';
import OthersProfile from './containers/OthersProfile';
import NotFound from './containers/NotFound';


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={Home}/>

            <Route exact path='/profile' render={ () => {
                return (
                    <Profile self={true}/>
                );
            }}/>

            <Route path='/profile/:username' render={ ({ match }) => {
                return (
                    <OthersProfile self={false} username={match.params.username}/>
                );
            }}/>

            <Route component={NotFound}/>
        </Switch>
    </Router>,

    document.getElementById('app'),
);
