import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function() {

    beforeEach(function() {
      Notes.remove({});
      Notes.insert({
        _id: 'testNoteId1',
        title: 'My title',
        body: 'My body for note',
        updatedAt: 0,
        userId: 'testUserId1' 
      });
    });

    afterEach(function() {

    });

    it('should insert new note', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toBeTruthy();
    });

    it ('should not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function() {
      const _id = 'testNoteId1';
      const userId = 'testUserId1'
      // expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId }, [_id]);
      // }).toBeTruthy;

      expect(Notes.findOne({ _id })).toBeFalsy();
    });

  });
}