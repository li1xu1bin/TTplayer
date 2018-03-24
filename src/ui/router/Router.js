import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

// History
import history from './history';

// Components
import App from '../components/App.react';
import Library from '../components/Library/Library.react';
import Playlists from '../components/Playlists/Playlists.react';

import Settings from '../components/Settings/Settings.react';
import Playing from '../components/Playing/Playing.react';


const AppRouter = () => (
  <Router history={history}>
    <App>
      <Switch>
        <Route path='/library' component={Library} />
        <Route path='/playlists' component={Playlists} />
        <Route path='/settings' component={Settings} />
        <Route path='/playing' component={Playing} />
      </Switch>
    </App>
  </Router>
);

export default AppRouter;
