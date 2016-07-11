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

  allArguments(url) {
    var allArguments = [];
    // allArguments.push(Rooms.findOne({url: url}).challengedDebater.comments);
    // allArguments.push(Rooms.findOne({url: url}).creator.comments);
    // console.log(Rooms.findOne({url: '/trump'}).challengedDebater.comments);
    // console.log(allArguments);
    // return allArguments;
    return allArguments.push(Rooms.findOne({url: url}).challengedDebater.comments) + 
     allArguments.push(Rooms.findOne({url: url}).creator.comments);
  },
});

Template.trumpRoom.events({
  'submit .chat-input'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    
    const user = 'creator';
  
    Rooms.update({_id: "8dW53YQ2pK4fGMcRT"}, {$push: { 'challengedDebater.comments': { point: text, createdAt: new Date() }}});
  }
});
