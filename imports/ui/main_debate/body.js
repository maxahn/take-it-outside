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
    var creatorId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'creator'}]})._id;
    var challengedId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'challenged'}]})._id;
    return Arguments.find({$or: [{argRoomUserId: creatorId}, {argRoomUserId: challengedId}]});
  },
});

Template.debateRoom.events({
  'submit .chat-input'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    const userId = Cookie.get('userId');

    Meteor.call('saveDebateArgument', text, userId, function(err, result) {
      if (err) {
        console.log('Error caused by saveDebateArgument Meteor method');
      } else {
      
      }
    });
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
