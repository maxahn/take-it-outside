import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Session } from 'meteor/session';
import { RoomUsers } from '../../api/rooms';
import { Arguments } from '../../api/rooms';

var moment = require('moment');

import './body.css';
import './body.html';

Template.debateRoom.helpers({
  setSession() {
    var url = Template.instance().data.roomName;
    Session.set('roomUrl', url);
  },
  getUrl() {
   if (Template.instance().data.roomName)  {return '/' + Template.instance().data.roomName;}
  },
  room() {
    var url = Session.get('roomUrl');
    var room = Rooms.findOne({url: url});
    if (room) { 
      Session.set('roomId', room._id);
      return room;
    }
  },
  debaters() {
    var roomId = Session.get('roomId');
    // console.log(roomId);
    return RoomUsers.find({userRoomId: roomId});
  },
  formatDate(date) {
    if (date) {return moment(date).fromNow()};
  },

  getUserType(userId) {
    return RoomUsers.findOne({_id: userId}).userType;
  },
  allArguments() {
    var roomId = Session.get('roomId');
    var creatorId = RoomUsers.findOne({$and: [{roomUserId: Session.get('roomId')}, {userType: 'creator'}]});
    var challengedId = RoomUsers.findOne({$and: [{roomUserId: Session.get('roomId')}, {userType: 'challenged'}]});
    return Arguments.find({$or: [{argRoomUserId: creatorId}, {argRoomUserId: challengedId}]});
    
    // var challengedComments = Rooms.findOne({url: url}).challengedDebater.comments;
    // var challengedCommentObjects = [];
    //
    // for (let counter = 0; counter < challengedComments.length; counter++) {
    //   let challengedObject = {comment: challengedComments[counter], debater: 'challenged'};
    //   challengedCommentObjects.push(challengedObject);
    // }
    //
    // var creatorComments = Rooms.findOne({url: url}).creator.comments;
    // var creatorCommentObjects = [];
    // for (let counter = 0; counter < creatorComments.length; counter++) {
    //   let creatorObject = {comment: creatorComments[counter], debater: 'creator'};
    //   creatorCommentObjects.push(creatorObject);
    // }
    //  
    // var allComments = challengedComments.concat(creatorComments);
    // var allCommentsObjects = challengedCommentObjects.concat(creatorCommentObjects);
    // // return allCommentsObjects;
    //
    // return allCommentsObjects.sort(function(commentA, commentB) {           //sorting from most recent to latest 
    //   return commentA.comment.createdAt > commentB.comment.createdAt ? 1 : commentA.comment.createdAt < commentB.comment.createdAt ? -1 : 0;
    // });
  },
});

Template.debateRoom.events({
  'submit .chat-input'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    
    const id = Session.get('roomId');
    const userid = Cookie.get('userId');

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
    console.log(target);
    Session.set('currentUser', 'creator');
    console.log(Session.get('currentUser'));
  },

  'click .challenged-name h3'(event) {
    const target = event.target;
    Session.set('currentUser', 'challengedDebater');
    console.log(Session.get('currentUser'));
  }
});
