import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {TripListPage} from './pages/TripListPage';
import {AuthPage} from './pages/AuthPage';
import {DataListPage} from "./pages/DataListPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
        <Switch>
          <Route path="/home" exact>
            <div></div>
          </Route>
          <Route path="/data/list/:id" exact>
            <DataListPage>
            </DataListPage>
          </Route>
          <Route path="/trip/list" exact>
            <TripListPage>
            </TripListPage>
          </Route>
          <Redirect to="/home"/>
        </Switch>
    );
  }

  return (
      <Switch>
        <Route path="/" exact>
          <AuthPage/>
        </Route>
        <Redirect to="/"/>
      </Switch>
  );
};
