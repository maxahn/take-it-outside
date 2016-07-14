import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Session } from 'meteor/session';

import './body.css';
import './body.html';

Template.debateRoom.helpers({
  getUrl() {
    // console.log('/' + Template.instance().data.roomName);
    return '/' + Template.instance().data.roomName;
  },
  room(url) {
    var roomId  = Rooms.findOne({url: url})._id;
    Session.set('roomId', roomId);
    return Rooms.findOne({_id: roomId}); 
  },
  currentUser() {
    return Session.get('currentUser');
  },
  allArguments(url) {
    var challengedComments = Rooms.findOne({url: url}).challengedDebater.comments;
    var challengedCommentObjects = [];
    for (let counter = 0; counter < challengedComments.length; counter++) {
      let challengedObject = {comment: challengedComments[counter], debater: 'challenged'};
      challengedCommentObjects.push(challengedObject);
    }

    var creatorComments = Rooms.findOne({url: url}).creator.comments;
    var creatorCommentObjects = [];
    for (let counter = 0; counter < creatorComments.length; counter++) {
      let creatorObject = {comment: creatorComments[counter], debater: 'creator'};
      creatorCommentObjects.push(creatorObject);
    }
     
    var allComments = challengedComments.concat(creatorComments);
    var allCommentsObjects = challengedCommentObjects.concat(creatorCommentObjects);
    // return allCommentsObjects;

    return allCommentsObjects.sort(function(commentA, commentB) {           //sorting from most recent to latest 
      return commentA.comment.createdAt > commentB.comment.createdAt ? 1 : commentA.comment.createdAt < commentB.comment.createdAt ? -1 : 0;
    });
  },
});

Template.debateRoom.events({
  'submit .chat-input'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    
    const user = Session.get('currentUser');  
    const id = Session.get('roomId');
    if (user === 'creator') {
      Rooms.update(
        {_id: id}, 
        {$push: 
          { 'creator.comments' : { point: text, createdAt: new Date() }}
        }
      );
    } else if (user == 'challengedDebater') {
      Rooms.update(
        {_id: id}, 
        {$push: 
          { 'challengedDebater.comments' : { point: text, createdAt: new Date() }}
        }
      );
    }
    event.target.text.value = '';
  },

  'click .creator-name h3'(event) {
    const target = event.target;
    Session.set('currentUser', 'creator');
  },

  'click .challenged-name h3'(event) {
    const target = event.target;
    Session.set('currentUser', 'challengedDebater');
  }


});
