import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-conf';

Meteor.startup(() => {
  // code to run on server at startup

});
