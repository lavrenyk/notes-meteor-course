import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-conf';

// отслеживаем изменение статуса некоторых параметров и произодим необходимые действия при их изменении
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
    Session.set('isNavOpen', false);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById("app"));
});