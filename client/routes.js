import '../imports/ui/home_page/body.js';
import '../imports/ui/home_page/body.html';

import '../imports/ui/main_debate/body.js';
import '../imports/ui/main_debate/body.html';


import '../imports/ui/form_page/body.js';
import '../imports/ui/form_page/body.html'; //must require files to get recognized by router

Router.route ('/', function() {
  this.render('homepage');
});
//
Router.route('/:roomname', function() {
  var roomName = this.params.roomname;
  console.log(roomName);
  this.render('debateRoom', {
    data : {
      roomName: roomName
    }
  });
});

Router.route('/form', function() {
  this.render('form');
});
