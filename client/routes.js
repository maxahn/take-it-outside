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
  this.render('debateRoom', {
    data : {
      roomName: roomName,
      roomId : roomId,
      expiryTime : expiryTime
    }
  });
});

