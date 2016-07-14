import '../imports/ui/home_page/body.js';
import '../imports/ui/home_page/body.html';

import '../imports/ui/main_debate/body.js';
import '../imports/ui/main_debate/body.html';


import '../imports/ui/form_page/body.js';
import '../imports/ui/form_page/body.html'; //must require files to get recognized by router

import { Rooms } from '../imports/api/rooms';

Router.route ('/', function() {
  this.render('homepage');
});
//
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


Router.route('/:roomname', function() {
  var roomName = this.params.roomname;
  console.log(roomName);
  this.render('debateRoom', {
    data : {
      roomName: roomName
    }
  });
});

// Router.route('/', {
//   name: 'users',
//   template: 'Users',
//   waitOn: function() {
//     return Meteor.subscribe('users');
//   },
//   data: function() {
//     return {
//       users: Users.find({}, {
//         sort: {
//           age: -1
//         }
//       })
//     };
//   }
// });