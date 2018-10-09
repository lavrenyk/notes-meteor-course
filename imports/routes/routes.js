import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Session } from 'meteor/session';

import Login from "../ui/Login";
import Signup from "../ui/Singup";
import Dashboard from "../ui/Dashboard";
import NotFound from "../ui/NotFound";


// при заходе на ссылку с id заметки, происходит ее выделение
const onEnterNotePages = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
}

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
}

// отслеживаем статус пользователя и при необходимости отправляем его в нужное место
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
    const isUnathenticatedPage = currentPagePrivacy === "unauth";
    const isAthenticatedPage = currentPagePrivacy === "auth";

    if (isAuthenticated && isUnathenticatedPage) {
      browserHistory.replace('/dashboard');    
    } else if (!isAuthenticated && isAthenticatedPage) {
      browserHistory.replace('/');
    } 
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
}

// определяем пути и соответсвующие им компаненты
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="signup" component={Signup} privacy="unauth" />
      <Route path="dashboard" component={Dashboard} privacy="auth" />
      <Route path="dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePages} onLeave={onLeaveNotePage} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);