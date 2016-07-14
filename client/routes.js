import '../imports/ui/home_page/body.js';
import '../imports/ui/home_page/body.html';

import '../imports/ui/main_debate/body.js';
import '../imports/ui/main_debate/body.html';

Router.route ('/', function() {
  this.render('homepage');
});
//
Router.route('/:roomname', function() {
  var roomName = this.params.roomname;
  console.log(roomName);
  this.render('trumpRoom', {
    data : {
      roomName: roomName
    }
  });
});

// Router.route('/:_room-name', function() {
//   var roomName = this.params._room-name;
//   console.log(roomName);
//   this.render('trumpRoom', {roomName : roomName});
// });
