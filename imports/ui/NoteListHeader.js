import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
  return(
    <div>
      <button onClick={() => {
        props.meteorCall('notes.insert');
      }}>New note</button>
    </div>
  );
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call
  }
})(NoteListHeader);