import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES_MAP } from '../utils/ROUTES_MAP.js';
import Main from './Main';

function App() {
  return (
    <Switch>
      <Route path={ROUTES_MAP.MAIN}>
        <Main></Main>
      </Route>
    </Switch>
  );
}

export default App;
