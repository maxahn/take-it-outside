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
  room() {
    return Rooms.findOne({url: '/trump'});
  }
});
