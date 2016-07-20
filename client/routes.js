import '../imports/ui/home_page/body.js';
import '../imports/ui/home_page/body.html';

import '../imports/ui/main_debate/body.js';
import '../imports/ui/main_debate/body.html';


import '../imports/ui/form_page/body.js';
import '../imports/ui/form_page/body.html'; //must require files to get recognized by router

import { Rooms } from '../imports/api/rooms';

import '../imports/ui/viewer_chat/viewer_chat.js';
import '../imports/ui/viewer_chat/viewer_chat.html';

import '../imports/ui/chart_page/body.js';
import '../imports/ui/chart_page/body.html';
import {RoomUsers} from '../imports/api/rooms'; //make sure to import collections when creating variables using collections.


Router.route ('/', function() {
  this.render('homepage');
});

Router.route('/form', function() {
  this.render('form',{
    
    data : {
      room: new ReactiveVar(new Room())
    }
  });
});

Router.route('/rooms', {
  name: 'newRoom',
  template: 'rooms', 
  // data: {
  //   rooms: Rooms.find()
  // }
  // this.render('rooms',{
  //   data : {
  //     rooms: Rooms.find()
  //   }
});

Router.route('/chart', function() {
  // debugger;
  this.render('chart');
});

Router.route('/:roomname', function() {
  var roomName = this.params.roomname;
  //console.log(roomName);
  var room = Rooms.findOne({url: roomName});
  var roomId = room._id;
  var expiryTime = room.expiryTime;
  var creatorId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'creator'}]})._id;
  var challengedId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'challenged'}]})._id;
  this.render('debateRoom', {
    data : {
      creatorId: creatorId,
      challengedId: challengedId,
      roomName: roomName,
      roomId : roomId,
      expiryTime : expiryTime
    }
  });
});

