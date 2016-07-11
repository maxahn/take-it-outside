import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms'

import './body.html';

Template.rooms.helpers({
  rooms() {
    return Rooms.find();
  },

  findRoom(url) {
    return Rooms.find({url: url}); 
  }
});

Template.trumpRoom.helpers({
  room(url) {
    return Rooms.findOne({url: url});
  },

  creatorArguments(url) {
    return Rooms.findOne({url: url}).creator.comments;
    // return room.creator.comments;
  },

  challengedArguments(url) {
    return Rooms.findOne({url: url}).challengedDebater.comments;
  },

  allArguments() {
  },
  
});
