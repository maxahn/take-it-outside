import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms'

import './body.css';
import './body.html';

Template.trumpRoom.helpers({
  getUrl() {
    // console.log('/' + Template.instance().data.roomName);
    return '/' + Template.instance().data.roomName;
  },
  room(url) {
    return Rooms.findOne({url: url});
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

Template.trumpRoom.events({
  'submit .chat-input'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    
    console.log(event);
    const user = 'creator';
    Rooms.update(
      {_id: "eL3XzPhWeX2nLfcEN"}, 
      {$push: 
        { 'challengedDebater.comments': { point: text, createdAt: new Date() }}
      });
    event.target.text.value = '';
  }
});
