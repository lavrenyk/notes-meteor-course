import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5>{ props.note.title || 'Untitled note' }</h5>
      <p>{ moment(props.note.updatedAt).format('DD-M-YYYY') }</p>
    </div>
  );
}

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, NoteListItem);