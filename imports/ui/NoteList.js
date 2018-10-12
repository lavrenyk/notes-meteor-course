import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
  return (
    <div className="item-list">
      <NoteListHeader />
      { props.notes.length === 0 ? <NoteListEmptyItem /> : undefined }
      { props.notes.map((note) => {
        return <NoteListItem key={note._id} note={note} />;
      })}
      NoteList { props.notes.length }
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default withTracker(() => {
  const selectedNoteIt = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {
    notes: Notes.find({},{ sort: { updatedAt: -1 }}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteIt
      };
    })
  };
})(NoteList);