import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms'
import './body.css';

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
    return Rooms.findOne({url: "/trump"});
  },

  creatorArguments(url) {
    return Rooms.findOne({url: url}).creator.comments;
    // return room.creator.comments;
  },

  challengedArguments(url) {
    return Rooms.findOne({url: url}).challengedDebater.comments;
  },

  allArguments(url) {
    var challengedComments = Rooms.findOne({url: url}).challengedDebater.comments;
    var creatorComments = Rooms.findOne({url: url}).creator.comments;
     
    var allComments = challengedComments.concat(creatorComments);

    return allComments.sort(function(commentA, commentB) {
      return commentA.createdAt > commentB.createdAt ? 1 : commentA.createdAt < commentB.createdAt ? -1 : 0;
      // if (commentA.createdAt < commentB.createdAt) {
      //   return -1; 
      // } else if (commentB.createdAt < commentB.createdAt) {
      //   return 1; 
      // } else {
      //   return 0; 
      // }
    });
    // return allArguments.push(Rooms.findOne({url: url}).challengedDebater.comments) + 
    //  allArguments.push(Rooms.findOne({url: url}).creator.comments);
  },
});

Template.trumpRoom.events({
  'submit .chat-input'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    
    console.log(event);
    const user = 'creator';
    Rooms.update({_id: "h2ueuBJevKf64NYe3"}, {$push: { 'creator.comments': { point: text, createdAt: new Date() }}});
    event.target.text.value = '';
  }
});
